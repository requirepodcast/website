const fs = require("fs")
const { Feed } = require("feed")
const meta = require("../gatsby-config").siteMetadata

/**
 * @typedef {import('../gatsby-node').Episode} Episode
 */

/**
 * @param {Episode[]} episodes
 * @param {(any) => void} createPage
 */
function createPages(episodes, createPage) {
  const lastEpisode = episodes.slice(-1)[0]

  createPage({
    path: "/archive",
    component: require.resolve("../src/templates/archive.tsx"),
    context: { id: lastEpisode.id },
  })

  for (let episode of episodes) {
    const path = `/archive${episode.frontmatter.slug}`
    const id = episode.id

    createPage({
      path,
      component: require.resolve("../src/templates/archive.tsx"),
      context: { id },
    })
  }
}

/**
 * @param {Episode[]} episodes
 */
function generateEpisodesJson(episodes) {
  fs.writeFileSync(
    "./public/episodes.json",
    JSON.stringify(
      {
        episodes: episodes.map((episode) => ({
          id: episode.id,
          description: {
            markdown: episode.rawBody,
          },
          ...episode.frontmatter,
        })),
      },
      null,
      2
    )
  )
}

/**
 * @param {Episode[]} episodes
 */
function generateRss(episodes) {
  const feed = new Feed({
    title: meta.title,
    description: meta.description,
    id: meta.siteUrl,
    link: meta.siteUrl,
    author: {
      name: meta.author,
    },
    language: "pl",
    image: `${meta.siteUrl}/logo.png`,
    favicon: `${meta.siteUrl}/favicon.svg`,
    generator: "require podcast",
  })

  for (let episode of episodes.reverse()) {
    const { frontmatter } = episode

    feed.addItem({
      title: frontmatter.title,
      id: episode.id,
      link: `${meta.siteUrl}/archive${frontmatter.slug}`,
      description: frontmatter.shortDescription,
      date: new Date(frontmatter.publicationDate),
    })
  }

  fs.writeFileSync("./public/feed.xml", feed.rss2())
}

module.exports = {
  createPages,
  generateEpisodesJson,
  generateRss,
}
