import React, { ReactText } from "react"
import type { PlayerState } from "../../hooks/usePlayerState"

const timestampLink = (seekFunc: PlayerState["seekTo"]) =>
  React.memo(({ children }: { children: ReactText }) => {
    const time = children
      .toString()
      .split(":")
      .reverse()
      .reduce((acc, curr, i) => {
        return acc + parseInt(curr) * Math.pow(60, i)
      }, 0)

    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          seekFunc(time)
        }}
      >
        {children}
      </a>
    )
  })

export default timestampLink
