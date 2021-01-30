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
import VolumeBars from "./VolumeBars"
import { usePlayerState } from "../../hooks/usePlayerState"
import { formatSeconds } from "../../utils/formatSeconds"
import styles from "./player.module.scss"
import clsx from "clsx"
import RateSwitch from "./RateSwitch"

type PlayerProps = {
  url: string
  onPlay?: () => void
  onPause?: () => void
  slug: string
  title: string
}

const Player = ({ url, onPlay, onPause, slug, title }: PlayerProps) => {
  const {
    loading,
    playing,
    time,
    progress,
    duration,
    volume,
    triggerPlayer,
    seek,
    audioRef,
    setVolume,
    sliderRef,
    handleSliderSeek,
    handlers,
    rate,
    setRate,
  } = usePlayerState({ onPlay, onPause, slug, title })

  return (
    <div className={styles.wrapper}>
      <section className={styles.sectionLeft}>
        <button
          className={styles.playButton}
          onClick={triggerPlayer}
          aria-label="Przycisk odtwórz/zatrzymaj"
        >
          {loading ? (
            <Spinner color="white" radius={30} visible={true} stroke={5} />
          ) : (
            <Icon path={playing ? mdiPause : mdiPlay} />
          )}
        </button>
        <time className={styles.duration}>
          {formatSeconds(time)}/{formatSeconds(duration)}
        </time>
      </section>
      <section className={styles.sectionCenter}>
        <div className={styles.slider} ref={sliderRef} onClick={handleSliderSeek}>
          <div
            className={clsx(styles.sliderTime, playing && styles.sliderTimePlaying)}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className={styles.timeButtons}>
          <button
            className={styles.timeButton}
            onClick={() => seek(-30)}
            aria-label="Cofnij o 30 sekund"
          >
            <Icon className={styles.timeButtonIcon} path={mdiRewind30} size={0.9} />
          </button>
          <button
            className={styles.timeButton}
            onClick={() => seek(-10)}
            aria-label="Cofnij o 10 sekund"
          >
            <Icon className={styles.timeButtonIcon} path={mdiRewind10} size={0.9} />
          </button>
          <button
            className={styles.timeButton}
            onClick={() => seek(10)}
            aria-label="Do przodu o 10 sekund"
          >
            <Icon className={styles.timeButtonIcon} path={mdiFastForward10} size={0.9} />
          </button>
          <button
            className={styles.timeButton}
            onClick={() => seek(30)}
            aria-label="Do przodu o 30 sekund"
          >
            <Icon className={styles.timeButtonIcon} path={mdiFastForward30} size={0.9} />
          </button>
        </div>
        <audio ref={audioRef} src={url} preload="metadata" {...handlers} />
      </section>
      <section className={styles.sectionRight}>
        <RateSwitch rate={rate} setRate={setRate} />
      </section>
      <section className={styles.sectionRight}>
        <VolumeBars volume={volume} setVolume={setVolume} />
      </section>
    </div>
  )
}

export default Player
