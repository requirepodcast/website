import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import clsx from "clsx"
import styles from "./episodesList.module.scss"
import { Episode } from "../../types"

type EpisodesListProps = {
  episode: Episode
}

const EpisodesList = ({ episode: currentEpisode }: EpisodesListProps) => {
  const data = useStaticQuery<{
    allFile: {
      nodes: {
        id: string
        childMarkdownRemark: {
          frontmatter: {
            title: string
            slug: string
            shortDescription: string
            publicationDate: string
          }
        }
      }[]
    }
  }>(graphql`
    query EpisodeList {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: { order: DESC, fields: childMarkdownRemark___frontmatter___publicationDate }
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
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={clsx(
              styles.listItem,
              episode.childMarkdownRemark.frontmatter.slug === currentEpisode.frontmatter.slug &&
                styles.listItemCurrent
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
        ))}
      </ul>
    </aside>
  )
}

export default EpisodesList
