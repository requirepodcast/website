import React, { useRef } from "react"
import styled from "styled-components"
import { useHeadingAnimation } from "../../utils/useHeadingAnimation"

const Heading = styled.h1`
  margin: 0 0 0.25em 0;
  color: #00BFFF;
  font-size: 4em;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1em;

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

const Container = styled.div`
  background-color: #0f111a;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #00BFFF;
  padding: 10px 20px;
  margin: 1em auto;
  transition: opacity 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  color: white;

  :hover {
    opacity: 0.8;
  }
`

const PodcastApp = () => {
  const wrapperRef = useRef()
  useHeadingAnimation(wrapperRef)

  return (
    <Container ref={wrapperRef}>
      <Heading>Unduh Aplikasi</Heading>
      <Wrapper>
        <p>
          Untuk mendengar kajian langsung melalui aplikasi Radio Islami, klik disini!
        </p>
        <DownloadButton href="https://play.google.com/store/apps/details?id=com.radioislami.hanifcamp">Unduh</DownloadButton>
      </Wrapper>
    </Container>
  )
}

export default PodcastApp
