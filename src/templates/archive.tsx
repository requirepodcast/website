import React from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/Layout/Layout"
import Archive from "../components/Archive/Archive"
import { Episode } from "../types"

type ArchivePageProps = PageProps<{ file: { childMarkdownRemark: Episode } }>

const ArchivePage = ({ data }: ArchivePageProps) => {
  const episode = data.file.childMarkdownRemark

  return (
    <Layout
      title={episode.frontmatter.title}
      description={episode.frontmatter.shortDescription}
      meta={[
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" },
        { property: "og:site_name", content: "Require Podcast" },
      ]}
    >
      <Archive episode={episode} />
    </Layout>
  )
}

export const query = graphql`
  query EpisodeQuery($id: String!) {
    file(id: { eq: $id }) {
      childMarkdownRemark {
        frontmatter {
          youtubeUrl
          title
          spotifyUrl
          slug
          shortDescription
          publicationDate
          audioUrl
        }
        html
      }
    }
  }
`

export default ArchivePage
