import React from "react"
import styled from "styled-components"

const Container = styled.footer`
  background-color: #141621;
  padding: 2em 6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 1em 2em;
  }
`

const Link = styled.a`
  color: #ffffff88;
  font-size: 1em;
  text-decoration: none;
  display: block;
  font-weight: 100;
  &:hover {
    color: #ffffff;
  }
`

const Text = styled.p`
  color: #ffffff88;
  font-size: 1em;
  font-weight: 100;
  text-align: right;
  display: block;
  margin: 1em 0;

  @media (max-width: 700px) {
    text-align: center;
  }

  &:before {
    border-top: 2px solid #00BFFF;
    display: block;
    width: 100%;
    content: "";
    margin: 0 auto 1em;
  }
`

const Links = styled.div`
  text-align: left;
  margin: 1em 0;

  @media (max-width: 700px) {
    text-align: center;
  }

  &:before {
    border-top: 2px solid #00BFFF;
    display: block;
    width: 100%;
    content: "";
    margin: 0 auto 1em;
    text-align: center;
  }
`

const Footer = () => (
  <Container>
    <Links>
      <Link href="http://salafybpp.com">Info Ma'had</Link>
      <Link href="https://www.youtube.com/channel/UCb2N_NeM9B8DqiePrsYAmWg">
        YouTube
      </Link>
      <Link href="https://anchor.fm/nasir-bilal">Podcast</Link>
      <Link href="https://t.me/AudioThalabIlmuSyar_i">Telegram</Link>
      
    </Links>
    <Text>
      Copyright © {new Date().getFullYear()} Ma'had Ibnul Qoyyim
      <br />
      Kontak: salafybpp@gmail.com
    </Text>
  </Container>
)

export default Footer
