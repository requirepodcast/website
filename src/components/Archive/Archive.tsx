import React, { useMemo } from "react"
import { MDXProvider } from "@mdx-js/react"
import styles from "./archive.module.scss"
import EpisodesList from "../EpisodeList/EpisodesList"
import Player from "../Player/Player"
import EpisodeNotes from "../EpisodeNotes/EpisodeNotes"
import { usePlayerState } from "../../hooks/usePlayerState"
import timestampLink from "../MDXComponents/TimestampLink"
import Link from "../MDXComponents/Link"

const Archive = ({ episode }) => {
  const playerState = usePlayerState({ title: episode.title, slug: episode.slug })

  const components = useMemo(() => ({ TimestampLink: timestampLink(playerState.seekTo), Link }), [
    playerState.seekTo,
  ])

  return (
    <main className={styles.wrapper}>
      <EpisodesList episode={episode} />
      <section className={styles.episode}>
        <div className={styles.playerWrapper}>
          <Player playerState={playerState} url={episode.frontmatter.audioUrl} />
        </div>
        <MDXProvider components={components}>
          <EpisodeNotes episode={episode} />
        </MDXProvider>
      </section>
    </main>
  )
}

export default Archive
