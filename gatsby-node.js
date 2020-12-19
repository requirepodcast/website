const fs = require("fs")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query EpisodesQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: {
          order: ASC
          fields: childMarkdownRemark___frontmatter___publicationDate
        }
      ) {
        edges {
          node {
            id
            childMarkdownRemark {
              rawMarkdownBody
              html
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

  const allEpisodes = data.allFile.edges

  const lastEpisode = allEpisodes.slice(-1)[0]

  actions.createPage({
    path: "/archive",
    component: require.resolve("./src/templates/archive.js"),
    context: { id: lastEpisode.node.id },
  })

  for (let edge of allEpisodes) {
    const episode = edge.node

    const path = `/archive${episode.childMarkdownRemark.frontmatter.slug}`
    const id = episode.id

    actions.createPage({
      path,
      component: require.resolve("./src/templates/archive.js"),
      context: { id },
    })
  }

  fs.writeFileSync(
    "./public/episodes.json",
    JSON.stringify(
      {
        episodes: allEpisodes.map(({ node: episode }) => ({
          id: episode.id,
          description: {
            html: episode.childMarkdownRemark.html,
            markdown: episode.childMarkdownRemark.rawMarkdownBody,
          },
          ...episode.childMarkdownRemark.frontmatter,
        })),
      },
      null,
      2
    )
  )
}
