import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/Index/landing"
import Podcast from "../components/Index/podcast"
import Hosts from "../components/Index/hosts"
import PodcastApp from "../components/Index/podcastApp"

const IndexPage = () => (
  <Layout>
    <SEO title="require('podcast');" />
    <Landing />
    <Podcast />
    <Hosts />
    <PodcastApp />
  </Layout>
)

export default IndexPage
