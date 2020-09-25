import React, { useRef } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { FaMicrophoneAlt } from "react-icons/fa"

import IndexPagePlayer from "./indexPagePlayer"

const Mic = styled(FaMicrophoneAlt)`
  margin: 1em 0 0.25em 0;
  color: #00bfff;
  font-size: 8em;
  font-weight: 800;
  @media (max-width: 750px) {
    font-size: 6em;
  }
  @media (max-width: 400px) {
    font-size: 5em;
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-direction: column;
  }
`

const Body = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: top;
  position: relative;
  text-align: center;
  flex-direction: column;
  }
`

const Title = styled.h1`
  margin: 0 0 0.25em 0;
  color: #00bfff;
  font-family: Sofia;
  font-size: 5em;
  font-weight: 800;

  @media (max-width: 750px) {
    font-size: 4em;
  }
  @media (max-width: 400px) {
    font-size: 3em;
  }
`

const Subtitle = styled.h2`
  color: #fff;
  font-size: 1.5em;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2em;
  @media (max-width: 750px) {
    font-size: 1em;
  }
`

const H3 = styled.h3`
  color: #00bfff;
  padding: 0 30px;

  a {
    color: white;
    text-decoration: none;
  }
`

const H4 = styled.h4`
  color: #00bfff;
  padding: 0 30px;
`

export default function Landing() {
  const playerRef = useRef()
  const {
    site: { siteMetadata },
    file: { childImageSharp },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Body>
      <Header>
        <Mic />
        <Title>{siteMetadata.title}</Title>
        <Subtitle>{siteMetadata.description}</Subtitle>
      </Header>
      <H4>SIARAN LANGSUNG</H4>
      <IndexPagePlayer ref={playerRef} />
      <H3>
        Untuk audio kajian sebelumnya, bisa klik <a href="/archive">disini</a>
      </H3>
    </Body>
  )
}
