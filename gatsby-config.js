function getNodes(results) {
  return {
    allPages: results.edges.map((edge) => edge.node),
    originalType: `edges`,
  }
}

function isArchivePage(path) {
  return /\/archive*/.test(path)
}

function isDevelopment() {
  return process.env.NDOE_ENV !== "production"
}

module.exports = {
  siteMetadata: {
    title: `Require Podcast`,
    description: `Polski podcast na temat JavaScriptu i nie tylko. "Na luzie" o technologiach frontendowych, przez nowości ze świata IT, po frameworki na backendzie!`,
    author: `Adam Siekierski & Artur Dudek`,
    siteUrl: `https://require.podcast.gq`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `require('podcast');`,
        short_name: `Require Podcast`,
        start_url: `/`,
        background_color: `#0f111a`,
        theme_color: `#FF5370`,
        display: `standalone`,
        icon: `src/images/require_mark_transparent.svg`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `episodes`,
        remote: `https://github.com/requirepodcast/episodes.git`,
        patterns: `episodes/*.md`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-S2T3LR4KQN"],
        pluginConfig: {
          head: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) => {
          const { allPages } = getNodes(allSitePage)
          return allPages.map((page) => {
            return {
              url: `${site.siteMetadata.siteUrl}${page.path}`,
              changefreq: `weekly`,
              priority: isArchivePage(page.path) ? 0.5 : 0.9,
            }
          })
        },
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
  ],
}
