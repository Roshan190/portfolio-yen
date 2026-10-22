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
  pattern: 'dots' | 'grid' | 'stripes' | 'rings' | 'lines'
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
      bg: '#E7EEFF',
      ink: '#0C1B3A',
      accent: '#F0B429',
      soft: '#D5E2FF',
      name: '#0C1B3A',
      star: '#F0B429',
    },
    pattern: 'rings',
    line: 'Building web experiences for Bajaj Finserv’s IT, MarTech & GenAI technology team.',
    stats: [
      { text: 'MarTech', label: 'IT, MarTech & GenAI' },
      { text: 'GenAI', label: 'Technology team' },
      { text: 'Web', label: 'Experiences in progress' },
    ],
    tape: ['Bajaj Finserv', 'Senior Software Engineer', 'IT', 'MarTech', 'GenAI', 'Technology', 'Web experiences', 'Apr 2026'],
    props: [
      { toy: 'window', x: 80, y: 38, w: 22, mw: 42, depth: 0.75, rot: -8 },
      { toy: 'spark', x: 92, y: 74, w: 13, mw: 24, depth: 1, rot: 12 },
      { toy: 'card', x: 78, y: 84, w: 16, mw: 30, depth: 0.55, rot: 6 },
      { toy: 'megaphone', x: 76, y: 18, w: 12, mw: 22, depth: 0.32, rot: -14 },
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
      bg: '#FFE14A',
      ink: '#141414',
      accent: '#FF4A1C',
      soft: '#FFF3A8',
      name: '#141414',
      star: '#FFE14A',
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
      { toy: 'stack', x: 78, y: 40, w: 22, depth: 0.72, rot: -6 },
      { toy: 'badge', x: 92, y: 76, w: 14, depth: 1, rot: 10 },
      { toy: 'path', x: 78, y: 86, w: 16, depth: 0.5, rot: -8 },
      { toy: 'plug', x: 76, y: 16, w: 11, depth: 0.3, rot: 16 },
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
      bg: '#D9F6EF',
      ink: '#062E2A',
      accent: '#0E8F7E',
      soft: '#B7EBE2',
      name: '#062E2A',
      star: '#D9F6EF',
    },
    pattern: 'lines',
    line: 'Software engineer at Tekno Point in Mumbai, from July 2021 to July 2023.',
    stats: [
      { text: 'Engineer', label: 'Software Engineer' },
      { text: 'Mumbai', label: 'Tekno Point' },
      { text: '2021–23', label: 'July 2021 to July 2023' },
    ],
    tape: ['Tekno Point', 'Software Engineer', 'Mumbai', 'July 2021', 'July 2023'],
    props: [
      { toy: 'terminal', x: 80, y: 40, w: 22, depth: 0.75, rot: -8 },
      { toy: 'gear', x: 92, y: 78, w: 13, depth: 1, rot: 14 },
      { toy: 'brackets', x: 78, y: 86, w: 15, depth: 0.55, rot: -6 },
      { toy: 'pin', x: 76, y: 16, w: 11, depth: 0.3, rot: 8 },
    ],
  },
]

export const HERO_PROPS: ToyProp[] = [
  { toy: 'gem', x: 78, y: 24, w: 15, mw: 32, mx: 78, my: 18, depth: 0.55, rot: -8 },
  { toy: 'chai', x: 11, y: 30, w: 8.5, mw: 18, mx: 14, my: 18, depth: 0.9, rot: 8 },
  { toy: 'keycap', x: 40, y: 16, w: 7, mw: 14, mx: 46, my: 12, depth: 0.32, rot: -14 },
]

export interface ProjectCard {
  id: string
  name: string
  kicker: string
  blurb: string
  tags: string[]
  toy: string
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
    toy: 'form',
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
    toy: 'mono',
    bg: '#FF8FB1',
    ink: '#141414',
  },
  {
    id: 'ifl',
    name: 'India First Life',
    kicker: 'Client · DEPT®',
    blurb: 'India First Life Insurance. Client work through DEPT®.',
    tags: ['Insurance', 'DEPT®'],
    toy: 'mono',
    bg: '#C8A8FF',
    ink: '#141414',
  },
  {
    id: 'palfinger',
    name: 'Palfinger',
    kicker: 'Client · DEPT®',
    blurb: 'Client work through DEPT® in Mumbai.',
    tags: ['DEPT®', 'Client'],
    toy: 'mono',
    bg: '#7CE0FF',
    ink: '#082028',
  },
  {
    id: 'mumbaifilter',
    name: 'MumbaiFilter',
    kicker: 'Freelance',
    blurb: 'Freelance client work.',
    tags: ['Freelance', 'Mumbai'],
    toy: 'mono',
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
