import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import List from "../components/Archive/list"
import Episode from "../components/Archive/episode"
import HomeButton from "../components/Archive/homeButton"

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`

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

export const query = graphql`
  query MyQuery($id: String) {
    anchorEpisode(id: { eq: $id }) {
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
`

const Archive = ({ data }) => {
  const episode = data.anchorEpisode

  return (
    <Layout>
      <SEO title={episode.title} />
      <Header>
        <HomeButton />
      </Header>
      <Wrapper>
        <Episode episode={episode} />
        <List />
      </Wrapper>
    </Layout>
  )
}

export default Archive
