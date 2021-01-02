require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `require('podcast');`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-target-blank`,
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 900,
              linkImagesToOriginal: false,
              backgroundColor: "transparent",
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `episodes`,
        remote: `https://github.com/requirepodcast/episodes.git`,
        patterns: `episodes/*.md`,
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
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
  ],
}
