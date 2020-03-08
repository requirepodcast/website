import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #0f111a;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-direction: column;
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
  return (
    <Container>
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
