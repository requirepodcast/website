require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `require('podcast');`,
    description: `Przemyślenia dwójki programistów - Adama i Artura - na temat nowości i wydarzeń w świecie frontendu, backendu i nie tylko.`,
    author: `Adam Siekierski & Artur Dudek`,
    siteUrl: `https://require.podcast.gq`,
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
    `gatsby-plugin-sharp`,
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
      resolve: `gatsby-source-git`,
      options: {
        name: `episodes`,
        remote: `https://github.com/requirepodcast/episodes.git`,
        patterns: `episodes/*.md`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `require('podcast');`,
        short_name: `The Require Podcast`,
        start_url: `/`,
        background_color: `#0f111a`,
        theme_color: `#FF5370`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
  ],
}
