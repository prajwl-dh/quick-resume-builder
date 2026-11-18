import { ResumeInterface, SectionKey } from '../builder/previousResumes/ResumeInterface';
import {
  DEFAULT_SECTION_ORDER,
  DEFAULT_THEME,
  sectionHasContent,
} from '@/lib/resumeDefaults';

const lines = (value?: string): string[] =>
  value
    ? value
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

/** DOM preview of the resume. Mirrors ResumeDocument (the PDF) but renders as real HTML. */
export default function ResumePaper({
  resume,
}: {
  resume: ResumeInterface | undefined;
}) {
  const theme = resume?.theme ?? DEFAULT_THEME;
  const accent = theme.color;
  const isModern = theme.template === 'modern';
  const isMinimal = theme.template === 'minimal';

  const fontFamily =
    theme.font === 'Times-Roman'
      ? 'Georgia, "Times New Roman", serif'
      : theme.font === 'Courier'
        ? 'ui-monospace, SFMono-Regular, Menlo, monospace'
        : 'Helvetica, Arial, sans-serif';

  const headingStyle: React.CSSProperties = {
    fontSize: isMinimal ? 12 : 14,
    fontWeight: 700,
    color: isModern ? accent : '#1B1D20',
    textTransform: isModern || isMinimal ? 'uppercase' : undefined,
    letterSpacing: isModern ? 0.8 : 0,
    borderBottom: isModern
      ? `2px solid ${accent}`
      : isMinimal
        ? undefined
        : `1px solid ${accent}`,
    paddingBottom: isModern || !isMinimal ? 4 : 0,
    marginBottom: 9,
  };

  const body: React.CSSProperties = {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 5,
    color: '#374151',
  };

  const entryTitle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 700,
    color: isModern ? accent : '#1B1D20',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: 11.5,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: '#4B5563',
  };

  const Bullets = ({ text }: { text?: string }) => (
    <ul className='mt-1 list-none space-y-0.5'>
      {lines(text).map((line, index) => (
        <li key={index} style={body} className='flex gap-1.5'>
          <span aria-hidden='true'>•</span>
          <span className='min-w-0 break-words'>{line}</span>
        </li>
      ))}
    </ul>
  );

  const SimpleList = ({
    title,
    section,
  }: {
    title: string;
    section: 'projects' | 'certifications' | 'awards' | 'references';
  }) => {
    const entries = resume?.[section] ?? [];
    if (!entries.length) return null;
    const nameKey = {
      projects: 'projectName',
      certifications: 'certificationName',
      awards: 'awardName',
      references: 'referenceName',
    } as const;
    const descriptionKey = {
      projects: 'projectDescription',
      certifications: 'certificationDescription',
      awards: 'awardDescription',
      references: 'referenceDescription',
    } as const;
    return (
      <section className='mb-5'>
        <h2 style={headingStyle}>{title}</h2>
        <div className='space-y-3'>
          {entries.map((entry, index) => (
            <div key={index}>
              <p style={{ ...body, fontWeight: 600, color: '#1B1D20', marginBottom: 2 }}>
                {(entry as any)[nameKey[section]]}
              </p>
              {(entry as any)[descriptionKey[section]] ? (
                <p style={{ ...body, fontWeight: 600, marginBottom: 1 }}>Details</p>
              ) : null}
              <Bullets text={(entry as any)[descriptionKey[section]]} />
            </div>
          ))}
        </div>
      </section>
    );
  };

  const profile = (
    <>
      <div className='mb-1'>
        <div
          style={{
            fontSize: isModern ? 24 : isMinimal ? 18 : 21,
            fontWeight: 800,
            color: isModern ? accent : '#1B1D20',
            textTransform: isMinimal ? 'uppercase' : undefined,
          }}
        >
          {resume?.profile.fullName}
        </div>
        {resume?.profile.intro ? (
          <div style={{ fontSize: 13, marginTop: 2, color: isModern ? accent : '#374151' }}>
            {resume.profile.intro}
          </div>
        ) : null}
      </div>
      <div className='mb-5 flex flex-wrap gap-x-2.5 gap-y-0.5' style={{ fontSize: 11.5 }}>
        {resume?.profile.email ? (
          <span style={{ color: accent, textDecoration: 'underline' }}>
            {resume.profile.email}
          </span>
        ) : null}
        {resume?.profile.phone ? <span>{resume.profile.phone}</span> : null}
        {resume?.profile.location ? <span>{resume.profile.location}</span> : null}
        {resume?.profile.website ? (
          <span style={{ color: accent, textDecoration: 'underline', overflowWrap: 'anywhere' }}>
            {resume.profile.website}
          </span>
        ) : null}
        {resume?.profile.linkedIn ? (
          <span style={{ color: accent, textDecoration: 'underline', overflowWrap: 'anywhere' }}>
            {resume.profile.linkedIn}
          </span>
        ) : null}
        {resume?.profile.gitHub ? (
          <span style={{ color: accent, textDecoration: 'underline', overflowWrap: 'anywhere' }}>
            {resume.profile.gitHub}
          </span>
        ) : null}
        {resume?.profile.profileCustomField?.map((field, index) => (
          <span key={index} style={{ overflowWrap: 'anywhere' }}>
            {field.fieldValue}
          </span>
        ))}
      </div>
      {resume?.profile.summary ? (
        <section className='mb-5'>
          <h2 style={headingStyle}>Professional Summary</h2>
          {lines(resume.profile.summary).map((line, index) => (
            <p key={index} style={body}>
              {line}
            </p>
          ))}
        </section>
      ) : null}
    </>
  );

  const skillsGroups = resume?.skillGroups ?? [];
  const hasLegacySkills = Boolean(resume?.skills?.trim());
  const skills =
    !skillsGroups.length && !hasLegacySkills ? null : (
      <section className='mb-5'>
        <h2 style={headingStyle}>Skills</h2>
        {skillsGroups.length
          ? skillsGroups
              .filter((group) => group.skills.length > 0)
              .map((group, index) => (
                <p key={group.id || index} style={{ ...body, marginLeft: 4 }}>
                  • <span style={{ fontWeight: 600 }}>{group.name}:</span>{' '}
                  {group.skills.join(', ')}
                </p>
              ))
          : lines(resume?.skills).map((line, index) => {
              const separator = line.indexOf(':');
              return (
                <p key={index} style={{ ...body, marginLeft: 4 }}>
                  •{' '}
                  {separator > -1 ? (
                    <>
                      <span style={{ fontWeight: 600 }}>
                        {line.slice(0, separator).trim()}:
                      </span>{' '}
                      {line.slice(separator + 1).trim()}
                    </>
                  ) : (
                    line
                  )}
                </p>
              );
            })}
      </section>
    );

  const experience =
    resume?.experience && resume.experience.length > 0 ? (
      <section className='mb-5'>
        <h2 style={headingStyle}>Work Experience</h2>
        <div className='space-y-3'>
          {resume.experience.map((entry, index) => (
            <div key={index}>
              <div className='flex items-baseline justify-between gap-3'>
                <div className='min-w-0'>
                  <div style={entryTitle}>{entry.companyName}</div>
                  <div style={{ fontSize: 12, color: '#374151' }}>{entry.jobTitle}</div>
                  {entry.jobDescription ? (
                    <div style={{ fontSize: 11, fontWeight: 600, marginTop: 3 }}>
                      Key Achievements
                    </div>
                  ) : null}
                </div>
                <div style={dateStyle}>{entry.jobDate}</div>
              </div>
              <Bullets text={entry.jobDescription} />
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const education =
    resume?.education && resume.education.length > 0 ? (
      <section className='mb-5'>
        <h2 style={headingStyle}>Education</h2>
        <div className='space-y-3'>
          {resume.education.map((entry, index) => (
            <div key={index}>
              <div className='flex items-baseline justify-between gap-3'>
                <div className='min-w-0'>
                  <div style={entryTitle}>{entry.schoolName}</div>
                  <div style={{ fontSize: 12, color: '#374151' }}>{entry.schoolMajor}</div>
                  {entry.schoolGPA ? (
                    <div style={{ fontSize: 11, color: '#4B5563' }}>
                      GPA: {entry.schoolGPA}
                    </div>
                  ) : null}
                  {entry.schoolDescription ? (
                    <div style={{ fontSize: 11, fontWeight: 600, marginTop: 3 }}>
                      Highlights
                    </div>
                  ) : null}
                </div>
                <div style={dateStyle}>{entry.schoolDate}</div>
              </div>
              <Bullets text={entry.schoolDescription} />
            </div>
          ))}
        </div>
      </section>
    ) : null;

  const languageItems = resume?.languageItems ?? [];
  const hasLegacyLanguages = Boolean(resume?.languages?.trim());
  const languages =
    !languageItems.length && !hasLegacyLanguages ? null : (
      <section className='mb-5'>
        <h2 style={headingStyle}>Languages</h2>
        {languageItems.length
          ? languageItems.map((item, index) => (
              <p key={item.id || index} style={{ ...body, marginLeft: 4 }}>
                • <span style={{ fontWeight: 600 }}>{item.name}:</span>{' '}
                {item.proficiency}
              </p>
            ))
          : lines(resume?.languages).map((line, index) => {
              const separator = line.indexOf(':');
              return (
                <p key={index} style={{ ...body, marginLeft: 4 }}>
                  •{' '}
                  {separator > -1 ? (
                    <>
                      <span style={{ fontWeight: 600 }}>
                        {line.slice(0, separator).trim()}:
                      </span>{' '}
                      {line.slice(separator + 1).trim()}
                    </>
                  ) : (
                    line
                  )}
                </p>
              );
            })}
      </section>
    );

  const views: Record<SectionKey, React.ReactNode> = {
    profile,
    skills,
    experience,
    education,
    projects: <SimpleList title='Projects' section='projects' />,
    certifications: <SimpleList title='Certifications' section='certifications' />,
    awards: <SimpleList title='Awards' section='awards' />,
    references: <SimpleList title='References' section='references' />,
    languages,
  };

  const order = resume?.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const hidden = resume?.hiddenSections ?? [];

  return (
    <div
      style={{ fontFamily, color: '#1B1D20' }}
      className='w-full break-words'
    >
      {order
        .filter(
          (section) => !hidden.includes(section) && sectionHasContent(resume, section)
        )
        .map((section) => (
          <div key={section}>{views[section]}</div>
        ))}
    </div>
  );
}
