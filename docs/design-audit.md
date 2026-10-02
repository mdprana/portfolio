# UI/UX Audit — Figma `Portofolio`

File: `Vfa2sw0KvmhagP7jjrZBJ6`. Method: `better-interface` + the `better-*` domain skills
(accessibility, layout, writing, typography, colors, ui).

Scope: 5 Desktop frames (1440), 3 Mobile frames (390), Motion Spec, Tokens & Components.
Out of scope: the web build itself, the real Google Drive resume URL.

Severity: **Blocker** → cannot hand off. **High** → visible defect or false claim.
**Medium** → quality. **Low** → polish.

---

## Blocker / High

### H1 · Writing · IoT claims that the CV does not support
Locations: `Capability Row` instances (`I33:500;33:377`, `I33:599;33:377`),
`Timeline Item / 3`, `26:246`, `26:292`, chip `18:24`, About copy `30:214`, `36:490`.
Before: IoT claimed in six places. After: removed.
Why: the CV contains zero occurrences of "IoT", "Arduino", or a freelance IoT role.
A recruiter checking the CV finds a claim that is not there.

**Resolution in code:** replaced by a Computer Vision capability and a real
Econdelight web-developer entry. See `lib/content.ts`.

### H2 · Writing · Invented awards and metrics
Locations: Home Highlights, `26:246`.
Before: "1st Place — National Data Science Competition", "12+ projects", "2K+ users".
After: CV-verifiable figures only — GPA 3.84, BLEU 0.415, top 10% of 1,500+,
146 schools.
Why: no source exists for the originals. A portfolio built on invented numbers
is a credibility risk, not a marketing asset.

**Resolution in code:** `highlights` and `awards` in `lib/content.ts`.

### H3 · Accessibility · Experience years reachable only by hover
Location: `Tech Tile` `State=Default`, layer `Years` at `opacity: 0`.
Before: "4 yrs" revealed on hover. Mobile instances: zero reactions.
After: always-visible category label on every breakpoint.
Why: the state change is motion-only, so a touch user can never reach the content.
The hint "Hover a tile to see years of experience" is not executable on touch.

**Resolution in code:** `components/tech-stack.tsx` renders `group`, not `years`.

### H4 · Prototype · Dead primary CTAs
Locations: `23:52` and `26:313` "View all projects"; `30:217` and `36:492` "Read more".
Before: 0 reactions — only `30:216` was wired.
After: real links.
Why: the main "see everything" path stopped at Home, so the prototype could not
be demonstrated end to end.

**Resolution in code:** `Link` elements to `/projects` and `/about`.

### H5 · Accessibility · Contact form has no states at all
Location: `Contact — Desktop 1440` `18:213`; fields `Field / Name`, `Field / Email`,
`Field / Company (optional)`, `Field / Tell me about your project`.
Before: label text 32px `#5C5C5C` inside the box, 25% white border, no focus, error,
loading, or disabled state anywhere in the file.
After: separate `<label>`, visible focus ring, inline error text with `aria-invalid`.
Why: an error with no recovery path is a hard blocker; a placeholder is not a label.

**Status:** not yet built — the contact route is still pending.

---

## Medium

### M1 · Colors · `text-subtle` fails contrast for body text
Locations: `16:87`, `17:86`, `18:110`, `18:211`, `18:277`, `19:92`, `36:479`.
Before: `#737373` on `#000000` = **4.43:1**. After: `#999999` = **7.37:1**.
Why: 14px text needs ≥ 4.5:1. It misses by a hair, and this is legal text.

Measured pairs:

| Token | On `#000000` | Verdict |
| --- | --- | --- |
| `#FFFFFF` | 21.00:1 | pass |
| `#B3B3B3` | 10.02:1 | pass |
| `#999999` | 7.37:1 | pass |
| `#737373` | 4.43:1 | **fail** under 24px |
| `#5A5A5A` | 3.04:1 | large text only |
| `#5C5C5C` | 3.14:1 | large text only |

**Resolution in code:** `--color-subtle: #999999` in `app/globals.css`.

### M2 · Typography · Body copy at line-height 1.1
Locations: `14:18`, `30:212`–`30:215`, `17:33`/`17:36`/`17:39`, `18:225`, `19:40`.
Before: 45px / 1.1 across 4–5 wrapped lines. After: 1.4 for anything wrapping 3+ lines.
Why: tight leading is for short display text. Copied deliberately from the reference,
but it reads as a wall. Measure is otherwise safe at 40–44 characters, no widows.

### M3 · Layout · Fourteen spacing steps, four card radii
Before: 18 distinct `itemSpacing` values (`0,4,6,8,10,12,14,16,24,28,32,36,40,48,56,72,96`);
radius `0`×550, `999`×19, `24`×3, `20`×3.
After: one scale (4/8/12/16/24/32/48/96) and one card radius.
Why: 14 and 10 belong to no scale; `Metric` is 20 on Mobile and 24 on Desktop,
so the same component changes corner at a breakpoint.

**Resolution in code:** `--radius-card: 24px`, Tailwind's default spacing scale.

### M4 · Writing · Inconsistent CTA capitalisation
Before: `Say Hello`, `Download Resume`, `Back to Top` in title case; `Send message`,
`Read more`, `View all projects` in sentence case.
After: one policy per element type.

### M5 · Writing · Two identical "Read more" links
Locations: `30:216`, `30:217` (About Desktop), `36:492` (Mobile).
After: distinct labels. Why: screen readers navigate by link list, and two
indistinguishable entries are unusable.

**Resolution in code:** "Read more about how I work".

### M6 · Accessibility · Hit targets below the minimum
Before: `Menu toggle` 45×18, `CLOSE` 49×18, nav links 83×20 / 56×20 / 77×20.
After: ≥ 24×24 CSS px, 44×44 on touch.
Why: WCAG 2.5.8 Level AA requires 24×24.

**Resolution in code:** nav links carry `py-2`.

### M7 · UI · Marquee pauses on hover only
Location: the strip in `32:156`.
After: pauses on hover, on keyboard focus, and never starts under reduced motion.
Why: hover does not exist on touch, and moving content with no control is a
WCAG 2.2.2 issue.

**Resolution in code:** `.marquee` in `app/globals.css`.

---

## Low

- **L1** Spec annotations rendered as UI layers (`14:20`, `19:11`, `32:400`) —
  move them to Figma comments before handoff.
- **L2** Token set has no focus, hover, pressed, disabled, error, or success roles.
  Without them the form and buttons will hard-code values.
- **L3** 12 of the 24 `Logo / *` components are unused. Delete rather than keep.

---

## Verified clear

- Frame overflow: 14 hits, all intentional marquee items scrolling past the viewport.
- Clipped text inside `clipsContent` frames: 0.
- `prefers-reduced-motion` documented in Motion Spec `20:4`.
- Rendered check of `18:213` — fields and footer legible, nothing truncated.
- Reaction census: 106 total — 42 `ON_HOVER`, 56 `ON_CLICK` → node, 5 `ON_CLICK` → URL,
  1 close, 1 press, 1 after-timeout.

## Not verified

- Focus and keyboard behaviour, screen-reader output: the prototype is Figma, not DOM.
- Runtime reduced-motion: no web build existed at audit time.
