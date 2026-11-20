/**
 * A faithful, dependency-light implementation of the OpenResume PDF pipeline.
 * It reads real PDF text items with pdf.js and mirrors the grouping / section /
 * field extraction heuristics used by OpenResume, so the assertions in
 * check.mjs test what an ATS actually sees rather than the visual layout.
 *
 * Reference: https://github.com/xitanggg/open-resume/tree/main/src/app/lib/parse-resume-from-pdf
 */
import { readFileSync } from 'node:fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

export const BULLET_POINTS = ['⋅', '∙', '🞄', '•', '⦁', '⚫︎', '●', '⬤', '⚬', '○'];

const JOB_TITLES = [
  'Accountant', 'Administrator', 'Advisor', 'Agent', 'Analyst', 'Apprentice',
  'Architect', 'Assistant', 'Associate', 'Auditor', 'Bartender', 'Biologist',
  'Bookkeeper', 'Buyer', 'Carpenter', 'Cashier', 'CEO', 'Clerk', 'Co-op',
  'Co-Founder', 'Consultant', 'Coordinator', 'CTO', 'Developer', 'Designer',
  'Director', 'Driver', 'Editor', 'Electrician', 'Engineer', 'Extern', 'Founder',
  'Freelancer', 'Head', 'Intern', 'Janitor', 'Journalist', 'Laborer', 'Lawyer',
  'Lead', 'Manager', 'Mechanic', 'Member', 'Nurse', 'Officer', 'Operator',
  'Operation', 'Photographer', 'President', 'Producer', 'Recruiter',
  'Representative', 'Researcher', 'Sales', 'Server', 'Scientist', 'Specialist',
  'Supervisor', 'Teacher', 'Technician', 'Trader', 'Trainee', 'Treasurer',
  'Tutor', 'Vice', 'VP', 'Volunteer', 'Webmaster', 'Worker',
];

const isBold = (item) => item.fontName.toLowerCase().includes('bold');
const hasLetter = (item) => /[a-zA-Z]/.test(item.text);
const hasNumber = (item) => /[0-9]/.test(item.text);
const hasComma = (item) => item.text.includes(',');
const hasAt = (item) => item.text.includes('@');
const hasSlash = (item) => item.text.includes('/');
const hasParenthesis = (item) => /\([0-9]+\)/.test(item.text);
const isAllUpperCase = (item) => hasLetter(item) && item.text.toUpperCase() === item.text;
const onlyLettersSpacesPeriods = (item) => /^[a-zA-Z\s.]+$/.test(item.text);
const onlyLettersSpacesAmpersands = (item) => /^[A-Za-z\s&]+$/.test(item.text);
const has4OrMoreWords = (item) => item.text.split(/\s/).length >= 4;
const hasJobTitle = (item) =>
  JOB_TITLES.some((title) => item.text.split(/\s/).some((word) => word === title));
const hasYear = (item) => /(?:19|20)\d{2}/.test(item.text);
const hasMonth = (item) =>
  /January|February|March|April|May|June|July|August|September|October|November|December/i.test(item.text);
const hasPresent = (item) => item.text.includes('Present');

/** OpenResume's feature scoring: highest total wins, first item wins a tie. */
function bestItem(items, featureSets) {
  let winner = null;
  let bestScore = -Infinity;
  for (const item of items) {
    let score = 0;
    let text = item.text;
    for (const [feature, weight, matchingTextOnly] of featureSets) {
      const match = feature(item);
      if (!match) continue;
      score += weight;
      // OpenResume extracts just the regex match for fields like email/phone.
      if (matchingTextOnly && Array.isArray(match)) text = match[0];
    }
    if (score > bestScore) {
      bestScore = score;
      winner = { text };
    }
  }
  return winner ? winner.text.trim() : null;
}

/** Step 1: read pdf.js text items and resolve their real font names. */
export async function readPdf(file) {
  const doc = await getDocument({
    data: new Uint8Array(readFileSync(file)),
    useSystemFonts: true,
  }).promise;
  const items = [];
  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
    const page = await doc.getPage(pageNumber);
    const content = await page.getTextContent();
    await page.getOperatorList();
    for (const item of content.items) {
      if (!('str' in item)) continue;
      const { str, transform, fontName: loadedFont, ...other } = item;
      let fontName = loadedFont;
      try {
        fontName = page.commonObjs.get(loadedFont).name;
      } catch {
        // Keep the subset name when the font cannot be resolved.
      }
      items.push({
        ...other,
        fontName,
        text: str,
        x: transform[4],
        y: transform[5],
      });
    }
  }
  return items.filter((item) => item.hasEOL || item.text.trim() !== '');
}

