import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/landing"
import Podcast from "../components/podcast"

const IndexPage = () => (
  <Layout>
    <SEO title="home" />
    <Landing />
    <Podcast />
  </Layout>
)

export default IndexPage
