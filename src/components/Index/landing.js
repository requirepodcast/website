import React, { useRef } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import IndexPagePlayer from "./indexPagePlayer"

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

const Container = styled.header`
  background-color: #0f111a;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  background-position: center;
  background-size: contain;
  flex-direction: column;

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
  }
`

const H4 = styled.h4`
  color: #00bfff;
  padding: 0 30px;
`

const Landing = () => {
  const playerRef = useRef()
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          title
        }
      }
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt="A logo shaped like a microphone"
      />
      <Title>{data.site.siteMetadata.title}</Title>
      <Subtitle>{data.site.siteMetadata.description}</Subtitle>
      <H4>SIARAN LANGSUNG</H4>
      <IndexPagePlayer ref={playerRef} />
      <H3>
        Untuk audio kajian sebelumnya, bisa klik <a href="/archive">disini</a>
      </H3>
    </Container>
  )
}

export default Landing
