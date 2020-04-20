import React, { createRef } from "react"
import styled from "styled-components"
import { Icon } from "@mdi/react"
import {
  mdiPause,
  mdiPlay,
  mdiRewind10,
  mdiFastForward10,
  mdiRewind30,
  mdiFastForward30,
} from "@mdi/js"
import { format, addSeconds } from "date-fns"

const avoidCors = (uri) => `https://cors-anywhere.herokuapp.com/${uri}`

const formatSeconds = (sec) => format(addSeconds(new Date(0), sec), "mm:ss")

const PlayerWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  padding: 10px;
  background-color: #1d1f2d;
  flex-shrink: 0;
`

const ControlsWrapper = styled.div`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const SpectrumWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const PlayButton = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  border: none;
  margin: 0 auto;
  background-color: white;
  color: #1d1f2d;
  font-family: unset;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: background-color 0.3s;

  > * {
    vertical-align: middle;
  }

  &:hover {
    background-color: #dddddd;
  }
`

const DurationTooltip = styled.div`
  margin-top: 1em;
  font-size: 12px;
  color: #dddddd;
`

const TimeButtons = styled.div`
  color: white;

  > * {
    margin: 0 5px;
  }
`

const TimeButton = styled(Icon)`
  transition: color 0.3s;
  color: white;
  cursor: pointer;

  &:hover {
    color: #dddddd;
  }
`

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      tooltipDuration: 0,
      currentTime: 0,
    }

    this.audioRef = createRef()
    this.spectrumRef = createRef()

    this.triggerPlayer = this.triggerPlayer.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.jump = this.jump.bind(this)
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const audio = this.audioRef.current
    const spectrum = this.spectrumRef.current
    const audioContext = this.audioContext

    // Responsive canvas
    const resizeCanvas = () => {
      spectrum.width = spectrum.clientWidth
      spectrum.height = spectrum.clientHeight
    }
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    const analyser = audioContext.createAnalyser()
    const audioSource = audioContext.createMediaElementSource(audio)

    audioSource.connect(analyser)
    analyser.connect(audioContext.destination)

    const spectrumContext = spectrum.getContext("2d")

    const renderFrame = () => {
      requestAnimationFrame(renderFrame)

      const freqData = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(freqData)

      spectrumContext.clearRect(0, 0, spectrum.width, spectrum.height)
      spectrumContext.fillStyle = spectrumContext.createLinearGradient(
        0,
        spectrum.height,
        0,
        0
      )
      spectrumContext.fillStyle.addColorStop(0, "#ff5370")
      spectrumContext.fillStyle.addColorStop(1, "#ff97b4")

      const barWidth = 5
      const barMargin = 2
      const baseHeight = 15

      // calculate the number of bars
      let bars = Math.floor(spectrum.width / (barWidth + barMargin))
      if (spectrum.width % (barWidth + barMargin) >= barWidth) {
        bars += 1
      }

      const heightMultiplier = spectrum.height / 256

      for (let i = 0; i < bars; i++) {
        spectrumContext.fillRect(
          i * (barWidth + barMargin),
          spectrum.height,
          barWidth,
          freqData[i] > baseHeight
            ? -(freqData[i] * heightMultiplier)
            : -baseHeight
        )
      }
    }

    renderFrame()
  }

  componentWillUnmount() {
    if (this.currentTimeInterval) {
      clearInterval(this.currentTimeInterval)
    }
  }

  triggerPlayer() {
    if (!this.state.playing) {
      this.audioContext.resume()
      this.audioRef.current.play()
    } else {
      this.audioRef.current.pause()
    }
  }

  onPlay() {
    this.audioRef.current.currentTime = this.state.currentTime
    this.setState({ playing: true })
    this.currentTimeInterval = setInterval(() => {
      this.setState({ currentTime: this.audioRef.current.currentTime })
    }, 500)
  }

  onPause() {
    this.setState({ playing: false })
    clearInterval(this.currentTimeInterval)
  }

  jump(t) {
    this.audioRef.current.currentTime = this.state.currentTime + t
    this.setState((prevState) => {
      return {
        currentTime: prevState.currentTime + t,
      }
    })
  }

  render() {
    return (
      <PlayerWrapper>
        <ControlsWrapper>
          <div />
          <div>
            <PlayButton onClick={this.triggerPlayer}>
              <Icon path={this.state.playing ? mdiPause : mdiPlay} />
            </PlayButton>
            <DurationTooltip>
              {formatSeconds(this.state.currentTime)}/
              {formatSeconds(this.state.tooltipDuration)}
            </DurationTooltip>
          </div>
          <TimeButtons>
            <TimeButton
              path={mdiRewind30}
              size={1}
              onClick={() => this.jump(-30)}
            />
            <TimeButton
              path={mdiRewind10}
              size={1}
              onClick={() => this.jump(-10)}
            />
            <TimeButton
              path={mdiFastForward10}
              size={1}
              onClick={() => this.jump(10)}
            />
            <TimeButton
              path={mdiFastForward30}
              size={1}
              onClick={() => this.jump(30)}
            />
          </TimeButtons>
        </ControlsWrapper>
        <SpectrumWrapper>
          <canvas
            ref={this.spectrumRef}
            style={{ width: "100%", height: "100%" }}
          />
          <audio
            ref={this.audioRef}
            src={avoidCors(this.props.url)}
            crossOrigin="anonymous"
            onPlay={this.onPlay}
            onPause={this.onPause}
            onLoadedMetadata={() =>
              this.setState({
                tooltipDuration: this.audioRef.current.duration,
              })
            }
            preload="metadata"
          />
        </SpectrumWrapper>
      </PlayerWrapper>
    )
  }
}

export default Player
