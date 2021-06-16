module.exports = {
  title: 'PlaceOS',
  url: 'https://docs.placeos.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'placeos',
  projectName: 'docs-site',
  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      switchConfig: {
        darkIcon: '●',
        lightIcon: '●',
      },
    },
    image: 'img/meta.png',
    announcementBar: {
      id: 'wip',
      content: "Documents here are a living resource. If you have a question not currently covered, please email <a href=\"mailto:support@placeos.com\">support@placeos.com</a> so that we can help.",
      backgroundColor: '#24Cdfd',
      textColor: '#0a0d2e',
    },
    navbar: {
      hideOnScroll: true,
      logo: {
        alt: 'PlaceOS',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg',
      },
      items: [
        {
          to: '/',
          label: 'Docs',
          activeBaseRegex: '^(?!\/?reference\/(api|supported-integrations)).+$',
        },
        {
          to: 'reference/supported-integrations',
          label: 'Drivers',
        },
        {
          to: 'reference/api',
          label: 'API',
        },
        {
          href: 'https://github.com/PlaceOS/PlaceOS/discussions',
          label: 'Community',
        }
      ],
    },
    hideableSidebar: true,
    footer: {
      style: 'light',
      links: [
      ],
    },
    prism: {
      additionalLanguages: [
        'ruby',
        'crystal'
      ],
    },
  },
  stylesheets: [
    '/fonts/fonts.css'
  ],
  plugins: [
    './src/plugins/webpack.js',
    [
      '@cmfcmf/docusaurus-search-local',
      {
        docsRouteBasePath: '/',
      }
    ],
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: process.env.DOCS_PATH || 'docs',
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          include: [
            './!(README).md',
            './!(node_modules)/**/!(README).md',
          ],
          beforeDefaultRemarkPlugins: [
            require('./src/plugins/remark-tabs.js')
          ],
          remarkPlugins: [
            require('remark-abbr')
          ],
        },
        blog: false,
        pages: false,
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
      },
    ],
  ],
};
