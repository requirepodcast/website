import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Landing from "../components/landing"
import Podcast from "../components/podcast"
import Hosts from "../components/hosts"

import logo from "../images/logo.png"

const IndexPage = () => (
  <Layout>
    <SEO title="require('podcast');" ogImage={logo} />
    <Landing />
    <Podcast />
    <Hosts />
  </Layout>
)

export default IndexPage
