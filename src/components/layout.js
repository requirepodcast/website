import React from "react"

import "./layout.css"

import Footer from "./footer"

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

export default Layout
