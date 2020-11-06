import React from "react"
import styled from "styled-components"

const ContentConatiner = styled.div`
  padding: 25px;
  flex: 1;
  overflow-y: auto;
  background-color: #181a25;
`

const EpisodeActionButton = styled.a`
  background-color: #2e2f3e;
  color: white;
  font-size: 1em;
  font-family: inherit;
  margin: 16px 10px 0 0;
  padding: 5px 15px;
  cursor: pointer;
  vertical-align: center;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: #3f3f4f;
  }
`

function getDownloadLink(link) {
  const [uri] = link.split("/").slice(-1)
  return decodeURIComponent(uri)
}

const EpisodeNotes = ({ episode }) => (
  <ContentConatiner>
      <span style={{ fontSize: "1.2em", color: "#ffffff88" }}>
        {episode.frontmatter.publicationDate}
      </span>
    <h1>{episode.frontmatter.title}</h1>
    <EpisodeActionButton
      href={getDownloadLink(episode.frontmatter.audioUrl)}
      download="download"
    >
      Pobierz odcinek{" "}
      <span role="img" aria-label="download icon">
          💾
        </span>
    </EpisodeActionButton>
    <EpisodeActionButton href={episode.frontmatter.youtubeUrl}>
      Odcinek na YouTube{" "}
      <span role="img" aria-label="download icon">
          📺
        </span>
    </EpisodeActionButton>
    <EpisodeActionButton href={episode.frontmatter.spotifyUrl}>
      Przesłuchaj na Spotify{" "}
      <span role="img" aria-label="download icon">
          🎧
        </span>
    </EpisodeActionButton>
    <div
      dangerouslySetInnerHTML={{
        __html: episode.html,
      }}
    />
  </ContentConatiner>
)

export default EpisodeNotes
