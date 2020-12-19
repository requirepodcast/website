import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/Index/landing"
import Podcast from "../components/Index/podcast"
import Hosts from "../components/Index/hosts"
import Newsletter from "../components/newsletter"

const IndexPage = () => (
  <Layout>
    <Newsletter />
    <SEO title="require('podcast');" />
    <Landing />
    <Podcast />
    <Hosts />
  </Layout>
)

export default IndexPage
