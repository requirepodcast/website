import React, { ReactNode } from "react"
import styles from "./heading.module.scss"

const Heading = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.heading}>{children}</h2>
}

export default Heading
