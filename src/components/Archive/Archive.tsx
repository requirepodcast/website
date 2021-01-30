import styles from "./archive.module.scss"
import EpisodesList from "../EpisodeList/EpisodesList"
import Player from "../Player/Player"
import EpisodeNotes from "../EpisodeNotes/EpisodeNotes"

const Archive = ({ episode }) => (
  <main className={styles.wrapper}>
    <EpisodesList episode={episode} />
    <section className={styles.episode}>
      <div className={styles.playerWrapper}>
        <Player
          url={episode.frontmatter.audioUrl}
          slug={episode.frontmatter.slug}
          title={episode.frontmatter.title}
        />
      </div>
      <EpisodeNotes episode={episode} />
    </section>
  </main>
)

export default Archive
