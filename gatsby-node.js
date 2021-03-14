const { createPages, generateEpisodesJson, generateRss } = require("./helpers/ssg-helpers")

/**
 * @typedef {object} Episode
 * @property {string} Episode.id
 * @property {string} Episode.rawBody
 * @property {object} Episode.frontmatter
 * @property {string} Episode.frontmatter.audioUrl
 * @property {string} Episode.frontmatter.publicationDate
 * @property {string} Episode.frontmatter.shortDescription
 * @property {string} Episode.frontmatter.title
 * @property {string} Episode.frontmatter.youtubeUrl
 * @property {string} Episode.frontmatter.spotifyUrl
 * @property {string} Episode.frontmatter.slug
 */

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query EpisodesQuery {
      allMdx(sort: { order: ASC, fields: frontmatter___publicationDate }) {
        edges {
          node {
            id
            body
            rawBody
            frontmatter {
              audioUrl
              publicationDate
              shortDescription
              title
              youtubeUrl
              spotifyUrl
              slug
            }
          }
        }
      }
    }
  `)

  /**
   * @type {Episode[]}
   */
  const allEpisodes = data.allMdx.edges.map((edge) => edge.node)

  createPages(allEpisodes, actions.createPage)
  generateEpisodesJson(allEpisodes)
  generateRss(allEpisodes)
}

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === "production") {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}
