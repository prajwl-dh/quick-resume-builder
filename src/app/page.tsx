'use client';

import Footer from '@/components/footer/Footer';
import Hero from '@/components/marketing/Hero';
import MarketingNav from '@/components/marketing/MarketingNav';
import TemplateShowcase from '@/components/marketing/TemplateShowcase';
import Link from 'next/link';
import { useRef } from 'react';
import {
  LuArrowRight,
  LuCheck,
  LuEye,
  LuFileText,
  LuGripVertical,
  LuLink,
  LuLock,
  LuMinus,
  LuPlus,
  LuShieldCheck,
  LuType,
} from 'react-icons/lu';

type SectionKey = 'templates' | 'editor' | 'privacy' | 'questions';

const questions = [
  {
    q: 'Do I need an account?',
    a: 'No. There is no sign-up, no email and no password. Open the builder and start writing. Each resume is saved in this browser as you type.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes. All twelve templates, the type controls and the PDF export are free. There is no watermark and no paid unlock waiting at the end.',
  },
  {
    q: 'Where are my resumes stored?',
    a: 'In this browser, using local storage on this device. They are not uploaded to a server. If you clear site data or use a different browser, they will not be there.',
  },
  {
    q: 'Can I move a resume to another computer?',
    a: 'Yes. Open the menu in the editor and download a backup, then use “Import a backup” on the workspace page of the other device.',
  },
  {
    q: 'Will an applicant tracking system read it?',
    a: 'Yes. All templates have been tested using the Open Resume Parser and actual ATS parsing tests to verify that the text and fields in each PDF are correctly extracted and read by applicant tracking systems (ATS).',
  },
];

