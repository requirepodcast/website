import React from "react"

import cfg from "../../config"

export default class streamingPlayer extends React.Component {
  render() {
    return (
      <div>
        <audio ref="audio_tag" src={cfg.urls.radio} controls />
      </div>
    )
  }
}
