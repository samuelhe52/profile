import type { Lang } from '../i18n';

export interface Post {
  title: string;
  href: string;
  date: Date;
}

const FEEDS: Record<Lang, string> = {
  en: 'https://blog.konakona.dev/en/rss.xml',
  zh: 'https://blog.konakona.dev/rss.xml',
};

const decode = (text: string) =>
  text
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&')
    .trim();

const tag = (item: string, name: string) =>
  decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '');

/**
 * Reads the latest posts from the blog's RSS feed at build time. A failed
 * fetch must not break the build; the page then shows only a link to the blog.
 */
export async function latestPosts(lang: Lang, count = 3): Promise<Post[]> {
  try {
    const res = await fetch(FEEDS[lang], { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map(([, item]) => ({
        title: tag(item, 'title'),
        href: tag(item, 'link'),
        date: new Date(tag(item, 'pubDate')),
      }))
      .filter((p) => p.title && p.href.startsWith('https://') && !isNaN(p.date.getTime()))
      .slice(0, count);
  } catch (err) {
    console.warn(`[posts] Could not read ${FEEDS[lang]}: ${err}`);
    return [];
  }
}