export default function HomePage() {
  const templatesRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLElement>(null);
  const privacyRef = useRef<HTMLElement>(null);
  const questionsRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: SectionKey) => {
    const refs = {
      templates: templatesRef,
      editor: editorRef,
      privacy: privacyRef,
      questions: questionsRef,
    };
    refs[section].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className='flex min-h-dvh flex-col bg-canvas'>
      <MarketingNav onNavigate={scrollToSection} />

      <main className='flex-1'>
        <Hero onBrowseTemplates={() => scrollToSection('templates')} />
        <TemplateShowcase sectionRef={templatesRef} />

        <section ref={editorRef} id='editor' className='scroll-mt-16 py-16 lg:py-24'>
          <div className='shell grid gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-14'>
            <div className='max-w-md lg:sticky lg:top-24 lg:self-start'>
              <p className='eyebrow'>The editor</p>
              <h2 className='mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[46px]'>
                Built around the page, not around forms.
              </h2>
              <p className='mt-4 text-[14px] leading-[1.7] text-ink-soft'>
                One section at a time, with the resume always in view. There is no setup
                wizard and nothing to configure before your first sentence. Open the
                builder and write.
              </p>
              <Link href='/builder' className='btn btn-primary mt-6'>
                See it with your own words
                <LuArrowRight className='h-4 w-4' />
              </Link>
              <p className='mt-4 text-[11.5px] leading-[1.6] text-ink-faint'>
                The example resume is there if you want to look around first.
              </p>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <article className='group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft'>
                <div className='rounded-xl border border-line bg-sunken/50 p-2.5'>
                  <div className='flex items-center justify-between px-1 pb-2'>
                    <span className='text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint'>
                      Sections
                    </span>
                    <span className='rounded-full border border-line bg-surface px-1.5 py-0.5 text-[9.5px] text-ink-faint'>
                      Drag to reorder
                    </span>
                  </div>
                  {['Profile', 'Experience', 'Skills', 'Education'].map((label, index) => (
                    <div
                      key={label}
                      className={`mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] ${
                        index === 1 ? 'bg-accent-soft text-accent' : 'bg-surface text-ink-soft'
                      }`}
                    >
                      <LuGripVertical className='h-3 w-3 shrink-0 opacity-50' />
                      <span className='flex-1'>{label}</span>
                      <LuEye className='h-3 w-3 shrink-0 opacity-50' />
                    </div>
                  ))}
                </div>
                <h3 className='mt-4 text-[14.5px] font-semibold text-ink'>
                  Sections keep their place.
                </h3>
                <p className='mt-1 text-[12.5px] leading-[1.6] text-ink-soft'>
                  Move a role, a skill group or a whole section. Hide what this application
                  does not need; it stays saved for the next one.
                </p>
              </article>

              <article className='group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft'>
                <div className='rounded-xl border border-line bg-sunken/50 p-3'>
                  <div className='flex items-center gap-2.5'>
                    <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-[17px] font-semibold text-ink shadow-[0_1px_2px_rgba(20,18,14,0.08)]'>
                      Aa
                    </span>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center justify-between text-[10px] text-ink-faint'>
                        <span>Source Serif</span>
                        <span>100%</span>
                      </div>
                      <div className='mt-1.5 h-1 rounded-full bg-line'>
                        <div className='ml-[34%] h-1 w-1.5 -translate-y-0.5 rounded-full bg-accent' />
                      </div>
                      <div className='mt-2 flex items-center justify-between text-[10px] text-ink-faint'>
                        <span>Line height</span>
                        <span>1.45</span>
                      </div>
                      <div className='mt-1.5 h-1 rounded-full bg-line'>
                        <div className='ml-[52%] h-1 w-1.5 -translate-y-0.5 rounded-full bg-accent' />
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 flex gap-1'>
                    {['#1E5B49', '#1F4E72', '#8C332B', '#1B1A17', '#6B5542'].map((ink) => (
                      <span
                        key={ink}
                        className='h-4 w-4 rounded-full border border-white/20'
                        style={{ backgroundColor: ink }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className='mt-4 text-[14.5px] font-semibold text-ink'>
                  Type you can tune.
                </h3>
                <p className='mt-1 text-[12.5px] leading-[1.6] text-ink-soft'>
                  Twelve typefaces, twenty-eight inks and controls for size, leading and spacing. A
                  long career can fit on two pages without shrinking to nothing.
                </p>
              </article>

              <article className='group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft'>
                <div className='rounded-xl border border-line bg-sunken/50 p-3'>
                  <div className='mx-auto w-full max-w-[150px] rounded-[3px] border border-line bg-[#fffdf9] p-3 shadow-[0_6px_16px_-10px_rgba(20,18,14,0.4)]'>
                    <div className='h-1.5 w-1/2 rounded bg-ink/70' />
                    <div className='mt-1 h-1 w-1/3 rounded bg-ink/20' />
                    <div className='mt-3 h-1 w-1/4 rounded bg-accent/60' />
                    <div className='mt-1.5 space-y-1'>
                      <div className='h-1 w-full rounded bg-ink/12' />
                      <div className='h-1 w-11/12 rounded bg-ink/12' />
                      <div className='h-1 w-4/5 rounded bg-ink/12' />
                    </div>
                    <div className='mt-3 h-1 w-1/4 rounded bg-accent/60' />
                    <div className='mt-1.5 space-y-1'>
                      <div className='h-1 w-full rounded bg-ink/12' />
                      <div className='h-1 w-10/12 rounded bg-ink/12' />
                    </div>
                  </div>
                  <div className='mt-3 flex flex-wrap justify-center gap-1'>
                    {['A4 · 15mm', 'Selectable text', 'Live links'].map((chip) => (
                      <span
                        key={chip}
                        className='rounded-full border border-line bg-surface px-1.5 py-0.5 text-[9px] font-medium text-ink-faint'
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className='mt-4 text-[14.5px] font-semibold text-ink'>
                  A PDF that is still a document.
                </h3>
                <p className='mt-1 text-[12.5px] leading-[1.6] text-ink-soft'>
                  Text stays text and links stay links. Choose one page or let it run to a
                  second, on A4 or US Letter, straight from the export dialog.
                </p>
              </article>

              <article className='group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft'>
                <div className='rounded-xl border border-line bg-sunken/50 p-3'>
                  <div className='flex items-center gap-3'>
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent/30 text-[15px] font-semibold tabular-nums text-accent'>
                      86
                    </span>
                    <div className='min-w-0 flex-1 space-y-1.5'>
                      <div className='flex items-center gap-1.5 text-[10.5px] text-ink-soft'>
                        <LuCheck className='h-3 w-3 text-accent' />
                        Every role has dates
                      </div>
                      <div className='flex items-center gap-1.5 text-[10.5px] text-ink-soft'>
                        <LuCheck className='h-3 w-3 text-accent' />
                        Six skills across two groups
                      </div>
                      <div className='flex items-center gap-1.5 text-[10.5px] text-ink-faint'>
                        <LuMinus className='h-3 w-3' />
                        Add a second contact detail
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className='mt-4 text-[14.5px] font-semibold text-ink'>
                  A second read before you send.
                </h3>
                <p className='mt-1 text-[12.5px] leading-[1.6] text-ink-soft'>
                  The resume check looks for dates, a summary, contact details and specific
                  bullets. It says what is missing, not what to write.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id='how' className='scroll-mt-16 border-y border-line bg-surface/50 py-16 lg:py-20'>
          <div className='shell'>
            <div className='max-w-xl'>
              <p className='eyebrow'>Three steps</p>
              <h2 className='mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[46px]'>
                From a blank page to a finished page.
              </h2>
              <p className='mt-3 text-[14px] leading-[1.7] text-ink-soft'>
                You do not need to finish the resume in one sitting. It is saved where you
                left it.
              </p>
            </div>

            <ol className='mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3'>
              {[
                {
                  n: '01',
                  title: 'Start with the basics.',
                  text: 'A name and the role you are applying for. Pick a template now or leave it for later.',
                },
                {
                  n: '02',
                  title: 'Write one section at a time.',
                  text: 'One job, one line per achievement. The page updates beside you as the words land.',
                },
                {
                  n: '03',
                  title: 'Download it, or keep going.',
                  text: 'Download a PDF directly, or close the tab and come back. Both work.',
                },
              ].map((step) => (
                <li key={step.n} className='group bg-surface p-6 transition-colors hover:bg-canvas'>
                  <span className='font-display text-[34px] leading-none text-ink-faint transition-colors group-hover:text-accent'>
                    {step.n}
                  </span>
                  <h3 className='mt-4 text-[16px] font-semibold tracking-[-0.01em] text-ink'>
                    {step.title}
                  </h3>
                  <p className='mt-2 max-w-xs text-[13px] leading-[1.65] text-ink-soft'>
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section ref={privacyRef} id='privacy' className='scroll-mt-16 bg-ink py-16 text-canvas lg:py-24'>
          <div className='shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16'>
            <div>
              <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-canvas/50'>
                Privacy
              </p>
              <h2 className='mt-4 max-w-lg font-display text-[40px] leading-[1.02] tracking-[-0.02em] text-canvas sm:text-[52px]'>
                Your resume stays on your machine.
              </h2>
              <p className='mt-4 max-w-md text-[14px] leading-[1.75] text-canvas/65'>
                There is no account and no server copy. Resumes live in this browser&apos;s
                local storage. Clearing site data removes them, so download a backup from
                the editor if you want a second copy.
              </p>
            </div>

            <div className='rounded-2xl border border-canvas/15 bg-canvas/[0.05] p-5 sm:p-6'>
              <div className='rounded-xl border border-canvas/15 bg-ink/40 p-4'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-2.5'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-canvas/10 text-canvas'>
                      <LuFileText className='h-4 w-4' />
                    </span>
                    <div>
                      <p className='text-[12.5px] font-medium text-canvas'>
                        Senior frontend engineer
                      </p>
                      <p className='text-[10.5px] text-canvas/45'>A4 · 1 page · saved</p>
                    </div>
                  </div>
                  <span className='inline-flex items-center gap-1.5 rounded-full border border-canvas/15 px-2 py-0.5 text-[10px] text-canvas/60'>
                    <LuLock className='h-3 w-3' />
                    Local only
                  </span>
                </div>

                <div className='mt-4 space-y-2'>
                  {[
                    { icon: LuShieldCheck, label: 'No analytics or tracking scripts' },
                    { icon: LuLink, label: 'No uploads, no remote copy' },
                    { icon: LuType, label: 'Fonts load from Google Fonts' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className='flex items-center gap-2.5 rounded-lg bg-canvas/[0.04] px-3 py-2 text-[11.5px] text-canvas/70'
                      >
                        <Icon className='h-3.5 w-3.5 shrink-0 text-canvas/45' />
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className='mt-4 text-[11px] leading-[1.6] text-canvas/40'>
                The only network request is for the typefaces. Nothing about your resume is
                sent anywhere.
              </p>
            </div>
          </div>
        </section>

        <section ref={questionsRef} id='questions' className='scroll-mt-16 py-16 lg:py-24'>
          <div className='shell grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16'>
            <div className='max-w-sm'>
              <p className='eyebrow'>Questions</p>
              <h2 className='mt-3 font-display text-[38px] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[46px]'>
                The things people ask first.
              </h2>
              <p className='mt-4 text-[14px] leading-[1.7] text-ink-soft'>
                If something here is unclear, the answer is probably that the tool does less
                than you expect. It is a resume builder, and it tries to do that well.
              </p>
            </div>

            <div className='grid gap-x-10 sm:grid-cols-2 lg:grid-cols-1'>
              {questions.map((item) => (
                <details
                  key={item.q}
                  className='group border-b border-line py-1 first:border-t first:border-line lg:first:border-t-0'
                >
                  <summary className='flex cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[13.5px] font-medium text-ink [&::-webkit-details-marker]:hidden'>
                    {item.q}
                    <span className='shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-45'>
                      <LuPlus className='h-4 w-4' />
                    </span>
                  </summary>
                  <p className='max-w-xl pb-4 pr-6 text-[12.5px] leading-[1.65] text-ink-soft'>
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
