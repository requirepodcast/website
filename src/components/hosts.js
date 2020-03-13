import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #0f111a;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  flex-direction: column;
  padding: 3em 0;
`

const Wrapper = styled.div`
  margin-top: 3em;
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`

const Person = styled.div`
  display: inline-block;
  width: 10em;
  padding: 3em;
  &:last-child {
    border-left: 1px solid #ffffff33;
    @media (max-width: 550px) {
      border-left: none;
    }
  }
`

const Avatar = styled.img`
  border-radius: 50%;
  height: 7em;
`

const Name = styled.h2`
  color: #fff;
  font-size: 1em;
  font-weight: 400;
  margin: 1em 0;
  text-align: center;
`

const Link = styled.a`
  color: #ff5370;
  font-size: 0.75em;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5em;
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

const Hosts = () => {
  return (
    <Container>
      <Heading>Prowadzący</Heading>
      <Wrapper>
        <Person>
          <Avatar src="https://lh3.googleusercontent.com/91rA7nuK8toYIHgfqh-9M4eucalemHK4XCtpSmGbAEgZuJqw48JOp-2MClsOsLmTy2TJ89PsU-X25o1b=w966-h969-rw-no" />
          <Name>Artur Dudek</Name>
          <Link href="mailto:artur@dudek.ga">artur@dudek.ga</Link>
          <Link href="https://twitter.com/arturdudek_">@arturdudek_</Link>
        </Person>
        <Person>
          <Avatar src="https://i.imgur.com/MbU9fGr.jpg" />
          <Name>Adam Siekierski</Name>
          <Link href="mailto:a@siekierski.ml">a@siekierski.ml</Link>
          <Link href="https://twitter.com/a_siekierski">@a_siekierski</Link>
        </Person>
      </Wrapper>
    </Container>
  )
}

export default Hosts
