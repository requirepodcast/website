import React from "react"
import styles from "./heading.module.scss"

const Heading = ({ children }) => {
  return <h2 className={styles.heading}>{children}</h2>
}

export default Heading
