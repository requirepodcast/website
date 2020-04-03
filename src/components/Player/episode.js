import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  background-color: #181a25;
  height: 100%;
  overflow-y: auto;
  padding: 25px;

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

const Player = styled.iframe`
  border: none;
  width: 100%;
  margin-bottom: 2em;
`

const Episode = ({ episode }) => (
  <Wrapper>
    <Player src={episode.soundcloudEmbedUrl} />
    <span style={{ fontSize: "1.2em", color: "#ffffff88" }}>
      {episode.publicationDate}
    </span>
    <div
      dangerouslySetInnerHTML={{
        __html: episode.longDescription.childMarkdownRemark.html,
      }}
    ></div>
  </Wrapper>
)

export default Episode
