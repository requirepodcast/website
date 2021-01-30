import { ReactNode } from "react"

import Footer from "../Footer/Footer"
import SEO from "../SEO/SEO"
import "../../styles/global.scss"

type LayoutProps = {
  children: ReactNode
  title: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <SEO title={title} />
      {children}
      <Footer />
    </>
  )
}

export default Layout
