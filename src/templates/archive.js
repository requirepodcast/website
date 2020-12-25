import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import List from "../components/Archive/list"
import EpisodeNotes from "../components/Archive/episodeNotes"
import Player from "../components/Player/player"
import { PlayerWrapper } from "../components/Player/player.styles"

const Wrapper = styled.main`
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

const Episode = styled.article`
  height: 100%;
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
  }

  ul,
  ol {
    p {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    h1 {
      font-size: 1.4em;
    }
  }

  ${PlayerWrapper} {
    @media screen and (max-width: 800px) {
      position: fixed;
      bottom: 0;
      z-index: 1;
    }
  }
`

const Archive = ({ data }) => {
  const episode = data.file.childMarkdownRemark

  return (
    <Layout title={episode.frontmatter.title}>
      <Wrapper>
        <List episode={episode} />
        <Episode>
          <Player
            url={episode.frontmatter.audioUrl}
            slug={episode.frontmatter.slug}
            title={episode.frontmatter.title}
          />
          <EpisodeNotes episode={episode} />
        </Episode>
      </Wrapper>
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

export default Archive
