import React from "react"
import HomePagePlayer from "../HomePagePlayer/HomePagePlayer"
import { Link } from "gatsby"
import Heading from "../Heading/Heading"
import styles from "./podcastSection.module.scss"

const PodcastSection = () => (
  <section className={styles.wrapper}>
    <Heading>Posłuchaj</Heading>
    <HomePagePlayer />
    <h3 className={styles.archiveRedirect}>
      Więcej odcinków, timestampy, linki i dodatkowe informacje w{" "}
      <Link to="/archive">archiwum</Link>
    </h3>
  </section>
)

export default PodcastSection
