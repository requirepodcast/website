import { graphql, PageProps } from "gatsby"

import Layout from "../components/Layout/Layout"
import Archive from "../components/Archive/Archive"
import { Episode } from "../types"

type ArchivePageProps = PageProps<{ file: { childMarkdownRemark: Episode } }>

const ArchivePage = ({ data }: ArchivePageProps) => {
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
