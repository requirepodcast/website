import React from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: #141621;
  padding: 2em 6em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @media (max-width: 700px) {
    flex-direction: column;
    text-align: center;
    padding: 1em 2em;
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
  text-align: left;
  display: block;
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
  }
`

const Links = styled.div`
  margin: 1em 0;
  &:before {
    border-top: 2px solid #ff5370;
    display: block;
    width: 100%;
    content: "";
    margin: 0 auto 1em;
  }
`

const Footer = () => {
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
        <Link href="https://podcasts.apple.com/podcast/id1502694357">
          Apple Podcasts
        </Link>
        <Link href="https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy8xMzlkZjg5Yy9wb2RjYXN0L3Jzcw==">
          Google Podcasts
        </Link>
        <Link href="https://anchor.fm/require">Anchor</Link>
        <Link href="https://require.podcast.gq/discord">Discord</Link>
        <Link href="https://twitter.com/requirepodcast">Twitter</Link>
        <Link href="https://www.instagram.com/requirepodcast">Instagram</Link>
        <Link href="https://github.com/requirepodcast">GitHub</Link>
        <Link href="https://www.reddit.com/r/requirepodcast">Reddit</Link>
      </Links>
      <Text>
        Copyright © {new Date().getFullYear()} The Require Podcast
        <br />
        Kontakt: require@podcast.gq
      </Text>
    </Container>
  )
}

export default Footer