function getTypicalCharWidth(items) {
  const candidates = items.filter((item) => item.text.trim() !== '');
  if (!candidates.length) return 0;

  const heightCounts = {};
  const fontCounts = {};
  let commonHeight = 0;
  let heightMax = 0;
  let commonFont = '';
  let fontMax = 0;
  for (const item of candidates) {
    heightCounts[item.height] = (heightCounts[item.height] ?? 0) + 1;
    if (heightCounts[item.height] > heightMax) {
      heightMax = heightCounts[item.height];
      commonHeight = item.height;
    }
    fontCounts[item.fontName] = (fontCounts[item.fontName] ?? 0) + item.text.length;
    if (fontCounts[item.fontName] > fontMax) {
      fontMax = fontCounts[item.fontName];
      commonFont = item.fontName;
    }
  }
  const common = candidates.filter(
    (item) => item.fontName === commonFont && item.height === commonHeight
  );
  if (!common.length) return 0;
  const [width, chars] = common.reduce(
    (acc, item) => [acc[0] + item.width, acc[1] + item.text.length],
    [0, 0]
  );
  return chars ? width / chars : 0;
}

const shouldAddSpace = (leftText, rightText) => {
  const leftEnd = leftText[leftText.length - 1];
  const rightStart = rightText[0];
  return (
    ([':', ',', '|', '.', ...BULLET_POINTS].includes(leftEnd) && rightStart !== ' ') ||
    (leftEnd !== ' ' && ['|', ...BULLET_POINTS].includes(rightStart))
  );
};

/** Step 2: group text items into lines. */
export function groupTextItemsIntoLines(items) {
  const lines = [];
  let line = [];
  for (const item of items) {
    if (item.hasEOL) {
      if (item.text.trim() !== '') line.push({ ...item });
      lines.push(line);
      line = [];
    } else if (item.text.trim() !== '') {
      line.push({ ...item });
    }
  }
  if (line.length) lines.push(line);

  const typical = getTypicalCharWidth(lines.flat());
  for (const currentLine of lines) {
    for (let i = currentLine.length - 1; i > 0; i -= 1) {
      const current = currentLine[i];
      const left = currentLine[i - 1];
      if (current.x - (left.x + left.width) <= typical) {
        if (shouldAddSpace(left.text, current.text)) left.text += ' ';
        left.text += current.text;
        left.width = current.x + current.width - left.x;
        currentLine.splice(i, 1);
      }
    }
  }
  return lines;
}

const SECTION_KEYWORDS = [
  'experience', 'education', 'project', 'skill', 'job', 'course',
  'extracurricular', 'objective', 'summary', 'award', 'honor',
];

function isSectionTitle(line, lineNumber) {
  if (lineNumber < 2 || line.length !== 1) return false;
  const item = line[0];
  if (isBold(item) && isAllUpperCase(item)) return true;
  const text = item.text.trim();
  const words = text.split(' ').filter((word) => word !== '&');
  return (
    words.length <= 2 &&
    onlyLettersSpacesAmpersands(item) &&
    /[A-Z]/.test(text.slice(0, 1)) &&
    SECTION_KEYWORDS.some((keyword) => text.toLowerCase().includes(keyword))
  );
}

