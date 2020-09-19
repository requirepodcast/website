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
        guid
      }
    }
  }
  `)

  const allEpisodes = data.allAnchorEpisode.nodes

  for (let episode of allEpisodes) {
    const path = `/archive${episode.guid}`
    const guid = episode.guid

    actions.createPage({
      path,
      component: require.resolve("./src/templates/archive.js"),
      context: { guid },
    })
  }

  actions.createPage({
    path: "/archive",
    component: require.resolve("./src/templates/archive.js"),
    context: { guid: allEpisodes[allEpisodes.length - 1].guid },
  })

  fs.writeFileSync(
    "./public/episodes.json",
    JSON.stringify(
      {
        episodes: allEpisodes.map((episode) => ({
          guid: episode.guid,
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
