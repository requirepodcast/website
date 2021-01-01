import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import styles from "./episodeNotes.module.scss"

function getDownloadLink(link) {
  const [uri] = link.split("/").slice(-1)
  return decodeURIComponent(uri)
}

const EpisodeNotes = ({ episode }) => (
  <section className={styles.wrapper}>
    <time style={{ fontSize: "1.2em", color: "#ffffff88" }}>
      {episode.frontmatter.publicationDate}
    </time>
    <h1>{episode.frontmatter.title}</h1>
    <OutboundLink
      className={styles.button}
      href={getDownloadLink(episode.frontmatter.audioUrl)}
      target="_blank"
      download
    >
      Pobierz odcinek{" "}
      <span role="img" aria-label="">
        💾
      </span>
    </OutboundLink>
    <OutboundLink
      className={styles.button}
      href={episode.frontmatter.youtubeUrl}
      target="_blank"
    >
      Odcinek na YouTube{" "}
      <span role="img" aria-label="">
        📺
      </span>
    </OutboundLink>
    <OutboundLink
      className={styles.button}
      href={episode.frontmatter.spotifyUrl}
      target="_blank"
    >
      Przesłuchaj na Spotify{" "}
      <span role="img" aria-label="">
        🎧
      </span>
    </OutboundLink>
    <div
      dangerouslySetInnerHTML={{
        __html: episode.html,
      }}
    />
  </section>
)

export default EpisodeNotes
