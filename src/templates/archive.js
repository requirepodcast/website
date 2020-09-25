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
  justify-content: center;
  padding: 10px;
`

const Wrapper = styled.div`
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
`

export const query = graphql`
  query MyQuery($id: String) {
    anchorEpisode(id: { eq: $id }) {
      contentSnippet
      title
      pubDate
      isoDate(formatString: "DD MMM YYYY")
      link
      id
      enclosure {
        url
      }
    }
  }
`

export default function Archive({ data }) {
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
