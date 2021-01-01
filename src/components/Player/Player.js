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
import VolumeBars from "./VolumeBars"
import { usePlayerState } from "../../hooks/usePlayerState"
import { formatSeconds } from "../../utils/formatSeconds"

const Player = ({ url, onPlay, onPause, slug, title }) => {
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
  } = usePlayerState({ onPlay, onPause, slug, title })

  return (
    <PlayerWrapper>
      <PlayerSectionLeft>
        <PlayButton
          onClick={triggerPlayer}
          aria-label="Przycisk odtwórz/zatrzymaj"
        >
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
          <TimeButton
            onClick={() => buttonSeekHandler(-30)}
            aria-label="Cofnij o 30 sekund"
          >
            <TimeButtonIcon path={mdiRewind30} size={1} />
          </TimeButton>
          <TimeButton
            onClick={() => buttonSeekHandler(-10)}
            aria-label="Cofnij o 10 sekund"
          >
            <TimeButtonIcon path={mdiRewind10} size={1} />
          </TimeButton>
          <TimeButton
            onClick={() => buttonSeekHandler(10)}
            aria-label="Do przodu o 10 sekund"
          >
            <TimeButtonIcon path={mdiFastForward10} size={1} />
          </TimeButton>
          <TimeButton
            onClick={() => buttonSeekHandler(30)}
            aria-label="Do przodu o 30 sekund"
          >
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
