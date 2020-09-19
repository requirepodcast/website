import React from "react"

class IndexPagePlayer extends React.Component {
  render() {
    return (
      <div>
        <audio ref="audio_tag" src="https://ssg.streamingmurah.com:8286/stream" controls/>
      </div>
    );
  }
}

export default IndexPagePlayer
