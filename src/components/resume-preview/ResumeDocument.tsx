import { Document, Page, Text, View } from '@react-pdf/renderer';
import { ResumeInterface, SectionKey } from '../builder/previousResumes/ResumeInterface';
import {
  DEFAULT_SECTION_ORDER,
  DEFAULT_THEME,
  sectionHasContent,
} from '@/lib/resumeDefaults';
import { ReactNode } from 'react';

const lines = (value?: string): string[] =>
  value
    ? value
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

export default function ResumeDocument({
  resume,
  pageHeight,
}: {
  resume: ResumeInterface | undefined;
  pageHeight?: number;
}) {
  const theme = resume?.theme ?? DEFAULT_THEME;
  const isModern = theme.template === 'modern';
  const isMinimal = theme.template === 'minimal';
  const accent = theme.color;

  const headingStyle: any = {
    fontWeight: 800,
    fontSize: isModern ? 11 : isMinimal ? 10 : 12,
    marginBottom: isMinimal ? 4 : 6,
    color: isModern ? accent : 'black',
    textTransform: isModern || isMinimal ? 'uppercase' : undefined,
    letterSpacing: isModern ? 1 : 0,
    borderBottom: isModern
      ? `2px solid ${accent}`
      : isMinimal
      ? undefined
      : `1px solid ${accent}`,
    paddingBottom: isModern || !isMinimal ? 3 : 0,
  };

  const bodyText: any = {
    fontSize: 10,
    fontWeight: 300,
    marginBottom: 6,
    lineHeight: 1.4,
  };

  const bullet = (text: string, index: number, marker = '•') => (
    <Text key={index} style={{ ...bodyText, marginLeft: 5 }}>
      {marker}{' '}
      <Text>{text}</Text>
    </Text>
  );

  const profileView: ReactNode = (
    <>
      <View style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <Text
          style={{
            fontWeight: 800,
            fontSize: isModern ? 18 : isMinimal ? 13 : 14,
            color: isModern ? accent : 'black',
            textTransform: isMinimal ? 'uppercase' : undefined,
          }}
        >
          {resume?.profile.fullName}
        </Text>
        {resume?.profile.intro ? (
          <Text
            style={{
              fontSize: 10,
              marginTop: '2px',
              fontWeight: 300,
              color: isModern ? accent : 'black',
            }}
          >
            {resume?.profile.intro}
          </Text>
        ) : null}
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          rowGap: '2px',
          columnGap: '10px',
          fontSize: 10,
          fontWeight: 300,
          marginBottom: '20px',
        }}
      >
        {resume?.profile.email ? (
          <Text style={{ textDecoration: 'underline', color: accent }}>
            {resume.profile.email}
          </Text>
        ) : null}
        {resume?.profile.phone ? <Text>{resume.profile.phone}</Text> : null}
        {resume?.profile.location ? <Text>{resume.profile.location}</Text> : null}
        {resume?.profile.website ? (
          <Text style={{ textDecoration: 'underline', color: accent }}>
            {resume.profile.website}
          </Text>
        ) : null}
        {resume?.profile.linkedIn ? (
          <Text style={{ textDecoration: 'underline', color: accent }}>
            {resume.profile.linkedIn}
          </Text>
        ) : null}
        {resume?.profile.gitHub ? (
          <Text style={{ textDecoration: 'underline', color: accent }}>
            {resume.profile.gitHub}
          </Text>
        ) : null}
        {resume?.profile.profileCustomField?.map((field, index) => (
          <Text key={index}>{field.fieldValue}</Text>
        ))}
      </View>

      {resume?.profile.summary ? (
        <View style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <Text style={headingStyle}>Professional Summary</Text>
          {lines(resume.profile.summary).map((line, index) => (
            <Text key={index} style={bodyText}>
              {line}
            </Text>
          ))}
        </View>
      ) : null}
    </>
  );

  const skillsView: ReactNode = (() => {
    const groups = resume?.skillGroups ?? [];
    const hasLegacy = Boolean(resume?.skills?.trim());
    if (!groups.length && !hasLegacy) return null;
    return (
      <View style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <Text style={headingStyle}>Skills</Text>
        {groups.length
          ? groups
              .filter((group) => group.skills.length > 0)
              .map((group, index) => (
                <Text key={group.id || index} style={{ ...bodyText, marginLeft: 5 }}>
                  • <Text style={{ fontWeight: 600 }}>{group.name}:</Text>{' '}
                  {group.skills.join(', ')}
                </Text>
              ))
          : lines(resume?.skills).map((line, index) => {
              const separator = line.indexOf(':');
              return (
                <Text key={index} style={{ ...bodyText, marginLeft: 5 }}>
                  •{' '}
                  {separator > -1 ? (
                    <>
                      <Text style={{ fontWeight: 600 }}>
                        {line.slice(0, separator).trim()}:
                      </Text>{' '}
                      {line.slice(separator + 1).trim()}
                    </>
                  ) : (
                    <Text>{line}</Text>
                  )}
                </Text>
              );
            })}
      </View>
    );
  })();

  const experienceView: ReactNode =
    resume?.experience && resume.experience.length > 0 ? (
      <View style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Text style={headingStyle}>Work Experience</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {resume.experience.map((entry, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isModern ? accent : 'black',
                    }}
                  >
                    {entry.companyName}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 400, color: '#1f2937' }}>
                    {entry.jobTitle}
                  </Text>
                  {entry.jobDescription ? (
                    <Text
                      style={{ fontSize: 9, fontWeight: 600, marginTop: 3, marginBottom: 2 }}
                    >
                      Key Achievements
                    </Text>
                  ) : null}
                </View>
                <View style={{ flexShrink: 0 }}>
                  <Text style={{ fontSize: 10, fontWeight: 600 }}>
                    {entry.jobDate}
                  </Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {lines(entry.jobDescription).map((line, lineIndex) =>
                  bullet(line, lineIndex)
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    ) : null;

  const educationView: ReactNode =
    resume?.education && resume.education.length > 0 ? (
      <View style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Text style={headingStyle}>Education</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {resume.education.map((entry, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <View style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isModern ? accent : 'black',
                    }}
                  >
                    {entry.schoolName}
                  </Text>
                  <Text style={{ fontSize: 10, fontWeight: 400, color: '#1f2937' }}>
                    {entry.schoolMajor}
                  </Text>
                  <Text style={{ fontSize: 9, fontWeight: 400, color: '#1f2937' }}>
                    {entry.schoolGPA ? `GPA: ${entry.schoolGPA}` : null}
                  </Text>
                  {entry.schoolDescription ? (
                    <Text
                      style={{ fontSize: 9, fontWeight: 600, marginTop: 3, marginBottom: 2 }}
                    >
                      Highlights
                    </Text>
                  ) : null}
                </View>
                <View style={{ flexShrink: 0 }}>
                  <Text style={{ fontSize: 10, fontWeight: 600 }}>
                    {entry.schoolDate}
                  </Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column' }}>
                {lines(entry.schoolDescription).map((line, lineIndex) =>
                  bullet(line, lineIndex)
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    ) : null;

  const simpleListView = (
    section: 'projects' | 'certifications' | 'awards' | 'references',
    title: string
  ): ReactNode => {
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
      <View style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Text style={headingStyle}>{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {entries.map((entry, index) => (
            <View key={index} style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ fontSize: 10, fontWeight: 600 }}>
                {(entry as any)[nameKey[section]]}
              </Text>
              {(entry as any)[descriptionKey[section]] ? (
                <Text style={{ fontSize: 10, fontWeight: 600 }}>Details</Text>
              ) : null}
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '5px',
                }}
              >
                {lines((entry as any)[descriptionKey[section]]).map((line, lineIndex) =>
                  bullet(line, lineIndex)
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const languagesView: ReactNode = (() => {
    const items = resume?.languageItems ?? [];
    const hasLegacy = Boolean(resume?.languages?.trim());
    if (!items.length && !hasLegacy) return null;
    return (
      <View style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
        <Text style={headingStyle}>Languages</Text>
        {items.length
          ? items.map((item, index) => (
              <Text key={item.id || index} style={{ ...bodyText, marginLeft: 5 }}>
                • <Text style={{ fontWeight: 600 }}>{item.name}:</Text> {item.proficiency}
              </Text>
            ))
          : lines(resume?.languages).map((line, index) => {
              const separator = line.indexOf(':');
              return (
                <Text key={index} style={{ ...bodyText, marginLeft: 5 }}>
                  •{' '}
                  {separator > -1 ? (
                    <>
                      <Text style={{ fontWeight: 600 }}>
                        {line.slice(0, separator).trim()}:
                      </Text>{' '}
                      {line.slice(separator + 1).trim()}
                    </>
                  ) : (
                    <Text>{line}</Text>
                  )}
                </Text>
              );
            })}
      </View>
    );
  })();

  const sectionViews: Record<SectionKey, ReactNode> = {
    profile: profileView,
    skills: skillsView,
    experience: experienceView,
    education: educationView,
    projects: simpleListView('projects', 'Projects'),
    certifications: simpleListView('certifications', 'Certifications'),
    awards: simpleListView('awards', 'Awards'),
    references: simpleListView('references', 'References'),
    languages: languagesView,
  };

  const hidden = resume?.hiddenSections ?? [];
  const order = resume?.sectionOrder ?? DEFAULT_SECTION_ORDER;

  return (
    <Document>
      <Page
        size={pageHeight ? [612, pageHeight] : 'LETTER'}
        style={{ padding: 20 }}
      >
        <View style={{ color: 'black', fontFamily: theme.font }}>
          {order
            .filter(
              (section) => !hidden.includes(section) && sectionHasContent(resume, section)
            )
            .map((section) => (
              <View key={section}>{sectionViews[section]}</View>
            ))}
        </View>
      </Page>
    </Document>
  );
}
