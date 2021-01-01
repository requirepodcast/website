import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import clsx from "clsx"
import styles from "./episodesList.module.scss"

const EpisodesList = ({ episode: currentEpisode }) => {
  const data = useStaticQuery(graphql`
    query EpisodeList {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: {
          order: ASC
          fields: childMarkdownRemark___frontmatter___publicationDate
        }
      ) {
        nodes {
          id
          childMarkdownRemark {
            frontmatter {
              title
              slug
              shortDescription
              publicationDate
            }
          }
        }
      }
    }
  `)

  const episodes = data.allFile.nodes

  return (
    <aside className={styles.wrapper}>
      <h1 className={styles.heading}>Odcinki</h1>
      <ul className={styles.list}>
        {episodes
          .map((episode, i) => (
            <li
              className={clsx(
                styles.listItem,
                episode.childMarkdownRemark.frontmatter.slug ===
                  currentEpisode.frontmatter.slug && styles.listItemCurrent
              )}
            >
              <p style={{ color: "#ffffff88", margin: 0, fontSize: "0.9em" }}>
                {episode.childMarkdownRemark.frontmatter.publicationDate}
              </p>
              <Link
                className={styles.listItemHeading}
                to={`/archive${episode.childMarkdownRemark.frontmatter.slug}`}
              >
                {episode.childMarkdownRemark.frontmatter.title}
              </Link>
            </li>
          ))
          .reverse()}
      </ul>
    </aside>
  )
}

export default EpisodesList
