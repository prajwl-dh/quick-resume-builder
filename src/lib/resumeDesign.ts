import type {
  ResumeFont,
  ResumeMargin,
  ResumePaper,
  ResumeTemplate,
  ResumeTheme,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';

export interface TemplateMeta {
  id: ResumeTemplate;
  name: string;
  note: string;
  layout: 'classic' | 'modern' | 'editorial' | 'technical' | 'band' | 'split';
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'ivory', name: 'Ivory', note: 'Centred masthead, quiet serif rules', layout: 'classic' },
  { id: 'meridian', name: 'Meridian', note: 'Left-aligned, one strong accent rule', layout: 'modern' },
  { id: 'folio', name: 'Folio', note: 'Large name, editorial spacing', layout: 'editorial' },
  { id: 'onyx', name: 'Onyx', note: 'Dark header band, crisp body', layout: 'band' },
  { id: 'ledger', name: 'Ledger', note: 'Compact and close-set for long careers', layout: 'classic' },
  { id: 'mono', name: 'Mono', note: 'Technical labels, mono details', layout: 'technical' },
  { id: 'linea', name: 'Linea', note: 'A timeline for your work', layout: 'modern' },
  { id: 'swiss', name: 'Swiss', note: 'Numbered sections, hard grid', layout: 'modern' },
  { id: 'gazette', name: 'Gazette', note: 'Newspaper masthead and double rules', layout: 'editorial' },
  { id: 'studio', name: 'Studio', note: 'A solid block of colour up top', layout: 'band' },
  { id: 'atlas', name: 'Atlas', note: 'Split header with a tinted identity panel', layout: 'split' },
  { id: 'column', name: 'Column', note: 'Contact stacked beside the name', layout: 'split' },
];

export const TEMPLATE_MAP: Record<ResumeTemplate, TemplateMeta> = TEMPLATES.reduce(
  (map, template) => ({ ...map, [template.id]: template }),
  {} as Record<ResumeTemplate, TemplateMeta>
);

export const TEMPLATE_IDS = TEMPLATES.map((template) => template.id);

export interface FontMeta {
  id: ResumeFont;
  name: string;
  family: string;
  group: 'Sans' | 'Serif' | 'Mono';
}

export const FONTS: FontMeta[] = [
  { id: 'inter', name: 'Inter', family: 'var(--font-ui), Arial, sans-serif', group: 'Sans' },
  { id: 'manrope', name: 'Manrope', family: 'var(--font-manrope), Arial, sans-serif', group: 'Sans' },
  { id: 'work', name: 'Work Sans', family: 'var(--font-work), Arial, sans-serif', group: 'Sans' },
  { id: 'space', name: 'Space Grotesk', family: 'var(--font-space), Arial, sans-serif', group: 'Sans' },
  { id: 'plex', name: 'IBM Plex Sans', family: 'var(--font-plex), Arial, sans-serif', group: 'Sans' },
  { id: 'franklin', name: 'Libre Franklin', family: 'var(--font-franklin), Arial, sans-serif', group: 'Sans' },
  { id: 'source', name: 'Source Serif', family: 'var(--font-source), Georgia, serif', group: 'Serif' },
  { id: 'lora', name: 'Lora', family: 'var(--font-lora), Georgia, serif', group: 'Serif' },
  { id: 'garamond', name: 'EB Garamond', family: 'var(--font-garamond), Georgia, serif', group: 'Serif' },
  { id: 'playfair', name: 'Playfair Display', family: 'var(--font-playfair), Georgia, serif', group: 'Serif' },
  { id: 'instrument', name: 'Instrument Serif', family: 'var(--font-display), Georgia, serif', group: 'Serif' },
  { id: 'plex-mono', name: 'IBM Plex Mono', family: 'var(--font-plex-mono), ui-monospace, monospace', group: 'Mono' },
];

export const FONT_MAP: Record<ResumeFont, FontMeta> = FONTS.reduce(
  (map, font) => ({ ...map, [font.id]: font }),
  {} as Record<ResumeFont, FontMeta>
);

export const FONT_IDS = FONTS.map((font) => font.id);

export interface ColorOption {
  name: string;
  value: string;
}

