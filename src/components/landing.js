import React from "react"
import styled from "styled-components"

import background from "../images/background.png"

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
  background-color: #ff2c93;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
`

const Landing = () => {
  return (
    <Container>
      <Title>The Require Podcast</Title>
    </Container>
  )
}

export default Landing
