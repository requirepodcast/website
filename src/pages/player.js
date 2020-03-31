import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import List from "../components/Player/list"
import Episode from "../components/Player/episode"

import withLocation from "../utils/withLocation"

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  padding: 25px;
`

const Player = ({ data, location }) => {
  const episodes = data.allContentfulEpisode.nodes

  let episodeNumber = parseInt(location.search.e) || 0
  if (episodeNumber > episodes.length) {
    episodeNumber = 0
  }

  return (
    <Layout>
      <SEO title="require('podcast')" />
      <Wrapper>
        <List episodes={episodes.reverse()} />
        <Episode episode={episodes[episodeNumber]} />
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query EpisodesQuery {
    allContentfulEpisode {
      nodes {
        longDescription {
          childMarkdownRemark {
            html
          }
        }
        title
        publicationDate
        shortDescription
        soundcloudEmbedUrl
        id
      }
    }
  }
`

export default withLocation(Player)
