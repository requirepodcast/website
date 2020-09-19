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
  const episode = data.allAnchorEpisode.nodes[0]

  return (
    <Layout>
      <SEO title={episode.title} />
      <Wrapper>
        <List />
        <Episode episode={episode} />
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
query MyQuery($my_guid: String) {
  allAnchorEpisode(filter: {guid: {eq: $my_guid}}) {
    nodes {
      contentSnippet
      title
      pubDate
      link
      guid
      enclosure {
        url
      }
    }
  }
}
`

export default Archive
