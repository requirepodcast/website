import React from "react"
import styled, { keyframes } from "styled-components"

import background from "../images/background.png"

const bounce = keyframes`
	0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
	}
`

const Title = styled.h1`
  margin: 0.25em;
  color: #ff5370;
  font-size: 5em;
  font-weight: 800;
  @media (max-width: 500px) {
    font-size: 4em;
  }
  @media (max-width: 400px) {
    font-size: 3em;
  }
`

const Container = styled.div`
  background-color: #0f111a;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  flex-direction: column;
`

const Subtitle = styled.h2`
  color: #fff;
  font-size: 3em;
  font-weight: 400;
  margin: 0;
  @media (max-width: 500px) {
    font-size: 3em;
  }
`

const Arrow = styled.span`
  margin: 0 1em;
  animation: 2s ${bounce} infinite;
  display: inline-block;
`

const Landing = () => {
  return (
    <Container>
      <Title>The Require Podcast</Title>
      <Subtitle>
        <Arrow>⯆</Arrow>
        tune in
        <Arrow>⯆</Arrow>
      </Subtitle>
    </Container>
  )
}

export default Landing
