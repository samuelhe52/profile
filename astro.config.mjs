// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://konakona.dev',
  trailingSlash: 'ignore',
  // Keep every asset a separate file so the CSP can stay at font-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', zh: 'zh-Hans' } },
    }),
  ],
});
