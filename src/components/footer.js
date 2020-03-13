import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #222;
  padding: 2em 3em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
  }
`

const Link = styled.a`
  color: #ffffff88;
  font-size: 1em;
  text-align: center;
  text-decoration: none;
  display: block;
  font-weight: 100;
  text-align: left;
  &:hover {
    color: #ffffff;
  }
  @media (max-width: 700px) {
    text-align: center;
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
`

const Links = styled.div`
  margin: 1em 0;
`

const Hosts = () => {
  return (
    <Container>
      <Links>
        <Link href="https://soundcloud.com/requirepodcast">SoundCloud</Link>
        <Link href="https://www.youtube.com/channel/UCec_mTVjUKQAsSilMJ3J1TQ">
          YouTube
        </Link>
        <Link href="https://open.spotify.com/show/55IXMbPmncm67FA5ZAydtL">
          Spotify
        </Link>
        <Link href="https://anchor.fm/require">Anchor</Link>
        <Link href="https://github.com/requirepodcast">GitHub</Link>
        <Link href="https://twitter.com/requirepodcast">Twitter</Link>
        <Link href="https://www.instagram.com/requirepodcast">Instagram</Link>
        <Link href="https://www.reddit.com/r/requirepodcast">Reddit</Link>
        <Link href="https://require.podcast.gq/discord">Discord</Link>
        <Link href="mailto:require@podcast.gq">require@podcast.gq</Link>
      </Links>
      <Text>
        Copyright © {new Date().getFullYear()} The Reuqire Podcast
        <br />
        Strona zrobiona przez Artura Dudka
      </Text>
    </Container>
  )
}

export default Hosts
