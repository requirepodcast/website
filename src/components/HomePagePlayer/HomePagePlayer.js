import React, { forwardRef, useState } from "react"
import Player from "../Player/Player"
import { useStaticQuery, graphql } from "gatsby"
import Ticker from "react-ticker"
import styles from "./homePagePlayer.module.scss"

const HomePagePlayer = forwardRef((props, ref) => {
  const [playing, setPlaying] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)

  const data = useStaticQuery(graphql`
    query IndexPageQuery {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: {
          order: DESC
          fields: childMarkdownRemark___frontmatter___publicationDate
        }
        limit: 1
      ) {
        nodes {
          childMarkdownRemark {
            frontmatter {
              title
              audioUrl
              shortDescription
              slug
            }
          }
        }
      }
    }
  `)

  const {
    title,
    shortDescription,
    audioUrl,
    slug,
  } = data.allFile.nodes[0].childMarkdownRemark.frontmatter

  return (
    <section className={styles.wrapper} {...props} ref={ref}>
      <div
        className={styles.info}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
      >
        <h4 className={styles.title}>{title}</h4>
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
})

export default HomePagePlayer
