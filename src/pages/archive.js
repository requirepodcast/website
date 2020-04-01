import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Router } from "@reach/router"

import SEO from "../components/seo"
import Layout from "../components/layout"
import List from "../components/Player/list"
import Episode from "../components/Player/episode"

import { titleUrlParser } from "../utils/titleUrlParser"

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

const Player = ({ data }) => {
  const episodes = data.allContentfulEpisode.nodes

  console.log(encodeURI(titleUrlParser(episodes[1].title)))

  return (
    <Layout>
      <SEO title="require('podcast')" />
      <Wrapper>
        <List episodes={episodes} />
        <Router basepath="/archive" style={{ flexGrow: 1 }}>
          <Episode episode={episodes[episodes.length - 1]} path="/" />
          {episodes.map((episode, i) => (
            <Episode
              episode={episode}
              path={`/${i}/${titleUrlParser(episode.title)}`}
              key={i}
            />
          ))}
        </Router>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query EpisodesQuery {
    allContentfulEpisode(sort: { order: ASC, fields: publicationDate }) {
      nodes {
        longDescription {
          childMarkdownRemark {
            html
          }
        }
        shortDescription
        publicationDate
        title
        id
        soundcloudEmbedUrl
      }
    }
  }
`

export default Player
