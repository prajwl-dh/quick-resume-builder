/**
 * The smallest type scale used to squeeze a resume onto one page.
 * 70% of the chosen size (about 6.6pt at the default) is the last resort for
 * dense resumes; the exporter always prefers the largest scale that fits, so
 * typical resumes stay much closer to their chosen size. Only resumes that
 * genuinely cannot fit at this floor stay multi-page, and the dialog says so.
 */
export const MIN_ONE_PAGE_SCALE = 0.7;
