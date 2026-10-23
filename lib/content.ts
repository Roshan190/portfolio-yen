export const SITE = 'https://roshan190.github.io/portfolio-yen'

export const profile = {
  name: 'Roshan Shikhare',
  first: 'Roshan',
  last: 'Shikhare',
  location: 'Mumbai, India',
  role: 'Senior Software Engineer',
  headline: 'Senior Frontend / Fullstack Engineer',
  since: '2021',
  github: 'https://github.com/Roshan190',
  linkedin: 'https://www.linkedin.com/in/roshan-shikhare-83320820a',
} as const

export interface Theme {
  bg: string
  ink: string
  accent: string
  soft: string
  name: string
  star: string
}

export interface Stat {
  text: string
  label: string
}

export interface ToyProp {
  toy: string
  img: string
  x: number
  y: number
  w: number
  depth: number
  rot?: number
  mw?: number
  mx?: number
  my?: number
}

export interface Job {
  id: string
  name: string
  /** Lines of the giant poster name. */
  lines: string[]
  /** Accessible name, including marks that are drawn in CSS. */
  label: string
  mark?: 'reg'
  role: string
  when: string
  where: string
  year: number
  theme: Theme
  pattern: 'dots' | 'grid' | 'stripes' | 'rings' | 'lines' | 'spot'
  line: string
  stats: Stat[]
  foot?: string
  tape: string[]
  props: ToyProp[]
}

export const JOBS: Job[] = [
  {
    id: 'bajaj',
    name: 'Bajaj Finserv',
    lines: ['Bajaj', 'Finserv'],
    label: 'Bajaj Finserv',
    role: 'Senior Software Engineer',
    when: 'Apr 2026 — Present',
    where: 'IT, MarTech & GenAI',
    year: 2026,
    theme: {
      bg: '#00031F',
      ink: '#D1DEF2',
      accent: '#0B5CFF',
      soft: '#00053D',
      name: '#0B5CFF',
      star: '#7CE0FF',
    },
    pattern: 'spot',
    line: 'Building web experiences for Bajaj Finserv’s IT, MarTech & GenAI technology team.',
    stats: [
      { text: 'MarTech', label: 'IT, MarTech & GenAI' },
      { text: 'GenAI', label: 'Technology team' },
      { text: 'Web', label: 'Experiences in progress' },
    ],
    tape: ['Bajaj Finserv', 'Senior Software Engineer', 'IT', 'MarTech', 'GenAI', 'Technology', 'Web experiences', 'Apr 2026'],
    props: [
      { toy: 'camera', img: 'zoom-camera', x: 80, y: 40, w: 21, depth: 0.8, rot: -6 },
      { toy: 'tiles', img: 'zoom-tiles', x: 63, y: 84, w: 18, depth: 0.6, rot: 5 },
      { toy: 'mic', img: 'zoom-mic', x: 92, y: 80, w: 11, depth: 1, rot: 10 },
      { toy: 'folder', img: 'zoom-folder', x: 57, y: 22, w: 11, depth: 0.35, rot: -10 },
    ],
  },
  {
    id: 'dept',
    name: 'DEPT®',
    lines: ['Dept'],
    label: 'DEPT®',
    mark: 'reg',
    role: 'Senior Software Engineer',
    when: 'Aug 2023 — Apr 2026',
    where: 'Mumbai',
    year: 2023,
    theme: {
      bg: '#FD243E',
      ink: '#111013',
      accent: '#111013',
      soft: '#FF6B7D',
      name: '#111013',
      star: '#FFD23F',
    },
    pattern: 'stripes',
    line: 'React, Next.js, Angular and AEM. Configurable insurance journeys, KYC prefill, CMS-driven platforms and integrated backend services.',
    stats: [
      { text: 'Journeys', label: 'Configurable insurance journeys' },
      { text: 'KYC', label: 'Prefill' },
      { text: 'CMS', label: 'Platforms and backend services' },
    ],
    foot: 'Clients: IFB, India First Life Insurance and Palfinger.',
    tape: ['DEPT', 'React', 'Next.js', 'Angular', 'AEM', 'Insurance journeys', 'KYC prefill', 'CMS', 'IFB', 'India First Life', 'Palfinger'],
    props: [
      { toy: 'cursor', img: 'tf-cursor', x: 83, y: 40, w: 17, mw: 30, mx: 84, my: 20, depth: 0.9, rot: -8 },
      { toy: 'clamp', img: 'tf-clamp', x: 64, y: 84, w: 19, mw: 34, mx: 22, my: 91, depth: 0.6, rot: 6 },
      { toy: 'canvas', img: 'tf-canvas', x: 91, y: 80, w: 16, mw: 28, mx: 86, my: 89, depth: 1, rot: 10 },
      { toy: 'rosette', img: 'tf-rosette', x: 57, y: 22, w: 11, mw: 20, mx: 50, my: 7, depth: 0.35, rot: -12 },
    ],
  },
  {
    id: 'tekno',
    name: 'Tekno Point',
    lines: ['Tekno', 'Point'],
    label: 'Tekno Point',
    role: 'Software Engineer',
    when: 'Jul 2021 — Jul 2023',
    where: 'Mumbai',
    year: 2021,
    theme: {
      bg: '#3DDC84',
      ink: '#073B2A',
      accent: '#073B2A',
      soft: '#9CF0C0',
      name: '#073B2A',
      star: '#073B2A',
    },
    pattern: 'dots',
    line: 'Software engineer at Tekno Point in Mumbai, from July 2021 to July 2023.',
    stats: [
      { text: 'Engineer', label: 'Software Engineer' },
      { text: 'Mumbai', label: 'Tekno Point' },
      { text: '2021–23', label: 'July 2021 to July 2023' },
    ],
    tape: ['Tekno Point', 'Software Engineer', 'Mumbai', 'July 2021', 'July 2023'],
    props: [
      { toy: 'phone', img: 'sparks-phone', x: 78, y: 40, w: 25, mw: 44, mx: 74, my: 25, depth: 0.8, rot: 12 },
      { toy: 'trophy', img: 'sparks-trophy', x: 90, y: 80, w: 14, mw: 26, mx: 86, my: 88, depth: 0.5, rot: -8 },
      { toy: 'guzheng', img: 'sparks-guzheng', x: 60, y: 90, w: 19, mw: 34, mx: 22, my: 92, depth: 1, rot: -14 },
      { toy: 'bolt', img: 'sparks-bolt', x: 55, y: 21, w: 10, mw: 18, mx: 90, my: 8, depth: 0.3, rot: 18 },
    ],
  },
]

