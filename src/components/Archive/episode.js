import React from "react"
import styled from "styled-components"
import Player from "../Player/player"
import { FaDownload } from "react-icons/fa"

const Wrapper = styled.article`
  background-color: #181a25;
  height: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0;
    text-align: center;
  }

  a {
    color: white;
  }

  ol {
    p {
      margin: 0;
    }
  }
`

const ContentContainer = styled.div`
  padding: 25px;
  flex: 1;
  flex-direction: row;
  overflow-y: auto;
`

const EpisodeActionButton = styled.a`
  color: white;
  font-size: 1em;
  text-decoration: none;

  &:hover {
    color: #00bfff;
  }
`

function getDownloadLink(link) {
  const [uri] = link.split("/").slice(-1)
  return decodeURIComponent(uri)
}

export default function Episode({ episode }) {
  return (
    <Wrapper>
      <ContentContainer>
        <h1>
          {episode.title}{" "}
          <EpisodeActionButton
            href={getDownloadLink(episode.enclosure.url)}
            download="download"
          >
            <FaDownload />
          </EpisodeActionButton>
        </h1>
      </ContentContainer>
      <Player url={episode.enclosure.url} />
    </Wrapper>
  )
}
