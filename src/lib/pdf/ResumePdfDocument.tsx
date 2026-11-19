import type {
  ResumeInterface,
  ResumeTemplate,
  SectionKey,
} from '@/components/builder/previousResumes/ResumeInterface';
import {
  formatDateRange,
  normalizeResume,
  normalizeTheme,
  sectionHasContent,
  splitBullets,
} from '@/lib/resumeDefaults';
import {
  FALLBACK_COLOR,
  MARGIN_SIZES,
  PAPER_SIZES,
  SECTION_LABELS,
  isHexColor,
} from '@/lib/resumeDesign';
import { Document, Link, Page, Text, View } from '@react-pdf/renderer';
import type { ReactNode } from 'react';
import { PDF_MONO_FONT, pdfFont, registerPdfFonts } from './fonts';

const INK = '#1b1a17';
const MUTED = '#514d45';
const FAINT = '#7d7668';
const RULE = '#ded8ca';
const PAPER = '#fffdf9';
const DARK_BAND = '#171614';
const WHITE = '#ffffff';

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

/** Mix two hex colours; `amount` is the share of the first colour. */
function mix(from: string, to: string, amount: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  const channel = (x: number, y: number) =>
    Math.round(x * amount + y * (1 - amount))
      .toString(16)
      .padStart(2, '0');
  return `#${channel(a.r, b.r)}${channel(a.g, b.g)}${channel(a.b, b.b)}`;
}

function hrefFor(value?: string): string {
  if (!value) return '';
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(value)) return value;
  return `https://${value}`;
}

/** True for values a reader would expect to click. */
function isLinkLike(value: string): boolean {
  return /^(https?:\/\/|mailto:|tel:|\/)/i.test(value) || /^[\w-]+(\.[\w-]+)+(\/|$|\?)/.test(value);
}

interface Contact {
  label: string;
  value: string;
  href?: string;
}

interface Ctx {
  template: ResumeTemplate;
  type: number;
  spacing: number;
  leading: number;
  accent: string;
  bodyFont: string;
  monoFont: string;
  entryTitleAccent: boolean;
}

const em = (ctx: Ctx, value: number) => ctx.type * value;

function contactList(resume: ResumeInterface): Contact[] {
  const profile = resume.profile ?? {};
  const items: (Contact | null)[] = [
    profile.email
      ? { label: 'Email', value: profile.email, href: `mailto:${profile.email}` }
      : null,
    profile.phone
      ? {
          label: 'Phone',
          value: profile.phone,
          href: `tel:${profile.phone.replace(/\s+/g, '')}`,
        }
      : null,
    profile.location ? { label: 'Location', value: profile.location } : null,
    profile.website
      ? { label: 'Site', value: profile.website, href: hrefFor(profile.website) }
      : null,
    profile.linkedIn
      ? { label: 'LinkedIn', value: profile.linkedIn, href: hrefFor(profile.linkedIn) }
      : null,
    profile.gitHub
      ? { label: 'GitHub', value: profile.gitHub, href: hrefFor(profile.gitHub) }
      : null,
    ...(profile.profileCustomField ?? []).map((field) => {
      const value = field.fieldValue?.trim();
      if (!value) return null;
      return {
        label: field.fieldName || 'Link',
        value,
        href: isLinkLike(value) ? hrefFor(value) : undefined,
      };
    }),
  ];
  return items.filter(Boolean) as Contact[];
}

function ContactValue({ contact, color }: { contact: Contact; color?: string }) {
  if (!contact.href) {
    return <Text style={{ color: color ?? 'inherit' }}>{contact.value}</Text>;
  }
  return (
    <Link
      src={contact.href}
      style={{ color: color ?? 'inherit', textDecoration: 'none' }}
    >
      {contact.value}
    </Link>
  );
}

