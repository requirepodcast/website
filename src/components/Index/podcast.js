import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { useHeadingAnimation } from "../../utils/useHeadingAnimation"
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

const H4 = styled.h4`
  color: #ff5370;
  padding: 0 30px;

  a {
    color: purple;
  }
`

const Podcast = () => {
  const wrapperRef = useRef()
  const playerRef = useRef()
  useHeadingAnimation(wrapperRef)

  useEffect(() => {
    const wrapper = wrapperRef.current
  }, [])

  return (
    <Container ref={wrapperRef}>
      <Heading>Radio</Heading>
      <H4>
        SIARAN LANGSUNG:
      </H4>
      <IndexPagePlayer ref={playerRef} />
      <H3>
        Untuk audio kajian sebelumnya, bisa klik {" "}
        <a href="/archive">disini</a>
      </H3>
    </Container>
  )
}

export default Podcast
