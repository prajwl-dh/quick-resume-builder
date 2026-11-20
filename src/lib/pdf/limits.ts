/**
 * The smallest type scale used to squeeze a resume onto one page.
 * Below roughly 7.5pt text stops being comfortable to read and ATS parsers
 * start losing characters, so 80% of the chosen size is the floor. Longer
 * resumes stay multi-page and the download dialog says so.
 */
export const MIN_ONE_PAGE_SCALE = 0.8;
