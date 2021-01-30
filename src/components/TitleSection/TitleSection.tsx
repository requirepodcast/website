import { useStaticQuery, graphql } from "gatsby"
import styles from "./titleSection.module.scss"
import { use100vh } from "../../hooks/use100vh"

const TitleSection = () => {
  const height = use100vh()

  const {
    site: { siteMetadata },
  } = useStaticQuery<{ site: { siteMetadata: { description: string } } }>(graphql`
    {
      site {
        siteMetadata {
          description
        }
      }
    }
  `)

  return (
    <section className={styles.wrapper} style={{ height }}>
      <h1 className={styles.title}>Require Podcast</h1>
      <p className={styles.subtitle}>{siteMetadata.description}</p>
    </section>
  )
}

export default TitleSection
