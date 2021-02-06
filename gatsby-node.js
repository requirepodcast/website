const { createPages, generateEpisodesJson, generateRss } = require("./helpers/ssg-helpers")

/**
 * @typedef {object} Episode
 * @property {string} Episode.id
 * @property {object} Episode.childMarkdownRemark
 * @property {string} Episode.childMarkdownRemark.html
 * @property {string} Episode.childMarkdownRemark.rawMarkdownBody
 * @property {object} Episode.childMarkdownRemark.frontmatter
 * @property {string} Episode.childMarkdownRemark.frontmatter.audioUrl
 * @property {string} Episode.childMarkdownRemark.frontmatter.publicationDate
 * @property {string} Episode.childMarkdownRemark.frontmatter.shortDescription
 * @property {string} Episode.childMarkdownRemark.frontmatter.title
 * @property {string} Episode.childMarkdownRemark.frontmatter.youtubeUrl
 * @property {string} Episode.childMarkdownRemark.frontmatter.spotifyUrl
 * @property {string} Episode.childMarkdownRemark.frontmatter.slug
 */

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query EpisodesQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: { order: ASC, fields: childMarkdownRemark___frontmatter___publicationDate }
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              html
              rawMarkdownBody
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
    }
  `)

  /**
   * @type {Episode[]}
   */
  const allEpisodes = data.allFile.edges.map((edge) => edge.node)

  createPages(allEpisodes, actions.createPage)
  generateEpisodesJson(allEpisodes)
  generateRss(allEpisodes)
}
