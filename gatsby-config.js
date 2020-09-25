require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Radio IQ`,
    description: `Ma'had Ahlussunnah wal Jama'ah di Balikpapan Utara.`,
    author: `أبو عبدالمجيد الأمريكي`,
    siteUrl: `https://radio.iqbpn.com`,
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
        icon: `${__dirname}/src/images/logo.png`,
      },
    },
    {
      resolve: "gatsby-source-anchor",
      options: {
        rss: "https://anchor.fm/s/3770c8bc/podcast/rss",
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
        theme_color: `#00BFFF`,
        display: `minimal-ui`,
        icon: `src/images/logo.png`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [{ family: `Sofia` }, { family: `Quicksand` }],
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-offline`,
  ],
}
