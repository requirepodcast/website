import React from "react"

import Footer from "../Footer/Footer"
import SEO from "../SEO/SEO"
import "../../styles/global.scss"

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
