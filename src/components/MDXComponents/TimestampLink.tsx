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
      /* eslint-disable */
      <a
        href="javascript: void(0)"
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
