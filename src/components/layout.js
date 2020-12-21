import React from "react"

import Footer from "./Footer/footer"
import SEO from "./seo"
import "./layout.css"

const Layout = ({ children, title }) => {
  return (
    <>
      <SEO title={title} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