function ContactRow({
  ctx,
  contacts,
  color,
  labels = false,
  stacked = false,
  align = 'flex-start',
  size = 0.84,
  marginTop = 0.7,
}: {
  ctx: Ctx;
  contacts: Contact[];
  color?: string;
  labels?: boolean;
  stacked?: boolean;
  align?: 'flex-start' | 'flex-end' | 'center';
  size?: number;
  marginTop?: number;
}) {
  if (!contacts.length) return null;
  return (
    <View
      style={{
        flexDirection: stacked ? 'column' : 'row',
        flexWrap: stacked ? undefined : 'wrap',
        alignItems: align === 'center' ? 'center' : undefined,
        justifyContent:
          align === 'flex-end'
            ? 'flex-end'
            : align === 'center'
              ? 'center'
              : 'flex-start',
        marginTop: em(ctx, marginTop),
      }}
    >
      {contacts.map((contact, index) => (
        <View
          key={`${contact.label}-${index}`}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: stacked ? 0 : em(ctx, 0.85),
            marginBottom: stacked ? em(ctx, 0.16) : 0,
            maxWidth: '100%',
          }}
        >
          {labels ? (
            <Text
              style={{
                fontFamily: ctx.monoFont,
                fontSize: em(ctx, size * 0.84),
                letterSpacing: 0,
                textTransform: 'uppercase',
                color: color ?? FAINT,
                marginRight: em(ctx, 0.35),
              }}
            >
              {`${contact.label}:`}
            </Text>
          ) : null}
          <Text
            style={{
              fontSize: em(ctx, size),
              color: color ?? MUTED,
              lineHeight: 1.3,
            }}
          >
            <ContactValue contact={contact} color={color ?? MUTED} />
          </Text>
        </View>
      ))}
    </View>
  );
}

