import { SyntheticEvent, useRef, useState } from "react"
import { useMount } from "./useMount"

declare global {
  interface Window {
    gtag: any
  }
}

export const usePlayerState = ({
  onPlay,
  onPause,
  slug,
  title,
}: {
  onPlay?: () => void
  onPause?: () => void
  slug: string
  title: string
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [playing, setPlaying] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [volume, setVolumeState] = useState<number>(1)
  const [rate, setRateState] = useState<number>(1)

  const audioRef = useRef<HTMLAudioElement>()
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const sliderRef = useRef<HTMLDivElement>()

  useMount(() => {
    if (audioRef.current?.readyState > 0) {
      setDuration(audioRef.current.duration)
      setLoading(false)
    }
  })

  /* User-trigggered actions */

  function triggerPlayer() {
    setPlaying((prev) => {
      prev ? audioRef.current.pause() : audioRef.current.play()

      /* istanbul ignore next */
      if (typeof window !== "undefined" && window.gtag) {
        /* istanbul ignore next  */
        window.gtag("event", prev ? "pause" : "play", {
          event_category: "player",
          event_label: title,
        })
      }

      return !prev
    })
  }

  function seek(t: number) {
    const duration = audioRef.current.duration

    /* istanbul ignore else */
    if (duration) {
      audioRef.current.currentTime = time + t

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  function setVolume(vol: number) {
    audioRef.current.volume = vol
    setVolumeState(vol)
  }

  function setRate(s: number) {
    audioRef.current.playbackRate = s
    setRateState(s)
  }

  function handleSliderSeek(e: SyntheticEvent<HTMLDivElement, MouseEvent>) {
    const duration = audioRef.current.duration

    /* istanbul ignore else */
    if (duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / sliderRef.current.clientWidth) * duration

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  /* Player-triggered events */

  function playHandler() {
    onPlay && onPlay()
    setPlaying(true)

    intervalRef.current = setInterval(() => {
      const currentTime = audioRef.current.currentTime
      const duration = audioRef.current.duration

      setLoading(currentTime === time)
      setTime(currentTime)
      setProgress(currentTime / duration)

      window.localStorage.setItem(`${slug}_time`, currentTime.toString())

      if (currentTime >= duration) {
        setPlaying(false)
        setLoading(false)

        window.localStorage.removeItem(`${slug}_time`)

        clearInterval(intervalRef.current)
      }
    }, 100)
  }

  function pauseHandler() {
    onPause && onPause()

    setPlaying(false)

    clearInterval(intervalRef.current)
  }

  function metadataHandler(e: SyntheticEvent<HTMLAudioElement>) {
    const target = e.target as HTMLAudioElement

    const savedTime = Number(window.localStorage.getItem(`${slug}_time`))

    target.currentTime = savedTime

    setTime(savedTime)
    setProgress(savedTime / target.duration)
    setDuration(target.duration)
    setLoading(false)
  }

  function timeUpdateHandler(e: SyntheticEvent<HTMLAudioElement>) {
    setDuration((e.target as HTMLAudioElement).duration)
    setLoading(false)
  }

  return {
    loading,
    playing,
    time,
    progress,
    duration,
    volume,
    rate,

    audioRef,
    sliderRef,

    triggerPlayer,
    setVolume,
    seek,
    setRate,

    handleSliderSeek,

    handlers: {
      onPlay: playHandler,
      onPause: pauseHandler,
      onLoadedMetadata: metadataHandler,
      onTimeUpdate: timeUpdateHandler,
    },
  }
}
