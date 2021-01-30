import React from "react"
import { ReactNode } from "react"

import Footer from "../Footer/Footer"
import SEO from "../SEO/SEO"
import "../../styles/global.scss"

type LayoutProps = {
  children: ReactNode
  title: string
  description?: string
  lang?: string
  meta?: React.DetailedHTMLProps<React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>[]
}

const Layout = ({ children, ...seo }: LayoutProps) => {
  return (
    <>
      <SEO {...seo} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