function Header({ resume, ctx }: { resume: ResumeInterface; ctx: Ctx }) {
  const profile = resume.profile ?? {};
  const name = profile.fullName?.trim() || 'Your name';
  const role = profile.intro?.trim();
  const contacts = contactList(resume);
  const t = ctx.template;

  const nameStyle = (size: number, weight: number, extra: Record<string, unknown> = {}) => ({
    fontFamily: ctx.bodyFont,
    fontSize: em(ctx, size),
    fontWeight: weight,
    lineHeight: 1.02,
    letterSpacing: 0,
    ...extra,
  });

  const roleStyle = (extra: Record<string, unknown> = {}) => ({
    fontFamily: ctx.bodyFont,
    fontSize: em(ctx, 1),
    color: ctx.accent,
    marginTop: em(ctx, 0.32),
    ...extra,
  });

  if (t === 'ivory') {
    return (
      <View
        style={{
          alignItems: 'center',
          paddingBottom: em(ctx, 1.15),
          borderBottomWidth: 1,
          borderBottomColor: RULE,
        }}
      >
        <Text
          style={nameStyle(2.7, 600, {
            letterSpacing: 0,
            textAlign: 'center',
          })}
        >
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.9),
              letterSpacing: 0,
              textTransform: 'uppercase',
              color: ctx.accent,
              marginTop: em(ctx, 0.4),
              textAlign: 'center',
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} align='center' marginTop={0.75} />
      </View>
    );
  }

  if (t === 'meridian') {
    return (
      <View
        style={{
          borderLeftWidth: 3,
          borderLeftColor: ctx.accent,
          paddingLeft: em(ctx, 1),
        }}
      >
        <Text style={nameStyle(2.65, 700, { letterSpacing: 0 })}>
          {name}
        </Text>
        {role ? <Text style={roleStyle({ fontWeight: 400 })}>{role}</Text> : null}
        <ContactRow ctx={ctx} contacts={contacts} marginTop={0.55} />
      </View>
    );
  }

  if (t === 'folio') {
    return (
      <View
        style={{
          paddingBottom: em(ctx, 1),
          borderBottomWidth: 2,
          borderBottomColor: INK,
        }}
      >
        <Text
          style={nameStyle(3.3, 600, {
            lineHeight: 0.94,
            letterSpacing: 0,
          })}
        >
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.92),
              letterSpacing: 0,
              textTransform: 'uppercase',
              color: ctx.accent,
              marginTop: em(ctx, 0.55),
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} marginTop={0.95} size={0.81} />
      </View>
    );
  }

  if (t === 'onyx') {
    return (
      <View
        style={{
          backgroundColor: DARK_BAND,
          borderRadius: 3,
          paddingHorizontal: em(ctx, 1.25),
          paddingVertical: em(ctx, 1.05),
        }}
      >
        <Text style={nameStyle(2.7, 700, { color: WHITE })}>{name}</Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.95),
              color: '#c9c6c0',
              marginTop: em(ctx, 0.32),
              letterSpacing: 0,
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} color='#c9c6c0' marginTop={0.65} />
      </View>
    );
  }

  if (t === 'ledger') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingBottom: em(ctx, 0.75),
          borderBottomWidth: 1,
          borderBottomColor: INK,
        }}
      >
        <View style={{ flex: 1, paddingRight: em(ctx, 1) }}>
          <Text
            style={nameStyle(1.78, 700, {
              letterSpacing: 0,
              textTransform: 'uppercase',
            })}
          >
            {name}
          </Text>
          {role ? (
            <Text
              style={{
                fontSize: em(ctx, 0.88),
                letterSpacing: 0,
                textTransform: 'uppercase',
                color: MUTED,
                marginTop: em(ctx, 0.2 * ctx.spacing),
              }}
            >
              {role}
            </Text>
          ) : null}
        </View>
        <View style={{ width: em(ctx, 15) }}>
          <ContactRow
            ctx={ctx}
            contacts={contacts}
            stacked
            align='flex-end'
            size={0.77}
            marginTop={0}
          />
        </View>
      </View>
    );
  }

  if (t === 'mono') {
    return (
      <View>
        <Text style={nameStyle(2.55, 600, { letterSpacing: 0 })}>
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontFamily: ctx.monoFont,
              fontSize: em(ctx, 0.88),
              letterSpacing: 0,
              color: MUTED,
              marginTop: em(ctx, 0.35),
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} labels size={0.76} marginTop={0.7} />
      </View>
    );
  }

  if (t === 'linea') {
    return (
      <View>
        <Text style={nameStyle(2.9, 700, { letterSpacing: 0 })}>
          {name}
        </Text>
        {role ? <Text style={roleStyle({ fontSize: em(ctx, 1.02) })}>{role}</Text> : null}
        <ContactRow ctx={ctx} contacts={contacts} marginTop={0.7} />
      </View>
    );
  }

  if (t === 'swiss') {
    return (
      <View
        style={{
          borderTopWidth: 5,
          borderTopColor: INK,
          paddingTop: em(ctx, 0.65),
        }}
      >
        <Text
          style={nameStyle(2.95, 700, {
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: 0,
          })}
        >
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.92),
              color: MUTED,
              marginTop: em(ctx, 0.55),
              letterSpacing: 0,
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} marginTop={0.9} />
      </View>
    );
  }

  if (t === 'gazette') {
    return (
      <View
        style={{
          alignItems: 'center',
          borderTopWidth: 1,
          borderTopColor: INK,
          paddingTop: em(ctx, 0.45),
          paddingBottom: em(ctx, 0.8),
        }}
      >
        <Text
          style={nameStyle(3.1, 600, {
            textTransform: 'uppercase',
            letterSpacing: 0,
            lineHeight: 1,
            textAlign: 'center',
          })}
        >
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.78),
              letterSpacing: 0,
              textTransform: 'uppercase',
              color: MUTED,
              marginTop: em(ctx, 0.55),
              textAlign: 'center',
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} align='center' size={0.77} marginTop={0.8} />
        <View style={{ width: '100%', marginTop: em(ctx, 0.65) }}>
          <View style={{ height: 1, backgroundColor: INK, marginBottom: em(ctx, 0.1) }} />
          <View style={{ height: 3, backgroundColor: INK }} />
        </View>
      </View>
    );
  }

  if (t === 'studio') {
    return (
      <View
        style={{
          backgroundColor: ctx.accent,
          borderRadius: 4,
          paddingHorizontal: em(ctx, 1.45),
          paddingVertical: em(ctx, 1.4),
        }}
      >
        <Text style={nameStyle(2.85, 700, { color: WHITE, letterSpacing: 0 })}>
          {name}
        </Text>
        {role ? (
          <Text
            style={{
              fontSize: em(ctx, 0.98),
              color: '#f4f1e9',
              marginTop: em(ctx, 0.32),
            }}
          >
            {role}
          </Text>
        ) : null}
        <ContactRow ctx={ctx} contacts={contacts} color='#f4f1e9' marginTop={0.85} />
      </View>
    );
  }

  if (t === 'atlas') {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 4,
          overflow: 'hidden',
          alignItems: 'stretch',
        }}
      >
        <View
          style={{
            width: '54%',
            backgroundColor: ctx.accent,
            padding: em(ctx, 1.05),
          }}
        >
          <Text style={nameStyle(2.35, 700, { color: WHITE, letterSpacing: 0 })}>
            {name}
          </Text>
          {role ? (
            <Text
              style={{
                fontSize: em(ctx, 0.94),
                color: '#f4f1e9',
                marginTop: em(ctx, 0.34),
              }}
            >
              {role}
            </Text>
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: mix(ctx.accent, PAPER, 0.09),
            paddingHorizontal: em(ctx, 1.15),
            paddingVertical: em(ctx, 0.85),
            justifyContent: 'center',
          }}
        >
          <ContactRow ctx={ctx} contacts={contacts} labels stacked size={0.8} marginTop={0} />
        </View>
      </View>
    );
  }

  // column
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: em(ctx, 1),
        borderBottomWidth: 1,
        borderBottomColor: RULE,
      }}
    >
      <View style={{ flex: 1, paddingRight: em(ctx, 1.5) }}>
        <Text style={nameStyle(2.85, 700, { letterSpacing: 0 })}>
          {name}
        </Text>
        {role ? <Text style={roleStyle({ fontSize: em(ctx, 1) })}>{role}</Text> : null}
      </View>
      <View style={{ width: em(ctx, 15), alignItems: 'flex-end' }}>
        <ContactRow
          ctx={ctx}
          contacts={contacts}
          labels
          stacked
          align='flex-end'
          size={0.79}
          marginTop={0}
        />
      </View>
    </View>
  );
}

