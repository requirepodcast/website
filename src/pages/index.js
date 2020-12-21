import React from "react"

import Layout from "../components/layout"

import Landing from "../components/Index/landing"
import Podcast from "../components/Index/podcast"
import Hosts from "../components/Index/hosts"
import Newsletter from "../components/newsletter"

const IndexPage = () => (
  <Layout title="require('podcast')">
    <Newsletter />
    <Landing />
    <Podcast />
    <Hosts />
  </Layout>
)

export default IndexPage
