import React from "react"

import Layout from "../components/Layout/Layout"

import TitleSection from "../components/TitleSection/TitleSection"
import PodcastSection from "../components/PodcastSection/PodcastSection"
import HostsSection from "../components/HostsSection/HostsSection"
import NewsletterDialog from "../components/NewsletterDialog/NewsletterDialog"

const IndexPage = () => (
  <Layout
    title="require('podcast')"
    meta={[
      { name: "robots", content: "index, follow" },
      { name: "googlebot", content: "index, follow" },
    ]}
  >
    <NewsletterDialog />
    <TitleSection />
    <PodcastSection />
    <HostsSection />
  </Layout>
)

export default IndexPage
