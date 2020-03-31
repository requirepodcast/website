import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useHeadingAnimation } from "../../utils/useHeadingAnimation"
import gsap from "gsap"
import { ScrollScene } from "scrollscene"

const Container = styled.div`
  background-color: #0f111a;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-direction: column;
  padding: 3em 0;
`

const Player = styled.iframe`
  height: 450;
  max-width: 800px;
  width: 90%;
  margin: 3em auto;
  border: none;
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

const Podcast = () => {
  const wrapperRef = useRef()
  useHeadingAnimation(wrapperRef)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const player = wrapper.querySelector("iframe")

    gsap.set(player, { autoAlpha: 0, scale: 0.95 })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    })
    tl.to(player, { autoAlpha: 1, scale: 1 })

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
      <Player
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/790825027&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
      ></Player>
    </Container>
  )
}

export default Podcast
