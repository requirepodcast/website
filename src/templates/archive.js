import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import List from "../components/Player/list"
import Episode from "../components/Player/episode"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  padding: 25px;

  @media screen and (max-width: 1200px) {
    height: unset;
    min-height: 100vh;
    flex-direction: column;
  }
`

const Archive = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="require('podcast')" />
      <Wrapper>
        <List episodes={[]} />
        <Episode episode={data.contentfulEpisode} />
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query EpisodeQuery($id: String!) {
    contentfulEpisode(id: { eq: $id }) {
      id
      longDescription {
        childMarkdownRemark {
          html
        }
      }
      shortDescription
      publicationDate
      title
      soundcloudEmbedUrl
    }
  }
`

export default Archive
