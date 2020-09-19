require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Ponpes Ibnul Qoyyim`,
    description: `Ma'had Ahlussunnah wal Jama'ah di Balikpapan Utara.`,
    author: `أبو عبدالمجيد الأمريكي`,
    siteUrl: `https://ppiq.info`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        icon: `${__dirname}/src/images/logo.png`
      }
    },
    {
      resolve: 'gatsby-source-anchor',
      options: {
        rss: 'https://anchor.fm/s/3770c8bc/podcast/rss',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      plugins: [
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ponpes Ibnul Qoyyim`,
        short_name: `t`,
        start_url: `/`,
        background_color: `#0f111a`,
        theme_color: `#FF5370`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
  ],
}
