import React from "react"
import styled from "styled-components"
import { OutboundLink } from "gatsby-plugin-google-gtag"

const Wrapper = styled(OutboundLink)`
  display: block;
  text-decoration: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 20px;
  background-color: #1d1f2d;
  color: white;
  z-index: 10;
  transition: 0.3s ease;
  max-width: 400px;

  :hover,
  :focus {
    box-shadow: 0px 0px 0px 3px #ff5370;
  }

  @media (max-width: 700px) {
    display: none;
  }
`

const RedText = styled.span`
  color: #ff5370;
`

const Newsletter = () => (
  <Wrapper
    href="https://letter.podcast.gq"
    role="dialog"
    aria-label="Link do newsletter'a"
    aria-modal="false"
  >
    Zapisz się do <RedText>require('letter')</RedText> - newslettera prosto od
    Require Podcast ✉️
  </Wrapper>
)

export default Newsletter
