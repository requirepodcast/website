import React from "react"
import styled from "styled-components"
import Player from "./player"

const Wrapper = styled.div`
  background-color: #181a25;
  height: 100%;
  overflow-y: auto;
  max-width: 1200px;
  width: 100%;

  h1 {
    margin: 0;
  }

  a {
    color: white;
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
`

const ContentConatiner = styled.div`
  padding: 25px;
`

const Episode = ({ episode }) => (
  <Wrapper>
    <Player url={episode.audioUrl} />
    <ContentConatiner>
      <span style={{ fontSize: "1.2em", color: "#ffffff88" }}>
        {episode.publicationDate}
      </span>
      <div
        dangerouslySetInnerHTML={{
          __html: episode.longDescription.childMarkdownRemark.html,
        }}
      />
    </ContentConatiner>
  </Wrapper>
)

export default Episode
