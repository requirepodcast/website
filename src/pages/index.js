import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/landing"
import Podcast from "../components/podcast"
import Hosts from "../components/hosts"

const IndexPage = () => (
  <Layout>
    <SEO title="require('podcast');" />
    <Landing />
    <Podcast />
    <Hosts />
  </Layout>
)

export default IndexPage
