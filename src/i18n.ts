export type Lang = 'en' | 'zh';

export interface Link {
  label: string;
  href: string;
}

export interface Work {
  name: string;
  kind: string;
  description: string;
  href: string;
  links: Link[];
}

export interface Strings {
  htmlLang: string;
  ogLocale: string;
  title: string;
  description: string;
  name: string;
  role: string;
  intro: string[];
  switchLabel: string;
  switchHref: string;
  sections: { works: string; writing: string; elsewhere: string };
  works: Work[];
  writing: { allPosts: string; empty: string; feed: string };
  blogHref: string;
  elsewhere: Link[];
  colophon: { built: string; source: string };
  feedHref: string;
  notFound: { title: string; body: string; moved: string; home: string };
}

const GITHUB = 'https://github.com/samuelhe52';
const EMAIL = 'samuelhe52@outlook.com';
export const REPO = `${GITHUB}/profile`;

export const strings: Record<Lang, Strings> = {
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    title: 'konakona — Samuel He',
    description:
      'Samuel He (konakona): Swift developer building native apps for Apple platforms, and ML researcher working on post-training, agentic RL, and recommender systems.',
    name: 'Samuel He',
    role: 'Swift · ML research',
    intro: [
      'I’m a Swift developer building native apps for Apple platforms.',
      'I also do ML research, mostly on post-training, agentic RL, and recommender systems.',
      'Anime fan. I write about what I build and learn on my blog.',
    ],
    switchLabel: '中文',
    switchHref: '/zh/',
    sections: { works: 'Works', writing: 'Writing', elsewhere: 'Elsewhere' },
    works: [
      {
        name: 'AniShelf',
        kind: 'iPhone · iPad · Mac',
        description: 'A native app for tracking and managing your anime library.',
        href: 'https://anishelf.konakona.dev',
        links: [
          { label: 'App Store', href: 'https://apps.apple.com/app/id6759359144' },
          { label: 'GitHub', href: `${GITHUB}/AniShelf` },
        ],
      },
      {
        name: 'Teleport',
        kind: 'macOS',
        description:
          'Simulate iOS device locations from your Mac, on simulators and on real devices over USB or Wi-Fi.',
        href: `${GITHUB}/Teleport`,
        links: [{ label: 'Download', href: `${GITHUB}/Teleport/releases/latest` }],
      },
      {
        name: 'Kona’s Toolbox',
        kind: 'Web',
        description:
          'Browser utilities: a Markdown previewer, a ChatGPT shared-chat exporter, and a few more.',
        href: 'https://tools.konakona.dev',
        links: [{ label: 'GitHub', href: `${GITHUB}/konakona52-site-tools` }],
      },
      {
        name: 'codexctl',
        kind: 'CLI · Python',
        description:
          'Start, monitor, and steer Codex sessions from the command line, with a Claude Code subagent that hands work to Codex.',
        href: `${GITHUB}/codexctl`,
        links: [],
      },
    ],
    writing: {
      allPosts: 'All posts',
      empty: 'Recent posts are on the blog.',
      feed: 'RSS',
    },
    blogHref: 'https://blog.konakona.dev/en/',
    feedHref: 'https://blog.konakona.dev/en/rss.xml',
    elsewhere: [
      { label: 'GitHub', href: GITHUB },
      { label: 'X', href: 'https://x.com/SamuelHe89' },
      { label: 'Blog', href: 'https://blog.konakona.dev/en/' },
      { label: 'Email', href: `mailto:${EMAIL}` },
    ],
    colophon: { built: 'Built with Astro', source: 'Source on GitHub' },
    notFound: {
      title: 'Nothing here',
      body: 'This page doesn’t exist.',
      moved: 'Looking for a blog post? The blog lives at',
      home: 'Back to the front page',
    },
  },
  zh: {
    htmlLang: 'zh-Hans',
    ogLocale: 'zh_CN',
    title: 'konakona — Samuel He',
    description: 'Samuel He（konakona）：Swift 开发者，做 Apple 平台的原生应用；机器学习研究方向为后训练、Agentic RL 和推荐系统。',
    name: 'Samuel He',
    role: 'Swift · 机器学习研究',
    intro: [
      'Swift 开发者，做 Apple 平台上的原生应用。',
      '同时在做机器学习研究，主要方向是后训练、Agentic RL 和推荐系统。',
      '动漫爱好者。做过的东西和学到的东西，会写在博客里。',
    ],
    switchLabel: 'English',
    switchHref: '/',
    sections: { works: '作品', writing: '文章', elsewhere: '链接' },
    works: [
      {
        name: 'AniShelf',
        kind: 'iPhone · iPad · Mac',
        description: '一款原生的动漫收藏管理应用。',
        href: 'https://anishelf.konakona.dev/zh/',
        links: [
          { label: 'App Store', href: 'https://apps.apple.com/app/id6759359144' },
          { label: 'GitHub', href: `${GITHUB}/AniShelf` },
        ],
      },
      {
        name: 'Teleport',
        kind: 'macOS',
        description: '在 Mac 上模拟 iOS 设备定位，支持模拟器，以及通过 USB 或 Wi-Fi 连接的实体设备。',
        href: `${GITHUB}/Teleport`,
        links: [{ label: '下载', href: `${GITHUB}/Teleport/releases/latest` }],
      },
      {
        name: 'Kona’s Toolbox',
        kind: 'Web',
        description: '浏览器里的小工具：Markdown 预览、ChatGPT 分享对话导出等。',
        href: 'https://tools.konakona.dev',
        links: [{ label: 'GitHub', href: `${GITHUB}/konakona52-site-tools` }],
      },
      {
        name: 'codexctl',
        kind: 'CLI · Python',
        description: '在命令行里启动、监控和引导 Codex 会话，附带一个把任务交给 Codex 的 Claude Code 子代理。',
        href: `${GITHUB}/codexctl`,
        links: [],
      },
    ],
    writing: {
      allPosts: '全部文章',
      empty: '最近的文章都在博客上。',
      feed: 'RSS',
    },
    blogHref: 'https://blog.konakona.dev/zh/',
    feedHref: 'https://blog.konakona.dev/rss.xml',
    elsewhere: [
      { label: 'GitHub', href: GITHUB },
      { label: 'X', href: 'https://x.com/SamuelHe89' },
      { label: '博客', href: 'https://blog.konakona.dev/zh/' },
      { label: '邮箱', href: `mailto:${EMAIL}` },
    ],
    colophon: { built: '使用 Astro 构建', source: 'GitHub 上的源码' },
    notFound: {
      title: '这里什么都没有',
      body: '页面不存在。',
      moved: '在找博客文章？博客在',
      home: '回到首页',
    },
  },
};
