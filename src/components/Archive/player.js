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

const avoidCors = (uri) => `https://cors-anywhere.herokuapp.com/${uri}`

const formatSeconds = (sec) => format(addSeconds(new Date(0), sec), "mm:ss")

const PlayerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  background-color: #1d1f2d;
  flex-shrink: 0;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
  }
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
  width: 100%;
`

const PlayButton = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  border: none;
  margin: 5px auto;
  background-color: white;
  color: #1d1f2d;
  font-family: unset;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: background-color 0.3s;
  padding: 0;
  text-align: center;

  > * {
    vertical-align: middle;
    margin: 0 auto;
  }

  &:hover {
    background-color: #dddddd;
  }
`

const DurationInfo = styled.div`
  margin-top: 1em;
  font-size: 12px;
  color: white;
`

const TimeButtons = styled.div`
  color: white;
  height: 30px;
  padding: 5px;

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

const Slider = styled.div`
  width: 100%;
  margin-top: 7px;
  margin-bottom: 3px;
  height: 20px;
  cursor: crosshair;
  background-color: #141621;
  overflow: hidden;
  position: relative;
`

const SliderTime = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background: linear-gradient(30deg, #ff5370 0%, #ff97b4 100%);
  transition: width 0.1s ease-in-out;
  min-width: 10px;
`

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false,
      episodeDuration: 0,
      currentTime: 0,
      currentTimePercent: 0,
      isLoading: true,
    }

    this.audioRef = createRef()
    this.spectrumRef = createRef()
    this.sliderRef = createRef()

    this.triggerPlayer = this.triggerPlayer.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.jumpBy = this.jumpBy.bind(this)
    this.sliderJump = this.sliderJump.bind(this)
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

  render() {
    console.log(this.state.isLoading)
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
          <Slider onClick={this.sliderJump} ref={this.sliderRef}>
            <SliderTime width={this.state.currentTimePercent} />
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