function SectionHeading({
  section,
  ctx,
}: {
  section: SectionKey;
  ctx: Ctx;
}) {
  const label = section === 'profile' ? 'Summary' : SECTION_LABELS[section];
  const base = {
    fontFamily: ctx.bodyFont,
    fontSize: em(ctx, 0.8),
    fontWeight: 700,
    letterSpacing: 0,
    textTransform: 'uppercase' as const,
    lineHeight: 1.2,
  };
  const t = ctx.template;

  const wrap = (children: ReactNode, extra: Record<string, unknown> = {}) => (
    <View
      wrap={false}
      minPresenceAhead={em(ctx, 4)}
      style={{ marginBottom: em(ctx, 0.38 * ctx.spacing), ...extra }}
    >
      {children}
    </View>
  );

  if (t === 'ivory') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: em(ctx, 1.4), height: 0.7, backgroundColor: RULE }} />
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.76), letterSpacing: 0, marginHorizontal: em(ctx, 0.55) }}>
          {label}
        </Text>
        <View style={{ width: em(ctx, 1.4), height: 0.7, backgroundColor: RULE }} />
      </View>
    );
  }

  if (t === 'meridian') {
    return wrap(
      <Text
        style={{
          ...base,
          color: ctx.accent,
          letterSpacing: 0,
          paddingBottom: em(ctx, 0.32),
          borderBottomWidth: 1,
          borderBottomColor: mix(ctx.accent, PAPER, 0.32),
        }}
      >
        {label}
      </Text>
    );
  }

  if (t === 'folio') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: em(ctx, 0.5),
            height: em(ctx, 0.5),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.5),
          }}
        />
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.72), letterSpacing: 0 }}>
          {label}
        </Text>
      </View>
    );
  }

  if (t === 'onyx') {
    return wrap(
      <Text
        style={{
          ...base,
          color: ctx.accent,
          letterSpacing: 0,
          paddingBottom: em(ctx, 0.16),
          borderBottomWidth: 1.5,
          borderBottomColor: ctx.accent,
        }}
      >
        {label}
      </Text>
    );
  }

  if (t === 'ledger') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.74), letterSpacing: 0 }}>
          {label}
        </Text>
        <View
          style={{
            flex: 1,
            height: 0.7,
            backgroundColor: RULE,
            marginLeft: em(ctx, 0.6),
          }}
        />
      </View>
    );
  }

  if (t === 'mono') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: em(ctx, 0.4),
            height: em(ctx, 0.4),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.45),
          }}
        />
        <Text
          style={{
            ...base,
            fontFamily: ctx.monoFont,
            color: INK,
            fontSize: em(ctx, 0.76),
            letterSpacing: 0,
          }}
        >
          {label}
        </Text>
      </View>,
      { paddingTop: em(ctx, 0.5), borderTopWidth: 1, borderTopColor: RULE }
    );
  }

  if (t === 'linea') {
    return wrap(
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: em(ctx, 0.4),
          borderBottomWidth: 1,
          borderBottomColor: RULE,
        }}
      >
        <View
          style={{
            width: em(ctx, 0.46),
            height: em(ctx, 0.46),
            borderRadius: em(ctx, 0.23),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.5),
          }}
        />
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.78) }}>{label}</Text>
      </View>
    );
  }

  if (t === 'swiss') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: em(ctx, 0.38),
            height: em(ctx, 0.38),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.55),
          }}
        />
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.71), letterSpacing: 0 }}>
          {label}
        </Text>
      </View>,
      { paddingTop: em(ctx, 0.55), borderTopWidth: 1, borderTopColor: INK }
    );
  }

  if (t === 'gazette') {
    return wrap(
      <Text
        style={{
          ...base,
          color: INK,
          fontSize: em(ctx, 0.74),
          letterSpacing: 0,
          paddingBottom: em(ctx, 0.24),
          borderBottomWidth: 1,
          borderBottomColor: RULE,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
    );
  }

  if (t === 'studio') {
    return wrap(
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: em(ctx, 0.5),
            height: em(ctx, 0.5),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.5),
          }}
        />
        <Text style={{ ...base, color: ctx.accent, fontSize: em(ctx, 0.78), letterSpacing: 0 }}>
          {label}
        </Text>
      </View>
    );
  }

  if (t === 'atlas') {
    return wrap(
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: em(ctx, 0.1),
          borderBottomWidth: 1,
          borderBottomColor: RULE,
        }}
      >
        <View
          style={{
            width: em(ctx, 0.48),
            height: em(ctx, 0.48),
            backgroundColor: ctx.accent,
            marginRight: em(ctx, 0.5),
          }}
        />
        <Text style={{ ...base, color: INK, fontSize: em(ctx, 0.8) }}>{label}</Text>
      </View>
    );
  }

  // column
  return wrap(
    <Text
      style={{
        ...base,
        color: INK,
        fontSize: em(ctx, 0.79),
        borderLeftWidth: 2,
        borderLeftColor: ctx.accent,
        paddingLeft: em(ctx, 0.55),
      }}
    >
      {label}
    </Text>
  );
}

