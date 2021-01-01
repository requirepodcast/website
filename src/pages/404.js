import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"

import Layout from "../components/Layout/Layout"
import SEO from "../components/SEO/SEO"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: hidden;
`

const NotFoundPage = () => {
  const wrapperRef = useRef()

  useEffect(() => {
    const title = wrapperRef.current.querySelector("h1")
    const caption = wrapperRef.current.querySelector("p")

    gsap.set(title, { y: "-=60vh" })
    gsap.set(caption, { autoAlpha: 0 })
    gsap.set(wrapperRef.current, { visibility: "visible" })

    const tl = gsap.timeline()
    tl.to(title, {
      y: "+=60vh",
      ease: "Bounce.easeOut",
      duration: 1.5,
    }).to(caption, { autoAlpha: 1 })
  }, [wrapperRef])

  return (
    <Layout>
      <SEO title="404 - Not Found" />
      <Wrapper ref={wrapperRef}>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Wrapper>
    </Layout>
  )
}

export default NotFoundPage
