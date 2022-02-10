import { SyntheticEvent, useCallback, useRef, useState } from "react"
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

  const audioRef = useRef<HTMLAudioElement>(null)
  const intervalRef = useRef<number | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useMount(() => {
    if (audioRef?.current?.readyState) {
      setDuration(audioRef?.current?.duration || 0)
      setLoading(false)
    }
  })

  /* User-trigggered actions */

  const triggerPlayer = useCallback(() => {
    setPlaying((prev) => {
      prev ? audioRef?.current?.pause() : audioRef?.current?.play()

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
  }, [title])

  const seek = useCallback(
    (t: number) => {
      const duration = audioRef?.current?.duration

      /* istanbul ignore else */
      if (duration) {
        audioRef.current.currentTime = time + t

        setTime(audioRef?.current?.currentTime)
        setProgress(audioRef?.current?.currentTime / duration)
      }
    },
    [time]
  )

  const seekTo = useCallback((t: number) => {
    const duration = audioRef?.current?.duration

    /* istanbul ignore else */
    if (duration) {
      audioRef.current.currentTime = t
      setTime(audioRef?.current?.currentTime)
      setProgress(audioRef?.current?.currentTime / duration)
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    audioRef?.current && (audioRef.current.volume = vol)
    setVolumeState(vol)
  }, [])

  const setRate = useCallback((s: number) => {
    audioRef?.current && (audioRef.current.playbackRate = s)
    setRateState(s)
  }, [])

  const handleSliderSeek = useCallback((e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    const duration = audioRef?.current?.duration

    /* istanbul ignore else */
    if (duration) {
      audioRef?.current &&
        (audioRef.current.currentTime =
          (e.nativeEvent.offsetX / (sliderRef?.current?.clientWidth || 1)) * duration)

      setTime(audioRef?.current?.currentTime)
      setProgress(audioRef?.current?.currentTime / duration)
    }
  }, [])

  /* Player-triggered events */

  const playHandler = useCallback(() => {
    onPlay && onPlay()
    setPlaying(true)

    intervalRef.current = window.setInterval(() => {
      const currentTime = audioRef?.current?.currentTime
      const duration = audioRef?.current?.duration

      setLoading(currentTime === time)
      setTime(currentTime || 0)
      setProgress((currentTime || 0) / (duration || 1))

      window.localStorage.setItem(`${slug}_time`, currentTime?.toString() || "")

      if (currentTime && duration && currentTime >= duration) {
        setPlaying(false)
        setLoading(false)

        window.localStorage.removeItem(`${slug}_time`)

        intervalRef.current && window.clearInterval(intervalRef.current)
      }
    }, 100)
  }, [onPlay, slug, time])

  const pauseHandler = useCallback(() => {
    onPause && onPause()

    setPlaying(false)

    intervalRef.current && window.clearInterval(intervalRef.current)
  }, [onPause])

  const metadataHandler = useCallback(
    (e: SyntheticEvent<HTMLAudioElement>) => {
      const target = e.target as HTMLAudioElement

      const savedTime = Number(window.localStorage.getItem(`${slug}_time`))

      target.currentTime = savedTime

      setTime(savedTime)
      setProgress(savedTime / target.duration)
      setDuration(target.duration)
      setLoading(false)
    },
    [slug]
  )

  const timeUpdateHandler = useCallback((e: SyntheticEvent<HTMLAudioElement>) => {
    setDuration((e.target as HTMLAudioElement).duration)
    setLoading(false)
  }, [])

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
    seekTo,
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

export type PlayerState = ReturnType<typeof usePlayerState>
