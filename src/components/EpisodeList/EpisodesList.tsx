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
    allMdx: {
      nodes: {
        id: string
        frontmatter: {
          title: string
          slug: string
          shortDescription: string
          publicationDate: string
          dimmed?: boolean
        }
      }[]
    }
  }>(graphql`
    query EpisodeList {
      allMdx(sort: { order: DESC, fields: frontmatter___publicationDate }) {
        nodes {
          id
          frontmatter {
            title
            slug
            shortDescription
            publicationDate
            dimmed
          }
        }
      }
    }
  `)

  const episodes = data.allMdx.nodes

  return (
    <aside className={styles.wrapper}>
      <h1 className={styles.heading}>Odcinki</h1>
      <ul className={styles.list}>
        {episodes.map((episode) => (
          <li
            key={episode.id}
            className={clsx(
              styles.listItem,
              episode.frontmatter.slug === currentEpisode.frontmatter.slug &&
                styles.listItemCurrent,
              episode.frontmatter.dimmed && styles.listItemDimmed
            )}
          >
            <p style={{ color: "#ffffff88", margin: 0, fontSize: "0.9em" }}>
              {episode.frontmatter.publicationDate}
            </p>
            <Link className={styles.listItemHeading} to={`/archive${episode.frontmatter.slug}`}>
              {episode.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default EpisodesList
