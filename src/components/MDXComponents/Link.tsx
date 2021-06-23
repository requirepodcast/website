import React from "react"

const Link = ({ children }: { children: string }) => (
  <a href={children} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

export default Link
