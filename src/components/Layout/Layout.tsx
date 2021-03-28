import React, { useEffect } from "react"
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
  useEffect(() => {
    const date = new Date()

    if (date.getDate() === 1 && date.getMonth() === 3) {
      document.body.style.fontFamily = '"Comic Sans MS", "Comic Sans", cursive'
    }
  }, [])

  return (
    <>
      <SEO {...seo} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
