import React from "react"
import { Icon } from "@mdi/react"
import {
  mdiPause,
  mdiPlay,
  mdiRewind10,
  mdiFastForward10,
  mdiRewind30,
  mdiFastForward30,
} from "@mdi/js"
import Spinner from "react-spinner-material"
import {
  PlayerWrapper,
  DurationInfo,
  TimeButtonIcon,
  TimeButtons,
  TimeButton,
  PlayerSectionCenter,
  PlayerSectionLeft,
  PlayButton,
  Slider,
  SliderTime,
  PlayerSectionRight,
} from "./player.styles"
import VolumeBars from "../Archive/volumeBars"

const pad = (num) =>
  num.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })

const formatSeconds = (sec) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60)

  return `${hours ? `${hours}:` : ""}${pad(minutes)}:${pad(seconds)}`
}

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      isPlaying: false,
      currentTime: 0,
      currentTimePercent: 0,
      episodeDuration: 0,
      currentVolume: 1,
    }

    this.triggerPlayer = this.triggerPlayer.bind(this)
    this.onButtonJump = this.onButtonJump.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onSliderJump = this.onSliderJump.bind(this)
  }

  triggerPlayer() {
    this.state.isPlaying ? this.audioRef.pause() : this.audioRef.play()

    this.setState((prevState) => {
      return {
        isPlaying: !prevState.isPlaying,
      }
    })
  }

  onPlay(e) {
    this.props.onPlay && this.props.onPlay()
    this.setState({ isPlaying: true })

    const savedTime = window.localStorage.getItem(`${this.props.slug}_time`)
    if (this.audioRef.duration && savedTime) {
      this.audioRef.currentTime = savedTime
      this.setState({
        currentTime: savedTime,
        currentTimePercent: (savedTime / this.audioRef.duration) * 100,
      })
    }

    this.playingInterval = setInterval(() => {
      this.setState(({ currentTime: prevTime }) => ({
        currentTime: this.audioRef.currentTime,
        currentTimePercent:
          (this.audioRef.currentTime / this.audioRef.duration) * 100,
        isLoading: this.audioRef.currentTime === prevTime,
      }))

      window.localStorage.setItem(
        `${this.props.slug}_time`,
        this.audioRef.currentTime
      )

      if (this.audioRef.currentTime >= this.audioRef.duration) {
        this.setState({ isPlaying: false, isLoading: false })

        window.localStorage.removeItem(`${this.props.slug}_time`)

        clearInterval(this.playingInterval)
      }
    }, 100)
  }

  onPause() {
    this.props.onPause && this.props.onPause()
    this.setState({ isPlaying: false })
    clearInterval(this.playingInterval)
  }

  onButtonJump(t) {
    if (this.audioRef.duration) {
      this.audioRef.currentTime = this.state.currentTime + t
      this.setState({
        currentTime: this.audioRef.currentTime,
        currentTimePercent:
          (this.audioRef.currentTime / this.audioRef.duration) * 100,
      })
    }
  }

  onSliderJump(e) {
    if (this.audioRef.duration) {
      this.audioRef.currentTime =
        (e.nativeEvent.offsetX / this.sliderRef.clientWidth) *
        this.audioRef.duration
      this.setState({
        currentTime: this.audioRef.currentTime,
        currentTimePercent:
          (this.audioRef.currentTime / this.audioRef.duration) * 100,
      })
    }
  }

  componentDidMount() {
    if (this.audioRef.readyState > 0) {
      this.setState({
        episodeDuration: this.audioRef.duration,
        isLoading: false,
      })
    }
  }

  render() {
    const {
      isLoading,
      isPlaying,
      currentTime,
      episodeDuration,
      currentTimePercent,
      currentVolume,
    } = this.state

    return (
      <PlayerWrapper>
        <PlayerSectionLeft>
          <PlayButton onClick={this.triggerPlayer}>
            {isLoading ? (
              <Spinner color="white" radius={30} />
            ) : (
              <Icon path={isPlaying ? mdiPause : mdiPlay} />
            )}
          </PlayButton>
          <DurationInfo>
            {formatSeconds(currentTime)}/{formatSeconds(episodeDuration)}
          </DurationInfo>
        </PlayerSectionLeft>
        <PlayerSectionCenter>
          <Slider ref={(x) => (this.sliderRef = x)} onClick={this.onSliderJump}>
            <SliderTime style={{ width: `${currentTimePercent}%` }} />
          </Slider>
          <TimeButtons>
            <TimeButton onClick={() => this.onButtonJump(-30)}>
              <TimeButtonIcon path={mdiRewind30} size={1} />
            </TimeButton>
            <TimeButton onClick={() => this.onButtonJump(-10)}>
              <TimeButtonIcon path={mdiRewind10} size={1} />
            </TimeButton>
            <TimeButton onClick={() => this.onButtonJump(10)}>
              <TimeButtonIcon path={mdiFastForward10} size={1} />
            </TimeButton>
            <TimeButton onClick={() => this.onButtonJump(30)}>
              <TimeButtonIcon path={mdiFastForward30} size={1} />
            </TimeButton>
          </TimeButtons>
          <audio
            ref={(x) => (this.audioRef = x)}
            src={this.props.url}
            preload="metadata"
            onPlay={this.onPlay}
            onPause={this.onPause}
            onLoadedMetadata={(e) => {
              this.setState({
                episodeDuration: e.target.duration,
                isLoading: false,
              })
            }}
            onTimeUpdate={(e) => {
              this.setState({
                episodeDuration: e.target.duration,
                isLoading: false,
              })
            }}
          />
        </PlayerSectionCenter>
        <PlayerSectionRight>
          <VolumeBars
            volume={currentVolume}
            setVolume={(vol) => {
              this.audioRef.volume = vol
              this.setState({ currentVolume: vol })
            }}
          />
        </PlayerSectionRight>
      </PlayerWrapper>
    )
  }
}

export default Player
