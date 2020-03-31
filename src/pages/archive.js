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

  let episodeNumber = episodes.length - 1
  if (location.search.e) {
    const numberParsed = parseInt(location.search.e)

    if (!isNaN(numberParsed) && numberParsed < episodes.number) {
      episodeNumber = numberParsed
    } else {
      window.location.search = ""
    }
  }

  return (
    <Layout>
      <SEO title="require('podcast')" />
      <Wrapper>
        <List episodes={episodes} />
        <Episode episode={episodes[episodeNumber]} />
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

export default withLocation(Player)
