import React, { useState } from "react"
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
import VolumeBars from "./volumeBars"
import { usePlayerState } from "../../hooks/usePlayerState"

const pad = (num) =>
  num.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false })

const formatSeconds = (sec) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60)

  return `${hours ? `${hours}:` : ""}${pad(minutes)}:${pad(seconds)}`
}

const Player = ({ url, onPlay, onPause, slug }) => {
  const {
    loading,
    playing,
    time,
    progress,
    duration,
    volume,
    triggerPlayer,
    audioRef,

    playHandler,
    pauseHandler,
    metadataHandler,
    timeUpdateHandler,
    sliderSeekHandler,
    buttonSeekHandler,
    volumeHandler,
    sliderRef,
  } = usePlayerState({ onPlay, onPause, slug })

  return (
    <PlayerWrapper>
      <PlayerSectionLeft>
        <PlayButton onClick={triggerPlayer}>
          {loading ? (
            <Spinner color="white" radius={30} />
          ) : (
            <Icon path={playing ? mdiPause : mdiPlay} />
          )}
        </PlayButton>
        <DurationInfo>
          {formatSeconds(time)}/{formatSeconds(duration)}
        </DurationInfo>
      </PlayerSectionLeft>
      <PlayerSectionCenter>
        <Slider ref={sliderRef} onClick={sliderSeekHandler}>
          <SliderTime
            style={{ width: `${progress * 100}%` }}
            playing={playing}
          />
        </Slider>
        <TimeButtons>
          <TimeButton onClick={() => buttonSeekHandler(-30)}>
            <TimeButtonIcon path={mdiRewind30} size={1} />
          </TimeButton>
          <TimeButton onClick={() => buttonSeekHandler(-10)}>
            <TimeButtonIcon path={mdiRewind10} size={1} />
          </TimeButton>
          <TimeButton onClick={() => buttonSeekHandler(10)}>
            <TimeButtonIcon path={mdiFastForward10} size={1} />
          </TimeButton>
          <TimeButton onClick={() => buttonSeekHandler(30)}>
            <TimeButtonIcon path={mdiFastForward30} size={1} />
          </TimeButton>
        </TimeButtons>
        <audio
          ref={audioRef}
          src={url}
          preload="metadata"
          onPlay={playHandler}
          onPause={pauseHandler}
          onLoadedMetadata={metadataHandler}
          onTimeUpdate={timeUpdateHandler}
        />
      </PlayerSectionCenter>
      <PlayerSectionRight>
        <VolumeBars volume={volume} setVolume={volumeHandler} />
      </PlayerSectionRight>
    </PlayerWrapper>
  )
}

export default Player
