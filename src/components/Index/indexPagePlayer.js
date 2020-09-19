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
  const [mouseOver, setMouseOver] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      allAnchorEpisode {
      nodes {
        contentSnippet
        title
        link
      }
    }
  }
  `)

  const {
    title,
    contentSnippet,
    link,
  } = data.allAnchorEpisode.nodes[0]

  return (
    <Wrapper {...props} ref={ref}>
      <EpisodeInfo
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <H4>{title}</H4>
        <Ticker speed={10} mode="await" move={playing || mouseOver}>
          {() => <MarqueeContent>{contentSnippet}</MarqueeContent>}
        </Ticker>
      </EpisodeInfo>
      <Player
        url={link}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </Wrapper>
  )
})

export default IndexPagePlayer
