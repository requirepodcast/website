import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./titleSection.module.scss"

const TitleSection = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Require Podcast</h1>
      <p className={styles.subtitle}>{siteMetadata.description}</p>
    </section>
  )
}

export default TitleSection
