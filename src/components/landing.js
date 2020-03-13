import React from "react"
import styled, { keyframes } from "styled-components"

import background from "../images/background.png"

const bounce = keyframes`
	50% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0);
  }
`

const Title = styled.h1`
  margin: 0 0 0.25em 0;
  color: #ff5370;
  font-size: 5em;
  font-weight: 800;
  @media (max-width: 750px) {
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
  /* background-size: cover; */
  background-position: center;
  background-size: contain;
  flex-direction: column;
  &::before {
    content: "╲╱";
    font-family: Arial;
    color: #fff;
    position: absolute;
    opacity: 0.8;
    text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    width: 6rem;
    font-size: 2rem;
    height: 4rem;
    line-height: 4rem;
    text-align: center;
    bottom: 2rem;
    margin-left: -3rem;
    left: 50%;
    animation: ${bounce} 1s ease infinite;
    @media (max-height: 550px) {
      display: none;
    }
  }
`

const Subtitle = styled.h2`
  color: #fff;
  font-size: 1.5em;
  font-weight: 400;
  max-width: 800px;
  margin: 0px auto;
  text-align: center;
  padding: 0 2em;
  @media (max-width: 750px) {
    font-size: 1em;
  }
`

const Landing = () => {
  return (
    <Container>
      <Title>The Require Podcast</Title>
      <Subtitle>
        Przemyślenia dwójki programistów - Adama i Artura - na temat nowości i
        wydarzeń w świecie frontendu, backendu i nie tylko.
      </Subtitle>
    </Container>
  )
}

export default Landing