function Bullets({ text, ctx }: { text?: string; ctx: Ctx }) {
  const lines = splitBullets(text);
  if (!lines.length) return null;
  return (
    <View style={{ marginTop: em(ctx, 0.26 * ctx.spacing) }}>
      {lines.map((line, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: index === 0 ? 0 : em(ctx, 0.11 * ctx.spacing),
          }}
        >
          <View
            style={{
              width: em(ctx, 0.28),
              height: em(ctx, 0.28),
              borderRadius: em(ctx, 0.14),
              backgroundColor: ctx.accent,
              opacity: 0.78,
              marginTop: em(ctx, 0.52),
              marginRight: em(ctx, 0.55),
            }}
          />
          <Text
            style={{
              flex: 1,
              fontFamily: ctx.bodyFont,
              fontSize: em(ctx, 0.96),
              color: MUTED,
              lineHeight: ctx.leading,
              textAlign: ctx.template === 'gazette' ? 'justify' : 'left',
            }}
          >
            {line}
          </Text>
        </View>
      ))}
    </View>
  );
}

function EntryTop({
  left,
  right,
}: {
  left: ReactNode;
  right?: ReactNode;
}) {
  return (
    <View
      wrap={false}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          paddingRight: 10,
        }}
      >
        {left}
      </View>
      {right ?? null}
    </View>
  );
}