/** Step 3: group lines into sections. */
export function groupLinesIntoSections(lines) {
  const sections = {};
  let sectionName = 'profile';
  let sectionLines = [];
  lines.forEach((line, index) => {
    if (isSectionTitle(line, index)) {
      sections[sectionName] = sectionLines;
      sectionName = line[0].text.trim();
      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  });
  if (sectionLines.length) sections[sectionName] = sectionLines;
  return sections;
}

function splitSubsections(lines, predicate) {
  const result = [];
  let current = [];
  lines.forEach((line, index) => {
    if (index > 0 && predicate(line, lines[index - 1])) {
      result.push(current);
      current = [];
    }
    current.push(line);
  });
  if (current.length) result.push(current);
  return result;
}

export function divideSectionIntoSubsections(input) {
  const lines = input.filter((line) => line.length > 0);
  const gaps = [];
  for (let i = 1; i < lines.length; i += 1) {
    gaps.push(Math.round(lines[i - 1][0].y - lines[i][0].y));
  }
  const counts = {};
  let common = 0;
  let max = 0;
  for (const gap of gaps) {
    counts[gap] = (counts[gap] ?? 0) + 1;
    if (counts[gap] > max) {
      max = counts[gap];
      common = gap;
    }
  }
  let subsections = splitSubsections(
    lines,
    (line, prev) => Math.round(prev[0].y - line[0].y) > common * 1.4
  );
  if (subsections.length === 1) {
    subsections = splitSubsections(
      lines,
      (line, prev) => !isBold(prev[0]) && isBold(line[0]) && !BULLET_POINTS.includes(line[0].text)
    );
  }
  return subsections;
}

function getDescriptionsLineIdx(lines) {
  const bulletIdx = lines.findIndex((line) => line.some((item) =>
    BULLET_POINTS.some((bullet) => item.text.includes(bullet))
  ));
  if (bulletIdx !== -1) return bulletIdx;
  // Fallback: a single line with eight or more word-like tokens.
  return lines.findIndex(
    (line) => line.length === 1 && line[0].text.split(/\s/).filter((word) => !/\d/.test(word)).length >= 8
  );
}

function getBulletPoints(lines) {
  // OpenResume returns one description per line when there are no bullets at
  // all; only bullet-marked lines get merged with their wrapped continuations.
  const hasBullet = lines.some((line) =>
    line.some((item) => BULLET_POINTS.some((bullet) => item.text.includes(bullet)))
  );
  if (!hasBullet) {
    return lines.map((line) => line.map((item) => item.text).join(' ').trim());
  }
  const start = getDescriptionsLineIdx(lines);
  const text = lines
    .slice(start)
    .flat()
    .map((item) => item.text)
    .join(' ')
    .trim();
  const counts = Object.fromEntries(BULLET_POINTS.map((bullet) => [bullet, 0]));
  for (const char of text) {
    if (char in counts) counts[char] += 1;
  }
  const commonBullet = Object.keys(counts).reduce((a, b) => (counts[b] > counts[a] ? b : a));
  return text
    .split(commonBullet)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

/** Step 4a: profile fields from the lines before the first section heading. */
export function extractProfile(sections) {
  const items = (sections.profile ?? []).flat();
  return {
    name: bestItem(items, [
      [onlyLettersSpacesPeriods, 3],
      [isBold, 2],
      [isAllUpperCase, 2],
      [hasAt, -4],
      [hasNumber, -4],
      [hasParenthesis, -4],
      [hasComma, -4],
      [hasSlash, -4],
      [has4OrMoreWords, -2],
    ]),
    email: bestItem(items, [
      [(item) => item.text.match(/\S+@\S+\.\S+/), 4, true],
      [isBold, -1],
      [isAllUpperCase, -1],
      [hasComma, -4],
      [hasSlash, -4],
      [has4OrMoreWords, -4],
    ]),
    phone: bestItem(items, [
      [(item) => item.text.match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/), 4, true],
      [hasLetter, -4],
    ]),
  };
}

/** Step 4b: work experience, including the case-sensitive job-title keyword. */
export function extractWorkExperience(sections) {
  const section = Object.entries(sections).find(([name]) =>
    ['work', 'experience', 'employment', 'history', 'job'].some((word) =>
      name.toLowerCase().includes(word)
    )
  );
  if (!section) return [];
  return divideSectionIntoSubsections(section[1]).map((subsection) => {
    const descIdx = getDescriptionsLineIdx(subsection);
    const info = subsection.slice(0, descIdx === -1 ? 2 : descIdx).flat();
    const date = bestItem(info, [
      [hasYear, 1],
      [hasMonth, 1],
      [hasPresent, 1],
      [hasComma, -1],
    ]);
    const jobTitle = bestItem(info, [
      [hasJobTitle, 4],
      [hasNumber, -4],
      [(item) => item.text.split(/\s/).length > 5, -2],
    ]);
    const company = bestItem(info, [
      [isBold, 2],
      [(item) => Boolean(date && item.text.includes(date)), -4],
      [(item) => Boolean(jobTitle && item.text.includes(jobTitle)), -4],
    ]);
    return {
      company,
      jobTitle,
      date,
      descriptions: getBulletPoints(subsection.slice(descIdx === -1 ? subsection.length : descIdx)),
    };
  });
}

/** Step 4c: education. */
export function extractEducation(sections) {
  const section = Object.entries(sections).find(([name]) =>
    name.toLowerCase().includes('education')
  );
  if (!section) return [];
  return divideSectionIntoSubsections(section[1]).map((subsection) => {
    const descIdx = getDescriptionsLineIdx(subsection);
    const info = subsection.slice(0, descIdx === -1 ? 2 : descIdx).flat();
    const schoolKeyword = (item) =>
      /university|college|institute|academy|school/i.test(item.text);
    const degreeKeyword = (item) =>
      /bachelor|master|doctor|associate|\bb\.?s\.?\b|\bb\.?a\.?\b|\bm\.?s\.?\b|\bm\.?a\.?\b|ph\.?d/i.test(item.text);
    return {
      school: bestItem(info, [[schoolKeyword, 4], [hasNumber, -2]]),
      degree: bestItem(info, [[degreeKeyword, 4], [hasNumber, -2]]),
      gpa: bestItem(info, [[(item) => /gpa|grade point/i.test(item.text), 4]]),
      date: bestItem(info, [[hasYear, 1], [hasMonth, 1], [hasComma, -1]]),
      descriptions: getBulletPoints(subsection.slice(descIdx === -1 ? subsection.length : descIdx)),
    };
  });
}

/** Skills: OpenResume takes all skill-section lines as description text. */
export function extractSkills(sections) {
  const section = Object.entries(sections).find(([name]) =>
    name.toLowerCase().includes('skill')
  );
  if (!section) return [];
  return getBulletPoints(section[1]);
}

/** Convenience entry point used by check.mjs and the parse CLI. */
export async function parseResumePdf(file) {
  const lines = groupTextItemsIntoLines(await readPdf(file));
  const sections = groupLinesIntoSections(lines);
  return {
    profile: extractProfile(sections),
    experience: extractWorkExperience(sections),
    education: extractEducation(sections),
    skills: extractSkills(sections),
    sections: Object.keys(sections),
    lines: lines.map((line) => line.map((item) => item.text)),
  };
}
