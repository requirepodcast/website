import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useHeadingAnimation } from "../../utils/useHeadingAnimation"
import gsap from "gsap"
import { ScrollScene } from "scrollscene"

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

const Wrapper = styled.div`
  margin-top: 3em;
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`

const Person = styled.div`
  display: inline-block;
  padding: 3em;
  &:last-child {
    border-left: 1px solid #ffffff33;
    @media (max-width: 550px) {
      border-left: none;
      border-top: 1px solid #ffffff33;
    }
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  height: 8em;
`

const Name = styled.h2`
  color: #fff;
  font-size: 1em;
  font-weight: 400;
  margin: 1em 0;
  text-align: center;
`

const Link = styled.a`
  color: #ff5370;
  font-size: 0.75em;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5em;
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

const Hosts = () => {
  const wrapperRef = useRef()
  const hostsRef = useRef()
  useHeadingAnimation(wrapperRef)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const hosts = hostsRef.current

    gsap.set(hosts, { autoAlpha: 0, scale: 0.95 })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    })
    tl.to(hosts, { autoAlpha: 1, scale: 1 })

    new ScrollScene({
      triggerElement: wrapper,
      gsap: { timeline: tl },
      offset: wrapper.querySelector("h1").clientHeight,
      triggerHook: 0.5,
    })
  }, [])

  return (
    <Container ref={wrapperRef}>
      <Heading>Prowadzący</Heading>
      <Wrapper ref={hostsRef}>
        <Person>
          <Avatar src="https://lh3.googleusercontent.com/91rA7nuK8toYIHgfqh-9M4eucalemHK4XCtpSmGbAEgZuJqw48JOp-2MClsOsLmTy2TJ89PsU-X25o1b" />
          <Name>Artur Dudek</Name>
          <Link href="mailto:artur@dudek.ga">artur@dudek.ga</Link>
          <Link href="https://twitter.com/arturdudek_">@arturdudek_</Link>
        </Person>
        <Person>
          <Avatar src="https://gravatar.com/avatar/74a5ec816e9fd6b196d1dc8ae4ae6115?s=500" />
          <Name>Adam Siekierski</Name>
          <Link href="mailto:a@siekierski.ml">a@siekierski.ml</Link>
          <Link href="https://twitter.com/a_siekierski">@a_siekierski</Link>
        </Person>
      </Wrapper>
    </Container>
  )
}

export default Hosts