function SectionBody({
  section,
  resume,
  ctx,
  number,
}: {
  section: SectionKey;
  resume: ResumeInterface;
  ctx: Ctx;
  number: number;
}) {
  const entryGap = em(ctx, 0.48 * ctx.spacing);

  const title = (text?: string, accent = false) =>
    text?.trim() ? (
      <Text
        style={{
          fontFamily: ctx.bodyFont,
          fontSize: em(ctx, 1.02),
          fontWeight: 700,
          color: accent && ctx.entryTitleAccent ? ctx.accent : INK,
          lineHeight: 1.25,
          marginRight: em(ctx, 0.45),
        }}
      >
        {text}
      </Text>
    ) : null;

  const role = (text?: string) =>
    text?.trim() ? (
      <Text
        style={{
          fontFamily: ctx.bodyFont,
          fontSize: em(ctx, 0.97),
          color: MUTED,
          lineHeight: 1.3,
          marginRight: em(ctx, 0.45),
        }}
      >
        {text}
      </Text>
    ) : null;

  const meta = (text?: string) =>
    text?.trim() ? (
      <Text
        style={{
          fontFamily: ctx.bodyFont,
          fontSize: em(ctx, 0.82),
          color: FAINT,
          marginRight: em(ctx, 0.45),
        }}
      >
        {text}
      </Text>
    ) : null;

  const slash = (
    <Text style={{ fontSize: em(ctx, 0.9), color: FAINT, marginRight: em(ctx, 0.45) }}>
      /
    </Text>
  );

  const date = (text?: string) =>
    text?.trim() ? (
      <Text
        style={{
          fontFamily: ctx.template === 'mono' ? ctx.monoFont : ctx.bodyFont,
          fontSize: em(ctx, 0.83),
          color: MUTED,
          flexShrink: 0,
        }}
      >
        {text}
      </Text>
    ) : null;

  const emailLink = (text?: string) =>
    text?.trim() ? (
      <Link
        src={text.includes('@') ? `mailto:${text}` : hrefFor(text)}
        style={{
          fontFamily: ctx.template === 'mono' ? ctx.monoFont : ctx.bodyFont,
          fontSize: em(ctx, 0.83),
          color: MUTED,
          flexShrink: 0,
          textDecoration: 'none',
        }}
      >
        {text}
      </Link>
    ) : null;

  const note = (text?: string) =>
    text?.trim() ? (
      <Text
        style={{
          fontFamily: ctx.bodyFont,
          fontSize: em(ctx, 0.95),
          color: MUTED,
          lineHeight: ctx.leading,
          marginTop: em(ctx, 0.2 * ctx.spacing),
        }}
      >
        {text}
      </Text>
    ) : null;

  const sectionWrap = (children: ReactNode) => (
    <View style={{ marginTop: number === 1 ? 0 : em(ctx, 0.8 * ctx.spacing) }}>
      <SectionHeading section={section} ctx={ctx} />
      {children}
    </View>
  );

  if (section === 'skills') {
    const groups = (resume.skillGroups ?? []).filter(
      (group) => group.skills.filter((skill) => skill.trim()).length > 0
    );
    if (!groups.length) return null;
    const pills = ['meridian', 'onyx', 'atlas', 'studio', 'swiss'].includes(ctx.template);
    return sectionWrap(
      <View>
        {groups.map((group, groupIndex) => (
          <View
            key={group.id}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: groupIndex === 0 ? 0 : em(ctx, 0.32 * ctx.spacing),
            }}
          >
            {group.name?.trim() ? (
              <Text
                style={{
                  width: em(ctx, 13.4),
                  paddingRight: em(ctx, 0.6),
                  flexShrink: 0,
                  fontFamily: ctx.bodyFont,
                  fontSize: em(ctx, 0.94),
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {group.name}
              </Text>
            ) : null}
            {pills ? (
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {group.skills
                  .filter((skill) => skill.trim())
                  .map((skill, index) => (
                    <View
                      key={`${skill}-${index}`}
                      style={{
                        backgroundColor:
                          ctx.template === 'onyx'
                            ? mix(ctx.accent, PAPER, 0.1)
                            : mix(ctx.accent, PAPER, 0.09),
                        borderRadius: 2,
                        paddingHorizontal: em(ctx, 0.42),
                        paddingVertical: em(ctx, 0.06),
                        marginRight: em(ctx, 0.3),
                        marginBottom: em(ctx, 0.25),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily:
                            ctx.template === 'mono' ? ctx.monoFont : ctx.bodyFont,
                          fontSize: em(ctx, 0.86),
                          color: INK,
                        }}
                      >
                        {skill}
                      </Text>
                    </View>
                  ))}
              </View>
            ) : (
              <Text
                style={{
                  flex: 1,
                  fontFamily:
                    ctx.template === 'mono' ? ctx.monoFont : ctx.bodyFont,
                  fontSize: em(ctx, 0.92),
                  color: MUTED,
                  lineHeight: 1.4,
                }}
              >
                {group.skills
                  .filter((skill) => skill.trim())
                  .map((skill, index) => (
                    <Text key={`${skill}-${index}`}>
                      {index > 0 ? (
                        <Text style={{ color: FAINT }}>
                          {ctx.template === 'mono' ? '  /  ' : '  ·  '}
                        </Text>
                      ) : null}
                      {skill}
                    </Text>
                  ))}
              </Text>
            )}
          </View>
        ))}
      </View>
    );
  }

  if (section === 'experience') {
    const entries = (resume.experience ?? []).filter((entry) =>
      [entry.companyName, entry.jobTitle, entry.jobDescription].some((value) =>
        Boolean(value?.trim())
      )
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => {
          const when =
            formatDateRange(entry.jobDateRange) || entry.jobDate?.trim() || '';
          const content = (
            <>
              <EntryTop
                left={
                  <>
                    {title(entry.companyName, true)}
                    {entry.companyName && entry.jobTitle ? slash : null}
                    {role(entry.jobTitle)}
                    {meta(entry.jobLocation)}
                  </>
                }
                right={date(when)}
              />
              <Bullets text={entry.jobDescription} ctx={ctx} />
            </>
          );
          if (ctx.template !== 'linea') {
            return (
              <View key={index} style={{ marginTop: index === 0 ? 0 : entryGap }}>
                {content}
              </View>
            );
          }
          return (
            <View
              key={index}
              style={{
                marginTop: index === 0 ? 0 : entryGap,
                borderLeftWidth: 1,
                borderLeftColor: RULE,
                paddingLeft: em(ctx, 1.05),
                marginLeft: em(ctx, 0.7),
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: -em(ctx, 0.26),
                  top: em(ctx, 0.42),
                  width: em(ctx, 0.5),
                  height: em(ctx, 0.5),
                  borderRadius: em(ctx, 0.25),
                  backgroundColor: ctx.accent,
                }}
              />
              {content}
            </View>
          );
        })}
      </View>
    );
  }

  if (section === 'education') {
    const entries = (resume.education ?? []).filter((entry) =>
      [entry.schoolName, entry.schoolMajor, entry.schoolDescription].some((value) =>
        Boolean(value?.trim())
      )
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => {
          const when =
            formatDateRange(entry.schoolDateRange) || entry.schoolDate?.trim() || '';
          return (
            <View
              key={index}
              style={{
                marginTop: index === 0 ? 0 : entryGap,
                ...(ctx.template === 'linea'
                  ? {
                      borderLeftWidth: 1,
                      borderLeftColor: RULE,
                      paddingLeft: em(ctx, 1.05),
                      marginLeft: em(ctx, 0.7),
                    }
                  : {}),
              }}
            >
              <EntryTop
                left={
                  <>
                    {title(entry.schoolName, true)}
                    {entry.schoolName && entry.schoolMajor ? slash : null}
                    {role(entry.schoolMajor)}
                    {meta(entry.schoolGPA ? `GPA ${entry.schoolGPA}` : undefined)}
                  </>
                }
                right={date(when)}
              />
              <Bullets text={entry.schoolDescription} ctx={ctx} />
            </View>
          );
        })}
      </View>
    );
  }

  if (section === 'projects') {
    const entries = (resume.projects ?? []).filter((entry) =>
      [entry.projectName, entry.projectDescription].some((value) => Boolean(value?.trim()))
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => (
          <View key={index} style={{ marginTop: index === 0 ? 0 : entryGap }}>
            <EntryTop
              left={
                <>
                  {title(entry.projectName, true)}
                  {entry.projectLink?.trim() ? (
                    <Link
                      src={hrefFor(entry.projectLink)}
                      style={{
                        fontFamily: ctx.bodyFont,
                        fontSize: em(ctx, 0.84),
                        color: ctx.accent,
                        textDecoration: 'none',
                        marginRight: em(ctx, 0.45),
                      }}
                    >
                      {entry.projectLink}
                    </Link>
                  ) : null}
                </>
              }
            />
            <Bullets text={entry.projectDescription} ctx={ctx} />
          </View>
        ))}
      </View>
    );
  }

  if (section === 'certifications') {
    const entries = (resume.certifications ?? []).filter((entry) =>
      [entry.certificationName, entry.certificationDescription].some((value) =>
        Boolean(value?.trim())
      )
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => (
          <View key={index} style={{ marginTop: index === 0 ? 0 : entryGap }}>
            <EntryTop
              left={
                <>
                  {title(entry.certificationName, true)}
                  {role(entry.certificationIssuer)}
                </>
              }
              right={date(entry.certificationDate)}
            />
            {note(entry.certificationDescription)}
          </View>
        ))}
      </View>
    );
  }

  if (section === 'awards') {
    const entries = (resume.awards ?? []).filter((entry) =>
      [entry.awardName, entry.awardDescription].some((value) => Boolean(value?.trim()))
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => (
          <View key={index} style={{ marginTop: index === 0 ? 0 : entryGap }}>
            <EntryTop
              left={
                <>
                  {title(entry.awardName, true)}
                  {role(entry.awardIssuer)}
                </>
              }
              right={date(entry.awardDate)}
            />
            {note(entry.awardDescription)}
          </View>
        ))}
      </View>
    );
  }

  if (section === 'references') {
    const entries = (resume.references ?? []).filter((entry) =>
      [entry.referenceName, entry.referenceDescription].some((value) =>
        Boolean(value?.trim())
      )
    );
    if (!entries.length) return null;
    return sectionWrap(
      <View>
        {entries.map((entry, index) => {
          const affiliation = [entry.referenceRole, entry.referenceCompany]
            .filter(Boolean)
            .join(', ');
          return (
            <View key={index} style={{ marginTop: index === 0 ? 0 : entryGap }}>
              <EntryTop
                left={
                  <>
                    {title(entry.referenceName, true)}
                    {role(affiliation)}
                  </>
                }
                right={emailLink(entry.referenceEmail)}
              />
              {note(entry.referenceDescription)}
            </View>
          );
        })}
      </View>
    );
  }

  if (section === 'languages') {
    const items = (resume.languageItems ?? []).filter((item) => item.name?.trim());
    if (!items.length) return null;
    return sectionWrap(
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              marginRight: em(ctx, 1.6),
              marginTop: index === 0 ? 0 : em(ctx, 0.3),
            }}
          >
            <Text
              style={{
                fontFamily: ctx.bodyFont,
                fontSize: em(ctx, 0.94),
                fontWeight: 600,
                color: INK,
                marginRight: em(ctx, 0.4),
              }}
            >
              {item.name}
            </Text>
            {item.proficiency ? (
              <Text
                style={{
                  fontFamily: ctx.bodyFont,
                  fontSize: em(ctx, 0.94),
                  color: MUTED,
                }}
              >
                {item.proficiency}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    );
  }

  return null;
}

