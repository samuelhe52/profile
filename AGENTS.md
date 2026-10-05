# personal-profile agent notes

See `README.md` for commands and layout. These rules aren't obvious from the code:

- Do not deploy, and do not touch the server, Nginx, DNS, or GitHub secrets
  unless the maintainer asks. Deployment notes live in the untracked local
  `DEPLOY.md`; keep them out of git.
- Never mention the maintainer's location or university.
- Keep English and Chinese in sync. All copy lives in `src/i18n.ts`.
- The profile owns `/` and `/zh/` on konakona.dev. The blog's old paths
  (`/en/`, `/posts/`, `/zh/posts/`, `/folders/`, `/og/`, `/rss.xml`, …) are
  redirected to blog.konakona.dev in `deploy/nginx.conf`. Don't add profile
  routes under those prefixes.
- Before finishing, run `npm run check` and `npm run build`. Visually check
  both languages in light and dark mode, on desktop and at a 390px width.
- Commits use conventional commits: `<type>: <Imperative subject>`.
