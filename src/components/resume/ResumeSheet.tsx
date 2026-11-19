import {
  ResumeInterface,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import {
  DEFAULT_SECTION_ORDER,
  formatDateRange,
  normalizeTheme,
  sectionHasContent,
  splitBullets,
} from '@/lib/resumeDefaults';
import { SECTION_LABELS, themeVars } from '@/lib/resumeDesign';
import type { ReactNode } from 'react';

function hrefFor(value?: string): string {
  if (!value) return '';
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(value)) return value;
  return `https://${value}`;
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value?: string;
  href?: string;
}) {
  if (!value?.trim()) return null;
  return (
    <li className='r-contact-item'>
      <span className='r-contact-label'>{label}</span>
      {href ? (
        <a className='r-contact-value' href={href}>
          {value}
        </a>
      ) : (
        <span className='r-contact-value'>{value}</span>
      )}
    </li>
  );
}

function Bullets({ text }: { text?: string }) {
  const lines = splitBullets(text);
  if (!lines.length) return null;
  return (
    <ul className='r-bullets'>
      {lines.map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  );
}

function SectionHeading({ section }: { section: SectionKey }) {
  return <h2 className='r-h2'>{SECTION_LABELS[section]}</h2>;
}

export default function ResumeSheet({
  resume,
  className = '',
}: {
  resume: ResumeInterface;
  className?: string;
}) {
  const theme = normalizeTheme(resume.theme);
  const order = (resume.sectionOrder ?? DEFAULT_SECTION_ORDER).filter((section) =>
    DEFAULT_SECTION_ORDER.includes(section)
  );
  const hidden = resume.hiddenSections ?? [];
  const visible = order.filter(
    (section) =>
      section !== 'profile' &&
      !hidden.includes(section) &&
      sectionHasContent(resume, section)
  );
  const flow = order.filter((section) => !hidden.includes(section));
  const profileHidden = hidden.includes('profile');
  const profile = resume.profile ?? {};
  const name = profile.fullName?.trim();
  const role = profile.intro?.trim();
  const contactItems: ReactNode[] = [];

  contactItems.push(
    profile.email ? (
      <ContactItem
        key='email'
        label='Email'
        value={profile.email}
        href={`mailto:${profile.email}`}
      />
    ) : null,
    profile.phone ? (
      <ContactItem key='phone' label='Phone' value={profile.phone} href={`tel:${profile.phone.replace(/\s+/g, '')}`} />
    ) : null,
    profile.location ? <ContactItem key='location' label='Location' value={profile.location} /> : null,
    profile.website ? (
      <ContactItem key='website' label='Site' value={profile.website} href={hrefFor(profile.website)} />
    ) : null,
    profile.linkedIn ? (
      <ContactItem key='linkedin' label='LinkedIn' value={profile.linkedIn} href={hrefFor(profile.linkedIn)} />
    ) : null,
    profile.gitHub ? (
      <ContactItem key='github' label='GitHub' value={profile.gitHub} href={hrefFor(profile.gitHub)} />
    ) : null,
    ...(profile.profileCustomField ?? []).map((field, index) =>
      field.fieldValue?.trim() ? (
        <ContactItem key={`custom-${index}`} label={field.fieldName || 'Link'} value={field.fieldValue} />
      ) : null
    )
  );

  const contacts = contactItems.filter(Boolean);
  const hasAnything = visible.length > 0 || contacts.length > 0 || Boolean(name || role);

  const renderSection = (section: SectionKey) => {
    switch (section) {
      case 'skills': {
        const groups = (resume.skillGroups ?? []).filter(
          (group) => group.skills.filter(Boolean).length > 0
        );
        if (!groups.length) return null;
        return (
          <section className='r-section' data-section='skills' key={section}>
            <SectionHeading section='skills' />
            <div className='r-skill-groups'>
              {groups.map((group) => (
                <div className='r-skill-group' key={group.id}>
                  {group.name?.trim() ? (
                    <h3 className='r-skill-group-name'>{group.name}</h3>
                  ) : null}
                  <div className='r-skill-list'>
                    {group.skills
                      .filter((skill) => skill.trim())
                      .map((skill, index) => (
                        <span className='r-skill' key={`${skill}-${index}`}>
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      }

      case 'experience': {
        const entries = (resume.experience ?? []).filter((entry) =>
          [entry.companyName, entry.jobTitle, entry.jobDescription].some((value) =>
            Boolean(value?.trim())
          )
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='experience' key={section}>
            <SectionHeading section='experience' />
            {entries.map((entry, index) => {
              const date =
                formatDateRange(entry.jobDateRange) || entry.jobDate?.trim() || '';
              return (
                <article className='r-entry' key={index}>
                  <div className='r-entry-top'>
                    <div className='r-entry-title-row'>
                      {entry.companyName ? (
                        <span className='r-entry-title'>{entry.companyName}</span>
                      ) : null}
                      {entry.jobTitle ? (
                        <>
                          <span className='r-entry-sep' aria-hidden='true'>
                            /
                          </span>
                          <span className='r-entry-role'>{entry.jobTitle}</span>
                        </>
                      ) : null}
                      {entry.jobLocation ? (
                        <span className='r-entry-meta'>{entry.jobLocation}</span>
                      ) : null}
                    </div>
                    {date ? <span className='r-entry-date'>{date}</span> : null}
                  </div>
                  <Bullets text={entry.jobDescription} />
                </article>
              );
            })}
          </section>
        );
      }

      case 'education': {
        const entries = (resume.education ?? []).filter((entry) =>
          [entry.schoolName, entry.schoolMajor, entry.schoolDescription].some((value) =>
            Boolean(value?.trim())
          )
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='education' key={section}>
            <SectionHeading section='education' />
            {entries.map((entry, index) => {
              const date =
                formatDateRange(entry.schoolDateRange) ||
                entry.schoolDate?.trim() ||
                '';
              return (
                <article className='r-entry' key={index}>
                  <div className='r-entry-top'>
                    <div className='r-entry-title-row'>
                      {entry.schoolName ? (
                        <span className='r-entry-title'>{entry.schoolName}</span>
                      ) : null}
                      {entry.schoolMajor ? (
                        <>
                          <span className='r-entry-sep' aria-hidden='true'>
                            /
                          </span>
                          <span className='r-entry-role'>{entry.schoolMajor}</span>
                        </>
                      ) : null}
                      {entry.schoolGPA ? (
                        <span className='r-entry-meta'>GPA {entry.schoolGPA}</span>
                      ) : null}
                    </div>
                    {date ? <span className='r-entry-date'>{date}</span> : null}
                  </div>
                  <Bullets text={entry.schoolDescription} />
                </article>
              );
            })}
          </section>
        );
      }

      case 'projects': {
        const entries = (resume.projects ?? []).filter((entry) =>
          [entry.projectName, entry.projectDescription].some((value) =>
            Boolean(value?.trim())
          )
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='projects' key={section}>
            <SectionHeading section='projects' />
            {entries.map((entry, index) => (
              <article className='r-entry' key={index}>
                <div className='r-entry-top'>
                  <div className='r-entry-title-row'>
                    {entry.projectName ? (
                      <span className='r-entry-title'>{entry.projectName}</span>
                    ) : null}
                    {entry.projectLink ? (
                      <a className='r-entry-link' href={hrefFor(entry.projectLink)}>
                        {entry.projectLink}
                      </a>
                    ) : null}
                  </div>
                </div>
                <Bullets text={entry.projectDescription} />
              </article>
            ))}
          </section>
        );
      }

      case 'certifications': {
        const entries = (resume.certifications ?? []).filter((entry) =>
          [entry.certificationName, entry.certificationDescription].some((value) =>
            Boolean(value?.trim())
          )
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='certifications' key={section}>
            <SectionHeading section='certifications' />
            {entries.map((entry, index) => (
              <article className='r-entry' key={index}>
                <div className='r-entry-top'>
                  <div className='r-entry-title-row'>
                    <span className='r-entry-title'>{entry.certificationName}</span>
                    {entry.certificationIssuer ? (
                      <span className='r-entry-role'>{entry.certificationIssuer}</span>
                    ) : null}
                  </div>
                  {entry.certificationDate ? (
                    <span className='r-entry-date'>{entry.certificationDate}</span>
                  ) : null}
                </div>
                {entry.certificationDescription ? (
                  <p className='r-entry-note'>{entry.certificationDescription}</p>
                ) : null}
              </article>
            ))}
          </section>
        );
      }

      case 'awards': {
        const entries = (resume.awards ?? []).filter((entry) =>
          [entry.awardName, entry.awardDescription].some((value) => Boolean(value?.trim()))
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='awards' key={section}>
            <SectionHeading section='awards' />
            {entries.map((entry, index) => (
              <article className='r-entry' key={index}>
                <div className='r-entry-top'>
                  <div className='r-entry-title-row'>
                    <span className='r-entry-title'>{entry.awardName}</span>
                    {entry.awardIssuer ? (
                      <span className='r-entry-role'>{entry.awardIssuer}</span>
                    ) : null}
                  </div>
                  {entry.awardDate ? (
                    <span className='r-entry-date'>{entry.awardDate}</span>
                  ) : null}
                </div>
                {entry.awardDescription ? (
                  <p className='r-entry-note'>{entry.awardDescription}</p>
                ) : null}
              </article>
            ))}
          </section>
        );
      }

      case 'references': {
        const entries = (resume.references ?? []).filter((entry) =>
          [entry.referenceName, entry.referenceDescription].some((value) =>
            Boolean(value?.trim())
          )
        );
        if (!entries.length) return null;
        return (
          <section className='r-section' data-section='references' key={section}>
            <SectionHeading section='references' />
            {entries.map((entry, index) => (
              <article className='r-entry' key={index}>
                <div className='r-entry-top'>
                  <div className='r-entry-title-row'>
                    <span className='r-entry-title'>{entry.referenceName}</span>
                    {[entry.referenceRole, entry.referenceCompany]
                      .filter(Boolean)
                      .join(', ') ? (
                      <span className='r-entry-role'>
                        {[entry.referenceRole, entry.referenceCompany]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    ) : null}
                  </div>
                  {entry.referenceEmail ? (
                    <span className='r-entry-date'>{entry.referenceEmail}</span>
                  ) : null}
                </div>
                {entry.referenceDescription ? (
                  <p className='r-entry-note'>{entry.referenceDescription}</p>
                ) : null}
              </article>
            ))}
          </section>
        );
      }

      case 'languages': {
        const items = (resume.languageItems ?? []).filter((item) => item.name?.trim());
        if (!items.length) return null;
        return (
          <section className='r-section' data-section='languages' key={section}>
            <SectionHeading section='languages' />
            <div className='r-languages'>
              {items.map((item) => (
                <div className='r-language' key={item.id}>
                  <span className='r-language-name'>{item.name}</span>
                  {item.proficiency ? (
                    <span className='r-language-level'>{item.proficiency}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <article
      className={`r-sheet r-t-${theme.template} ${className}`}
      data-paper={theme.paper ?? 'a4'}
      data-empty={!hasAnything ? 'true' : undefined}
      style={themeVars(theme)}
    >
      <header className={`r-head ${profileHidden ? 'r-head--quiet' : ''}`}>
        <div className='r-head-name'>
          <h1 className='r-name'>{name || 'Your name'}</h1>
          {role ? <p className='r-role'>{role}</p> : null}
        </div>
        {!profileHidden && contacts.length ? (
          <ul className='r-contact'>{contacts}</ul>
        ) : null}
      </header>

      <div className='r-flow'>
        {flow.map((section) =>
          section === 'profile' ? (
            profile.summary?.trim() ? (
              <section
                key='profile'
                className='r-section r-section--summary'
                data-section='profile'
              >
                <h2 className='r-h2'>Summary</h2>
                <p className='r-summary'>{profile.summary}</p>
              </section>
            ) : null
          ) : (
            renderSection(section)
          )
        )}

        {!hasAnything ? (
          <div className='r-empty'>
            <span>Your resume starts here.</span>
            <span className='r-empty-note'>Add a name, a role and one section to see the page take shape.</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