export default function ResumePdfDocument({
  resume,
  fit = 1,
}: {
  resume: ResumeInterface;
  fit?: number;
}) {
  registerPdfFonts();

  const data = normalizeResume(resume);
  const theme = normalizeTheme(data.theme);
  const paper = PAPER_SIZES[theme.paper ?? 'a4'];
  const margin = MARGIN_SIZES[theme.margin ?? 'normal'];
  const accent = isHexColor(theme.color) ? theme.color : FALLBACK_COLOR;
  const type = 9.4 * (theme.scale ?? 1) * fit;
  const spacing = (theme.spacing ?? 1) * fit;
  const leading = theme.leading ?? 1.45;
  const ctx: Ctx = {
    template: theme.template,
    type,
    spacing,
    leading,
    accent,
    bodyFont: pdfFont(theme.font),
    monoFont: PDF_MONO_FONT,
    entryTitleAccent: ['studio', 'atlas', 'column'].includes(theme.template),
  };
  const pad = (margin.mm * 72) / 25.4;
  const order = data.sectionOrder ?? [];
  const hidden = data.hiddenSections ?? [];
  const flow = order.filter((section) => !hidden.includes(section));
  const hasSummary = flow.includes('profile') && Boolean(data.profile.summary?.trim());
  const hasSections = flow.some(
    (section) => section !== 'profile' && sectionHasContent(data, section)
  );
  let sectionNumber = 0;

  return (
    <Document
      title={data.profile.fullName?.trim() || data.fileName || 'Resume'}
      author={data.profile.fullName?.trim() || 'Quick Resume'}
      subject={data.profile.intro?.trim() || 'Resume'}
      creator='Quick Resume'
      producer='Quick Resume'
      keywords='resume, curriculum vitae'
    >
      <Page
        size={[ (paper.width * 72) / 25.4, (paper.height * 72) / 25.4 ]}
        style={{
          backgroundColor: PAPER,
          padding: pad,
          fontFamily: ctx.bodyFont,
          fontSize: type,
          color: INK,
          lineHeight: leading,
        }}
      >
        <Header resume={data} ctx={ctx} />

        {flow.map((section) => {
          if (section === 'profile') {
            if (!hasSummary) return null;
            return (
              <View
                key='profile'
                style={{ marginTop: em(ctx, 0.8 * ctx.spacing) }}
              >
                <SectionHeading
                  section='profile'
                  ctx={ctx}
                />
                <Text
                  style={{
                    fontFamily: ctx.bodyFont,
                    fontSize: em(ctx, 0.98),
                    color: MUTED,
                    lineHeight: ctx.leading,
                    textAlign: ctx.template === 'gazette' ? 'justify' : 'left',
                  }}
                >
                  {data.profile.summary}
                </Text>
              </View>
            );
          }
          if (!sectionHasContent(data, section)) return null;
          sectionNumber += 1;
          return (
            <SectionBody
              key={section}
              section={section}
              resume={data}
              ctx={ctx}
              number={sectionNumber}
            />
          );
        })}

        {!hasSummary && !hasSections ? (
          <View
            style={{
              marginTop: em(ctx, 1.5),
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: RULE,
              borderRadius: 4,
              padding: em(ctx, 1.4),
            }}
          >
            <Text style={{ fontSize: em(ctx, 0.92), color: FAINT }}>
              Your resume starts here.
            </Text>
            <Text style={{ fontSize: em(ctx, 0.86), color: FAINT, marginTop: em(ctx, 0.2) }}>
              Add a name, a role and one section to see the page take shape.
            </Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
