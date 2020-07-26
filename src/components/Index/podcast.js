import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useHeadingAnimation } from "../../utils/useHeadingAnimation"
import gsap from "gsap"
import { ScrollScene } from "scrollscene"
import IndexPagePlayer from "./indexPagePlayer"

const Container = styled.div`
  background-color: #0f111a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-direction: column;
  padding: 3em 0;
`

const Heading = styled.h1`
  margin: 0 0 0.25em 0;
  color: #ff5370;
  font-size: 4em;
  font-weight: 800;
  @media (max-width: 750px) {
    font-size: 3em;
  }
  @media (max-width: 400px) {
    font-size: 2em;
  }
  &::after {
    border-top: 2px solid #fff;
    display: block;
    width: 33.3%;
    content: "";
    margin: 8px auto 0;
  }
`

const H3 = styled.h3`
  color: #ff5370;
  padding: 0 30px;

  a {
    color: white;
  }
`

const Podcast = () => {
  const wrapperRef = useRef()
  const playerRef = useRef()
  useHeadingAnimation(wrapperRef)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const caption = wrapper.querySelector("h3")
    const player = playerRef.current

    gsap.set([player, caption], { autoAlpha: 0, scale: 0.95 })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    })
    tl.to([player, caption], { autoAlpha: 1, scale: 1 })

    new ScrollScene({
      triggerElement: wrapper,
      gsap: { timeline: tl },
      offset: wrapper.querySelector("h1").clientHeight,
      triggerHook: 0.5,
      controller: {
        addIndicators: true,
      },
    })
  }, [])

  return (
    <Container ref={wrapperRef}>
      <Heading>Posłuchaj</Heading>
      <IndexPagePlayer ref={playerRef} />
      <H3>
        Więcej odcinków, timestampy, linki i dodatkowe informacje w{" "}
        <a href="/archive">archiwum</a>
      </H3>
    </Container>
  )
}

export default Podcast