export const HERO_PROPS: ToyProp[] = [
  { toy: 'laptop', img: 'hero-laptop', x: 78, y: 16, w: 16, mw: 44, mx: 70, my: 22, depth: 0.6, rot: -6 },
  { toy: 'boba', img: 'hero-boba', x: 12, y: 18, w: 9, mw: 22, mx: 16, my: 20, depth: 0.9, rot: 10 },
  { toy: 'keycap', img: 'hero-keycap', x: 42, y: 13, w: 7, mw: 15, mx: 42, my: 16, depth: 0.35, rot: -14 },
]

export interface ProjectCard {
  id: string
  name: string
  kicker: string
  blurb: string
  tags: string[]
  img: string
  bg: string
  ink: string
  links?: { href: string; label: string; aria: string }[]
}

export const PROJECTS: ProjectCard[] = [
  {
    id: 'form-ninja',
    name: 'Form Ninja',
    kicker: 'Open source · MIT',
    blurb:
      'JavaScript library for form validation. Custom rules, error handling, and inputs including checkboxes, radios and file uploads.',
    tags: ['TypeScript', 'npm', 'MIT'],
    img: 'p-train',
    bg: '#F4EFE6',
    ink: '#141414',
    links: [
      {
        href: 'https://www.npmjs.com/package/form-ninja',
        label: 'npm',
        aria: 'Form Ninja on npm (opens in a new tab)',
      },
      {
        href: 'https://github.com/Roshan190/form-ninja',
        label: 'Code',
        aria: 'Form Ninja source on GitHub (opens in a new tab)',
      },
    ],
  },
  {
    id: 'ifb',
    name: 'IFB',
    kicker: 'Client · DEPT®',
    blurb: 'Client work through DEPT® in Mumbai.',
    tags: ['DEPT®', 'Client'],
    img: 'p-beaver',
    bg: '#FF8FB1',
    ink: '#141414',
  },
  {
    id: 'ifl',
    name: 'India First Life',
    kicker: 'Client · DEPT®',
    blurb: 'India First Life Insurance. Client work through DEPT®.',
    tags: ['Insurance', 'DEPT®'],
    img: 'p-fortune',
    bg: '#C8A8FF',
    ink: '#141414',
  },
  {
    id: 'palfinger',
    name: 'Palfinger',
    kicker: 'Client · DEPT®',
    blurb: 'Client work through DEPT® in Mumbai.',
    tags: ['DEPT®', 'Client'],
    img: 'p-rocket',
    bg: '#7CE0FF',
    ink: '#082028',
  },
  {
    id: 'mumbaifilter',
    name: 'MumbaiFilter',
    kicker: 'Freelance',
    blurb: 'Freelance client work.',
    tags: ['Freelance', 'Mumbai'],
    img: 'p-gong',
    bg: '#FFD23F',
    ink: '#141414',
  },
]

export const SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Tailwind',
  'Angular',
  'AEM',
  'Expo / React Native',
  'Supabase',
] as const

export const HEALTH = {
  name: 'HealthShield',
  lines: ['Health', 'Shield'],
  url: 'https://health-shield.in',
  portal: 'https://portal.health-shield.in',
  source: 'https://github.com/Roshan190/health-shield',
  blurb:
    'Solo-built, mobile-first personal health and insurance companion for India. Vitals and medications, SOS, household sharing, AI summaries, policy PDF extraction, document Q&A, nearby and cashless hospital search, claims assist, and a doctor portal.',
  note: 'Source-available. All rights reserved. Not open source. Public Android download on the site.',
  tags: ['Expo', 'Expo Router', 'NativeWind', 'Supabase', 'Mapbox'],
} as const
