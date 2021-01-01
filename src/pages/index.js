import React from "react"

import Layout from "../components/Layout/Layout"

import Landing from "../components/Index/Landing"
import Podcast from "../components/Index/Podcast"
import Hosts from "../components/Hosts/Hosts"
import Newsletter from "../components/Newsletter/Newsletter"

const IndexPage = () => (
  <Layout title="require('podcast')">
    <Newsletter />
    <Landing />
    <Podcast />
    <Hosts />
  </Layout>
)

export default IndexPage
