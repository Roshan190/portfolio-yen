import { HEALTH, profile, SITE } from './content'

export const title = `${profile.name} · ${profile.headline}`

export const description =
  'Roshan Shikhare is a senior frontend and fullstack engineer in Mumbai. 5+ years with React, Next.js and Node.js across Bajaj Finserv, DEPT® and Tekno Point. Featured work: HealthShield.'

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  description,
  url: `${SITE}/`,
  homeLocation: {
    '@type': 'Place',
    name: profile.location,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressCountry: 'IN',
    },
  },
  sameAs: [profile.github, profile.linkedin, HEALTH.url],
  knowsAbout: [
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
    'Expo',
    'React Native',
    'Supabase',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Mumbai University',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Bajaj Finserv',
  },
  subjectOf: [
    {
      '@type': 'SoftwareApplication',
      name: 'HealthShield',
      url: HEALTH.url,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Android',
      description: HEALTH.blurb,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: 'Form Ninja',
      codeRepository: 'https://github.com/Roshan190/form-ninja',
      programmingLanguage: 'TypeScript',
      license: 'https://opensource.org/licenses/MIT',
      url: 'https://www.npmjs.com/package/form-ninja',
    },
  ],
}
