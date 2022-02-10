import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import styles from "./hostsSection.module.scss"
import Heading from "../Heading/Heading"

const HostsSection = () => {
  const data = useStaticQuery(graphql`
    query {
      artur: file(relativePath: { eq: "artur.jpg" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      adam: file(relativePath: { eq: "adam.jpg" }) {
        childImageSharp {
          fixed(width: 150, height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <article className={styles.wrapper}>
      <Heading>Prowadzący</Heading>
      <div className={styles.hosts}>
        <section className={styles.host}>
          <Img className={styles.avatar} fixed={data.artur.childImageSharp.fixed} />
          <h3 className={styles.name}>Artur Dudek</h3>
          <OutboundLink className={styles.link} href="mailto:artur@dudek.ga">
            artur@dudek.ga
          </OutboundLink>
          <OutboundLink className={styles.link} href="https://dudek.ga">
            dudek.ga
          </OutboundLink>
        </section>
        <section className={styles.host}>
          <Img className={styles.avatar} fixed={data.adam.childImageSharp.fixed} />
          <h3 className={styles.name}>Adam Siekierski</h3>
          <OutboundLink className={styles.link} href="mailto:a@siekierski.me">
            a@siekierski.me
          </OutboundLink>
          <OutboundLink className={styles.link} href="https://siekierski.me">
            siekierski.me
          </OutboundLink>
        </section>
      </div>
    </article>
  )
}

export default HostsSection
