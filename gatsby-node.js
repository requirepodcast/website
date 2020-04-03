const titleUrlParser = (title) =>
  encodeURI(
    title
      .split(" - ")[1]
      .toLowerCase()
      .replace("ó", "o")
      .replace("ł", "l")
      .replace("ń", "n")
      .replace("ż", "z")
      .replace("ź", "z")
      .replace("ć", "c")
      .replace("ę", "e")
      .replace("ś", "s")
      .replace(/ /g, "-")
  )

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulEpisode(sort: { order: ASC, fields: publicationDate }) {
        nodes {
          title
          id
        }
      }
    }
  `)

  const allEpisodes = data.allContentfulEpisode.nodes

  allEpisodes.map((episode, i) => {
    const path = `/archive/${i}/${titleUrlParser(episode.title)}`
    const id = episode.id

    actions.createPage({
      path,
      component: require.resolve("./src/templates/archive.js"),
      context: { id },
    })
  })

  actions.createPage({
    path: "/archive",
    component: require.resolve("./src/templates/archive.js"),
    context: { id: allEpisodes[allEpisodes.length - 1].id },
  })
}