export const COLOR_GROUPS: { name: string; colors: ColorOption[] }[] = [
  {
    name: 'Ink',
    colors: [
      { name: 'Graphite', value: '#1B1A17' },
      { name: 'Espresso', value: '#332E28' },
      { name: 'Stone', value: '#57524A' },
      { name: 'Slate', value: '#36414A' },
    ],
  },
  {
    name: 'Green',
    colors: [
      { name: 'Evergreen', value: '#1E5B49' },
      { name: 'Fern', value: '#356B40' },
      { name: 'Pine', value: '#23523C' },
      { name: 'Moss', value: '#4B6138' },
    ],
  },
  {
    name: 'Blue',
    colors: [
      { name: 'Harbor', value: '#1F4E72' },
      { name: 'Cobalt', value: '#284C88' },
      { name: 'Lagoon', value: '#135C6E' },
      { name: 'Petrol', value: '#1C4A55' },
    ],
  },
  {
    name: 'Warm',
    colors: [
      { name: 'Brick', value: '#8C332B' },
      { name: 'Rust', value: '#A0442D' },
      { name: 'Amber', value: '#96611F' },
      { name: 'Copper', value: '#8A5A33' },
      { name: 'Walnut', value: '#6B5542' },
      { name: 'Ochre', value: '#8B711F' },
      { name: 'Rosewood', value: '#793537' },
      { name: 'Taupe', value: '#5E574C' },
    ],
  },
  {
    name: 'Deep',
    colors: [
      { name: 'Black', value: '#111111' },
      { name: 'Navy', value: '#1D3557' },
      { name: 'Indigo Ink', value: '#2C3E66' },
      { name: 'Ocean', value: '#0F5B78' },
      { name: 'Bottle', value: '#17453A' },
      { name: 'Burgundy', value: '#5E2630' },
      { name: 'Charcoal', value: '#2C2B28' },
      { name: 'Plum Ink', value: '#4A343C' },
    ],
  },
];

export const COLORS: ColorOption[] = COLOR_GROUPS.flatMap((group) => group.colors);

export const FALLBACK_COLOR = '#1E5B49';

export const DEFAULT_THEME: Required<Omit<ResumeTheme, 'onePage'>> & { onePage: boolean } = {
  template: 'ivory',
  color: FALLBACK_COLOR,
  font: 'inter',
  onePage: false,
  scale: 1,
  leading: 1.45,
  spacing: 1,
  margin: 'normal',
  paper: 'a4',
};

export const PAPER_SIZES: Record<ResumePaper, { label: string; width: number; height: number; css: string }> = {
  a4: { label: 'A4', width: 210, height: 297, css: 'A4' },
  letter: { label: 'US Letter', width: 215.9, height: 279.4, css: 'letter' },
};

export const MARGIN_SIZES: Record<ResumeMargin, { label: string; mm: number }> = {
  narrow: { label: 'Narrow', mm: 11 },
  normal: { label: 'Standard', mm: 15 },
  wide: { label: 'Wide', mm: 19 },
};

export const SECTION_LABELS: Record<SectionKey, string> = {
  profile: 'Profile',
  skills: 'Skills',
  experience: 'Experience',
  education: 'Education',
  projects: 'Projects',
  certifications: 'Certifications',
  awards: 'Awards',
  references: 'References',
  languages: 'Languages',
};

export const SECTION_HINTS: Record<SectionKey, string> = {
  profile: 'The name, role and contact details at the top of the page.',
  skills: 'Group what you know. Keep each group short enough to scan.',
  experience: 'Most recent first. Lead each line with what you changed.',
  education: 'Your degree, school and the years you were there.',
  projects: 'Work you can point to, even if nobody paid for it.',
  certifications: 'Licences and certificates that still apply.',
  awards: 'Recognition that says something about the work.',
  references: 'Only add them when an employer asks, or when they are strong.',
  languages: 'What you speak and how well.',
};

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  'profile',
  'skills',
  'experience',
  'education',
  'projects',
  'certifications',
  'awards',
  'references',
  'languages',
];

export function isHexColor(value?: string): boolean {
  return Boolean(value && /^#[0-9a-f]{6}$/i.test(value));
}

export function themeVars(theme?: ResumeTheme): React.CSSProperties {
  const safe = { ...DEFAULT_THEME, ...(theme ?? {}) };
  const font = FONT_MAP[safe.font] ?? FONT_MAP.inter;
  const margin = MARGIN_SIZES[safe.margin] ?? MARGIN_SIZES.normal;
  return {
    '--r-accent': isHexColor(safe.color) ? safe.color : FALLBACK_COLOR,
    '--r-font': font.family,
    '--r-scale': String(safe.scale),
    '--r-leading': String(safe.leading),
    '--r-gap': String(safe.spacing),
    '--r-pad': `${margin.mm}mm`,
  } as React.CSSProperties;
}
