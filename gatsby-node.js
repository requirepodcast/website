const fs = require("fs")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query IndexPageQuery {
    allAnchorEpisode {
      nodes {
        content
        contentSnippet
        title
        pubDate
        link
        id
        enclosure {
          url
        }
      }
    }
  }
  `)

  const allEpisodes = data.allAnchorEpisode.nodes

  for (let episode of allEpisodes) {
    const path = `/archive/${episode.id}`
    const id = episode.id

    actions.createPage({
      path,
      component: require.resolve("./src/templates/archive.js"),
      context: { id },
    })
  }

  actions.createPage({
    path: "/archive",
    component: require.resolve("./src/templates/archive.js"),
    context: { id: allEpisodes[allEpisodes.length - 1].id },
  })

  fs.writeFileSync(
    "./public/episodes.json",
    JSON.stringify(
      {
        episodes: allEpisodes.map((episode) => ({
          id: episode.id,
          description: {
            html: episode.content,
            markdown: episode.contentSnippet,
          },
          ...episode,
        })),
      },
      null,
      2
    )
  )
}
