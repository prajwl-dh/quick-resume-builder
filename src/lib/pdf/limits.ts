/**
 * The smallest type scale used to squeeze a resume onto one page.
 * At 6pt text a resume stops being readable, so 75% of the chosen size
 * (about 7.6pt at the default) is the floor. Longer resumes stay multi-page
 * and the download dialog says so.
 */
export const MIN_ONE_PAGE_SCALE = 0.75;
