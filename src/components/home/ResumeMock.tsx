/** A quiet, paper-like preview of what the editor produces. */
export default function ResumeMock() {
  return (
    <div className='relative w-full'>
      <div className='overflow-hidden rounded-xl border border-light-ring-secondary bg-white shadow-paper-lg dark:border-dark-ring-secondary'>
        <div className='mx-auto max-w-[480px] px-7 py-9 text-[#1B1D20] sm:px-9 sm:py-11'>
          <div className='font-display text-[30px] leading-none tracking-[-0.02em]'>
            Alex Morgan
          </div>
          <div className='mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1E6B54]'>
            Senior Frontend Engineer
          </div>
          <div className='mt-2.5 text-[11px] leading-relaxed text-[#6B7079]'>
            alex.morgan@example.com &nbsp;·&nbsp; Austin, TX &nbsp;·&nbsp;
            alexmorgan.dev
          </div>

          <div className='my-5 h-px bg-[#E4E2DB]' />

          <MockSection label='Profile'>
            <p className='text-[11.5px] leading-[1.6] text-[#42474E]'>
              Frontend engineer with eight years of experience building
              accessible, fast web applications. Care about design systems,
              developer experience and mentoring growing teams.
            </p>
          </MockSection>

          <MockSection label='Experience'>
            <div className='flex items-baseline justify-between gap-3'>
              <span className='text-[12px] font-semibold'>Northstar Labs</span>
              <span className='shrink-0 text-[11px] text-[#6B7079]'>
                2021 — Present
              </span>
            </div>
            <div className='mb-1 text-[11px] italic text-[#1E6B54]'>
              Senior Frontend Engineer
            </div>
            <ul className='space-y-0.5 text-[11.5px] leading-[1.6] text-[#42474E]'>
              <li>• Rebuilt the customer dashboard, making it faster to load.</li>
              <li>• Introduced a component library used across six teams.</li>
              <li>• Mentored two developers through pairing and code review.</li>
            </ul>
            <div className='mt-3 flex items-baseline justify-between gap-3'>
              <span className='text-[12px] font-semibold'>Pixel &amp; Code</span>
              <span className='shrink-0 text-[11px] text-[#6B7079]'>
                2018 — 2020
              </span>
            </div>
            <div className='mb-1 text-[11px] italic text-[#1E6B54]'>
              Frontend Developer
            </div>
            <p className='text-[11.5px] leading-[1.6] text-[#42474E]'>
              • Built responsive storefronts for clients across retail and
              hospitality.
            </p>
          </MockSection>

          <MockSection label='Skills'>
            <p className='text-[11.5px] leading-[1.7] text-[#42474E]'>
              <span className='font-semibold'>Technical</span> &nbsp; TypeScript,
              React, Next.js, Node.js, GraphQL, Tailwind CSS
              <br />
              <span className='font-semibold'>Practice</span> &nbsp; Design
              systems, accessibility, mentoring, code review
            </p>
          </MockSection>

          <MockSection label='Education' last>
            <div className='flex items-baseline justify-between gap-3'>
              <span className='text-[12px] font-semibold'>
                University of Texas at Austin
              </span>
              <span className='shrink-0 text-[11px] text-[#6B7079]'>2018</span>
            </div>
            <p className='text-[11px] text-[#42474E]'>B.S. Computer Science</p>
          </MockSection>
        </div>
      </div>
      <p className='mt-4 text-center text-xs text-light-text-secondary dark:text-dark-text-secondary'>
        The page you see is the PDF you get.
      </p>
    </div>
  );
}

function MockSection({
  label,
  children,
  last = false,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? '' : 'mb-5'}>
      <div className='mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1B1D20]'>
        {label}
      </div>
      <div className='mb-2 h-px bg-[#E4E2DB]' />
      {children}
    </div>
  );
}
