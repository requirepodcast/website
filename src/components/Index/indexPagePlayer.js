import React, { forwardRef, useState } from "react"
import styled from "styled-components"
import Player from "../Player/player"
import { useStaticQuery, graphql } from "gatsby"
import Ticker from "react-ticker"

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1d1f2d;
  margin: 1em auto;
`

const EpisodeInfo = styled.div`
  width: 100%;
  padding: 20px 20px 5px 20px;
  border-bottom: 1px solid #141621;
  text-align: left;

  .ticker {
    margin: 5px 0;
    height: 20px !important;
  }
`

const H4 = styled.h4`
  margin: 0;
`

const MarqueeContent = styled.p`
  white-space: nowrap;
  margin: 0;
  color: #bbbbbb;
`

const IndexPagePlayer = forwardRef((props, ref) => {
  const [playing, setPlaying] = useState(false)

  const data = useStaticQuery(graphql`
    query IndexPageEpisodeQuery {
      allContentfulEpisode(
        sort: { fields: publicationDate, order: DESC }
        limit: 1
      ) {
        nodes {
          title
          shortDescription
          audioUrl
        }
      }
    }
  `)

  const {
    title,
    shortDescription,
    audioUrl,
  } = data.allContentfulEpisode.nodes[0]

  return (
    <Wrapper {...props} ref={ref}>
      <EpisodeInfo>
        <H4>{title}</H4>
        <Ticker speed={10} mode="await" move={playing}>
          {() => <MarqueeContent>{shortDescription}</MarqueeContent>}
        </Ticker>
      </EpisodeInfo>
      <Player
        url={audioUrl}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </Wrapper>
  )
})

export default IndexPagePlayer
