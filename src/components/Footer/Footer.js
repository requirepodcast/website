import React from "react"
import { Container, Link, Links, Text } from "./footer.styles"

const links = [
  {
    href: "https://letter.podcast.gq",
    name: "Newsletter",
  },
  {
    href: "https://require.podcast.gq/youtube",
    name: "YouTube",
  },
  {
    href: "https://open.spotify.com/show/55IXMbPmncm67FA5ZAydtL",
    name: "Spotify",
  },
  {
    href: "https://anchor.fm/s/139df89c/podcast/rss",
    name: "RSS",
  },
  {
    href: "https://www.instagram.com/requirepodcast",
    name: "Instagram",
  },
  {
    href: "https://facebook.com/requirepodcast",
    name: "Facebook",
  },
  {
    href: "https://twitter.com/requirepodcast",
    name: "Twitter",
  },
  {
    href: "https://require.podcast.gq/discord",
    name: "Discord",
  },
  {
    href: "https://github.com/requirepodcast",
    name: "GitHub",
  },
  {
    href: "https://podcasts.apple.com/podcast/id1502694357",
    name: "Apple Podcasts",
  },
  {
    href:
      "https://www.google.com/podcasts?feed=aHR0cHM6Ly9hbmNob3IuZm0vcy8xMzlkZjg5Yy9wb2RjYXN0L3Jzcw==",
    name: "Google Podcasts",
  },
]

const Footer = () => (
  <Container>
    <Links>
      {links.map(({ href, name }) => (
        <Link href={href} key={href} target="_blank">
          {name}
        </Link>
      ))}
    </Links>
    <Text>
      <p>Copyright © {new Date().getFullYear()} Require Podcast</p>
      <p>
        Kontakt: <a href="mailto:require@podcast.gq">require@podcast.gq</a>
      </p>
    </Text>
  </Container>
)

export default Footer
