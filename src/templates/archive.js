import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import Archive from "../components/Archive/Archive"

const ArchivePage = ({ data }) => {
  const episode = data.file.childMarkdownRemark

  return (
    <Layout title={episode.frontmatter.title}>
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
