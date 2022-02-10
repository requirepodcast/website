import React from "react"
import styles from "./footer.module.scss"

const links = [
  {
    href: "https://require.pl/newsletter",
    name: "Newsletter",
  },
  {
    href: "https://require.pl/youtube",
    name: "YouTube",
  },
  {
    href: "https://require.pl/spotify",
    name: "Spotify",
  },
  {
    href: "https://require.pl/rss",
    name: "RSS",
  },
  {
    href: "https://require.pl/instagram",
    name: "Instagram",
  },
  {
    href: "https://require.pl/facebook",
    name: "Facebook",
  },
  {
    href: "https://require.pl/twitter",
    name: "Twitter",
  },
  {
    href: "https://require.pl/discord",
    name: "Discord",
  },
  {
    href: "https://require.pl/github",
    name: "GitHub",
  },
  {
    href: "https://require.pl/apple",
    name: "Apple Podcasts",
  },
  {
    href: "https://require.pl/google",
    name: "Google Podcasts",
  },
]

const Footer = () => (
  <footer className={styles.wrapper}>
    <section className={styles.linksWrapper}>
      {links.map(({ href, name }) => (
        <a href={href} key={href} target="_blank" rel="noreferrer" className={styles.link}>
          {name}
        </a>
      ))}
    </section>
    <section className={styles.text}>
      <p>Copyright © {new Date().getFullYear()} Require Podcast</p>
      <p>
        Kontakt: <a href="mailto:require.podcast@gmail.com">require.podcast@gmail.com</a>
      </p>
    </section>
  </footer>
)

export default Footer
