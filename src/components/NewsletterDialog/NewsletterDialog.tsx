import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import styles from "./newsletterDialog.module.scss"

const NewsletterDialog = () => (
  <OutboundLink
    className={styles.wrapper}
    href="https://letter.require.pl"
    role="dialog"
    aria-label="Link do newsletter'a"
    aria-modal="false"
  >
    Zapisz się do <span className={styles.redText}>require('letter')</span> - newslettera prosto od
    Require Podcast ✉️
  </OutboundLink>
)

export default NewsletterDialog
