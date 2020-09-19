import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Landing from "../components/Index/landing"
import Podcast from "../components/Index/podcast"
import PodcastApp from "../components/Index/podcastApp"

const IndexPage = () => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={siteMetadata.title} />
      <Landing />
      <Podcast />
      <PodcastApp />
    </Layout>
  )
}

export default IndexPage
