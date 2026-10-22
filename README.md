# Roshan Shikhare · portfolio

**Live:** [roshan190.github.io/portfolio-yen](https://roshan190.github.io/portfolio-yen/)

A scroll-driven portfolio. One full-screen chapter per job, newest first, each in its own colour: Bajaj Finserv, DEPT® and Tekno Point. HealthShield is the featured project.

The poster layout, sticky chapters and scroll motion are adapted from [David Yen’s portfolio](https://github.com/davidyen1124/portfolio) ([live demo](https://davidyen1124.github.io/portfolio/)), which is MIT licensed. This version is a Next.js port with Roshan’s own work. It does not include the original cookie banner, chatbot, analytics, photos or résumé.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · GSAP ScrollTrigger · Lenis

Static export for GitHub Pages, `basePath` `/portfolio-yen`.

```bash
npm install
npm run dev
npm run build
```

## Pages

Pushing to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which uploads the `out` directory with `actions/upload-pages-artifact` and deploys it with `actions/deploy-pages`.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

## License

MIT. Copyright notices for David Yen and Roshan Shikhare are in [LICENSE](LICENSE).
