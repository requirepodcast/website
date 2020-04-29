import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import List from "../components/Archive/list"
import Episode from "../components/Archive/episode"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 25px;

  @media screen and (max-width: 1200px) {
    height: unset;
    min-height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  @media screen and (max-width: 800px) {
    padding: 0;
  }
`

const Archive = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.contentfulEpisode.title} />
      <Wrapper>
        <List />
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
      audioUrl
    }
  }
`

export default Archive
