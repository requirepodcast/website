import React, { HTMLProps, useState } from "react"
import Player from "../Player/Player"
import { useStaticQuery, graphql } from "gatsby"
import Ticker from "react-ticker"
import styles from "./homePagePlayer.module.scss"

const HomePagePlayer = (props: HTMLProps<HTMLDivElement>) => {
  const [playing, setPlaying] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)

  const data = useStaticQuery(graphql`
    query IndexPageQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___publicationDate }, limit: 1) {
        nodes {
          frontmatter {
            title
            audioUrl
            shortDescription
            slug
          }
        }
      }
    }
  `)

  const { title, shortDescription, audioUrl, slug } = data.allMdx.nodes[0].frontmatter

  return (
    <section className={styles.wrapper} {...props}>
      <div
        className={styles.info}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <h3 className={styles.title}>{title}</h3>
        <Ticker speed={10} mode="await" move={playing || mouseOver}>
          {() => <p className={styles.marqueeContent}>{shortDescription}</p>}
        </Ticker>
      </div>
      <Player
        url={audioUrl}
        title={title}
        slug={slug}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
    </section>
  )
}

export default HomePagePlayer
