import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      lastModified: '2026-10-22',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
