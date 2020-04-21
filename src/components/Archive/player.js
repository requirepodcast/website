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
import Spinner from "react-spinner-material"
import {
  PlayerWrapper,
  DurationInfo,
  TimeButton,
  TimeButtons,
  ControlsWrapper,
  PlayButton,
  Slider,
  SliderTime,
  SpectrumWrapper,
  Tooltip,
} from "./player.styles"

const avoidCors = (uri) => `https://cors-anywhere.herokuapp.com/${uri}`
const formatSeconds = (sec) => format(addSeconds(new Date(0), sec), "mm:ss")

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      episodeDuration: 0,
      currentTime: 0,
      currentTimePercent: 0,
      isLoading: true,
      tooltipTime: 0,
      tooltipPosition: 0,
      showTooltip: false,
    }

    this.audioRef = createRef()
    this.spectrumRef = createRef()
    this.sliderRef = createRef()
    this.tooltipRef = createRef()

    this.triggerPlayer = this.triggerPlayer.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.jumpBy = this.jumpBy.bind(this)
    this.sliderJump = this.sliderJump.bind(this)
    this.onSeek = this.onSeek.bind(this)
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
      this.setState((prevState) => {
        return {
          currentTime: this.audioRef.current.currentTime,
          currentTimePercent:
            (this.audioRef.current.currentTime /
              this.audioRef.current.duration) *
            100,
          isLoading:
            prevState.currentTime === this.audioRef.current.currentTime,
        }
      })
    }, 500)
  }

  onPause() {
    this.setState({ playing: false })
    clearInterval(this.currentTimeInterval)
  }

  jumpBy(t) {
    this.audioRef.current.currentTime = this.state.currentTime + t
    this.setState((prevState) => {
      return {
        currentTime: prevState.currentTime + t,
        currentTimePercent:
          ((prevState.currentTime + t) / this.audioRef.current.duration) * 100,
      }
    })
  }

  sliderJump(e) {
    this.audioRef.current.currentTime =
      (e.nativeEvent.offsetX / this.sliderRef.current.clientWidth) *
      this.audioRef.current.duration
    this.setState({
      currentTimePercent:
        (e.nativeEvent.offsetX / this.sliderRef.current.clientWidth) * 100,
      currentTime:
        (e.nativeEvent.offsetX / this.sliderRef.current.clientWidth) *
        this.audioRef.current.duration,
    })
  }

  onSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.nativeEvent.clientX - rect.left
    if (e.nativeEvent.clientX >= rect.left && e.nativeEvent.clientX <= rect.right) {
      this.setState({
        tooltipPosition: offsetX,
        tooltipTime:
          (offsetX / this.sliderRef.current.clientWidth) *
          this.audioRef.current.duration,
      })
    }
  }

  render() {
    return (
      <PlayerWrapper>
        <ControlsWrapper>
          <div />
          <div>
            <PlayButton onClick={this.triggerPlayer}>
              {this.state.isLoading ? (
                <Spinner color="#1d1f2d" radius={30} />
              ) : (
                <Icon path={this.state.playing ? mdiPause : mdiPlay} />
              )}
            </PlayButton>
            <DurationInfo>
              {formatSeconds(this.state.currentTime)}/
              {formatSeconds(this.state.episodeDuration)}
            </DurationInfo>
          </div>
          <TimeButtons>
            <TimeButton
              path={mdiRewind30}
              size={1}
              onClick={() => this.jumpBy(-30)}
            />
            <TimeButton
              path={mdiRewind10}
              size={1}
              onClick={() => this.jumpBy(-10)}
            />
            <TimeButton
              path={mdiFastForward10}
              size={1}
              onClick={() => this.jumpBy(10)}
            />
            <TimeButton
              path={mdiFastForward30}
              size={1}
              onClick={() => this.jumpBy(30)}
            />
          </TimeButtons>
        </ControlsWrapper>
        <SpectrumWrapper>
          <canvas ref={this.spectrumRef} style={{ width: "100%", flex: 1 }} />
          <Slider
            onClick={this.sliderJump}
            ref={this.sliderRef}
            onMouseEnter={() => this.setState({ showTooltip: true })}
            onMouseLeave={() => this.setState({ showTooltip: false })}
            onMouseMove={this.onSeek}
          >
            <SliderTime width={this.state.currentTimePercent} />
            {this.state.showTooltip && (
              <Tooltip
                ref={this.tooltipRef}
                style={{
                  left: this.state.tooltipPosition,
                }}
              >
                {formatSeconds(this.state.tooltipTime)}
              </Tooltip>
            )}
          </Slider>
          <audio
            ref={this.audioRef}
            src={avoidCors(this.props.url)}
            crossOrigin="anonymous"
            preload="metadata"
            onPlay={this.onPlay}
            onPause={this.onPause}
            onLoadedMetadata={(e) =>
              this.setState({
                episodeDuration: e.target.duration,
                isLoading: false,
              })
            }
          />
        </SpectrumWrapper>
      </PlayerWrapper>
    )
  }
}

export default Player
