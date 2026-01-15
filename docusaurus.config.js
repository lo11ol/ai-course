// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // ==================================================================
  // 1. 基础网站信息
  // ==================================================================
  title: 'AI Course - 全栈 AI 效率知识库',
  tagline: '让 AI 成为你的第二大脑',
  favicon: 'img/logo.jpg',

  // 生产环境 URL (必须和你的域名一致)
  url: 'https://aicourse.unnomad.com',
  baseUrl: '/',

  // GitHub Pages 配置
  organizationName: 'lo11ol',
  projectName: 'ai-course',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // 国际化设置
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  future: {
    v4: true,
  },


  // ==================================================================
  // 3. 预设配置 (文档、博客、主题)
  // ==================================================================
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          sidebarCollapsible: true,
          // editUrl: 'https://github.com/lo11ol/ai-course/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '最新文章',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} AI Course`,
          },
          // editUrl: 'https://github.com/lo11ol/ai-course/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // ==================================================================
  // 4. 主题 UI 配置 (导航栏、页脚、SEO)
  // ==================================================================
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',

      // 全局 SEO 元数据
      metadata: [
        {name: 'keywords', content: 'AI教程, 人工智能, 效率工具, 知识库, Docusaurus, 全栈开发, Python, 提示词'},
        {name: 'description', content: '专注于 AI 效率工具与全栈开发的个人知识库，帮助非技术人员构建第二大脑。'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      ],

      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      // 导航栏
      navbar: {
        title: 'AI Course',
        logo: {
          alt: 'AI Course Logo',
          src: 'img/logo.jpg',
          style: { borderRadius: '50%' }
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'AI 知识库',
          },
          {to: '/blog', label: '博客 & 思考', position: 'left'},
          {
            href: 'https://github.com/lo11ol/ai-course',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },

      // 页脚
      footer: {
        style: 'dark',
        links: [
          {
            title: '📚 知识板块',
            items: [
              { label: 'AI 基础教程', to: '/docs/' },
              { label: '效率工具箱', to: '/blog' },
              { label: '全栈开发实战', to: '/blog/tags/全栈开发' },
            ],
          },
          {
            title: '🤝 关注我',
            items: [
              { label: '微信公众号', href: 'https://mp.weixin.qq.com/' },
              { label: 'Bilibili', href: 'https://space.bilibili.com/7421761' },
              { label: 'Email', href: 'mailto:a-.-@outlook.com' },
            ],
          },
          {
            title: '🔗 更多',
            items: [
              { label: '博客归档', to: '/blog/archive' },
              { label: 'GitHub 仓库', href: 'https://github.com/lo11ol/ai-course' },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} AI Course. Built with Docusaurus.`,
      },

      // 代码高亮
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'json', 'yaml'],
      },
    }),
};

export default config;
