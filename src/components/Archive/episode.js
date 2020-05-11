import React from "react"
import styled from "styled-components"
import Player from "../Player/player"

const Wrapper = styled.div`
  background-color: #181a25;
  height: 100%;
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;

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
  flex: 1;
  overflow-y: auto;
`

const EpisodeActionButton = styled.a`
  background-color: #2e2f3e;
  color: white;
  font-size: 1em;
  font-family: inherit;
  margin: 16px 10px 0 0;
  padding: 5px 15px;
  cursor: pointer;
  display: inline-block;
  height: 31px;
  vertical-align: top;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: #3f3f4f;
  }
`

const Episode = ({ episode }) => (
  <Wrapper>
    <Player url={episode.audioUrl} />
    <ContentConatiner>
      <span style={{ fontSize: "1.2em", color: "#ffffff88" }}>
        {episode.publicationDate}
      </span>
      <h1>{episode.title}</h1>
      <EpisodeActionButton href={episode.audioUrl} download>
        Pobierz odcinek{" "}
        <span role="img" aria-label="download icon">
          💾
        </span>
      </EpisodeActionButton>
      <EpisodeActionButton href={episode.youtubeUrl}>
        Odcinek na YouTube{" "}
        <span role="img" aria-label="download icon">
          📹
        </span>
      </EpisodeActionButton>
      <div
        dangerouslySetInnerHTML={{
          __html: episode.longDescription.childMarkdownRemark.html,
        }}
      />
    </ContentConatiner>
  </Wrapper>
)

export default Episode
