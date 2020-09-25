import React from "react"

import "./layout.css"

import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
