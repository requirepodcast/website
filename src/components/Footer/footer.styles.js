import styled from "styled-components"
import { OutboundLink } from "gatsby-plugin-google-gtag"

export const Container = styled.footer`
  background-color: #141621;
  padding: 2em 6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 25px 25px 125px 25px;
  }
`

export const Link = styled(OutboundLink)`
  color: #ffffff88;
  font-size: 1em;
  text-decoration: none;
  display: block;
  font-weight: 100;
  &:hover {
    color: #ffffff;
  }
`

export const Text = styled.div`
  color: #ffffff88;
  font-size: 1em;
  font-weight: 100;
  text-align: right;
  margin: 1em 0;

  @media (max-width: 700px) {
    text-align: center;
  }

  p {
    margin: 0;
  }

  &:before {
    border-top: 2px solid #ff5370;
    display: block;
    width: 100%;
    content: "";
    margin: 0 auto 1em;
  }
`

export const Links = styled.div`
  text-align: left;
  margin: 1em 0;

  @media (max-width: 700px) {
    text-align: center;
  }

  &:before {
    border-top: 2px solid #ff5370;
    display: block;
    width: 100%;
    content: "";
    margin: 0 auto 1em;
    text-align: center;
  }
`
