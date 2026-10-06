# profile

Personal profile site for konakona (Samuel He), served at <https://konakona.dev>.
It's a static [Astro](https://astro.build) site with English (`/`) and
Simplified Chinese (`/zh/`) pages. The blog lives separately at
<https://blog.konakona.dev>.

## Commands

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
npm run check     # type-check .astro and .ts files
```

## Layout

- `src/i18n.ts` holds all copy, project entries, and links. Both locales
  implement the same `Strings` type, so a missing translation fails
  `npm run check`.
- `src/components/Profile.astro` is the page; `src/pages/index.astro` and
  `src/pages/zh/index.astro` render it per locale. Only the Chinese page loads
  Noto Serif SC.
- `src/lib/posts.ts` reads the three latest posts from the blog's RSS feeds at
  build time. If the fetch fails, the build still succeeds and the page shows a
  link to the blog instead.
- `src/styles/global.css` holds all styles. Light and dark mode follow the
  system setting.

Because the post list comes from the blog's feed, rebuild and redeploy this
site after publishing a post if the front page should show it.

Deployment notes are kept locally in `DEPLOY.md`, which is not tracked.

## License

The code is under the [MIT License](LICENSE). The avatar
(`src/assets/avatar.jpg`, `public/avatar.jpg`) is a frame from the anime
*K-On!*. It isn't covered by that license and belongs to its rights holders.
