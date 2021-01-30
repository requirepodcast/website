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
  onPlay: () => void
  onPause: () => void
  slug: string
  title: string
}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [playing, setPlaying] = useState<boolean>(false)
  const [time, setTime] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)

  const audioRef = useRef<HTMLAudioElement>()
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const sliderRef = useRef<HTMLDivElement>()

  useMount(() => {
    if (audioRef.current?.readyState > 0) {
      setDuration(audioRef.current.duration)
      setLoading(false)
    }
  })

  function triggerPlayer() {
    setPlaying((prev) => {
      prev ? audioRef.current.pause() : audioRef.current.play()

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", prev ? "pause" : "play", {
          event_category: "player",
          event_label: title,
        })
      }

      return !prev
    })
  }

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
    setDuration((<HTMLAudioElement>e.target).duration)
    setLoading(false)
  }

  function sliderSeekHandler(e: SyntheticEvent<HTMLDivElement, MouseEvent>) {
    const duration = audioRef.current.duration

    if (duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / sliderRef.current.clientWidth) * duration

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  function buttonSeekHandler(t: number) {
    const duration = audioRef.current.duration

    if (duration) {
      audioRef.current.currentTime = time + t

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  function volumeHandler(vol: number) {
    audioRef.current.volume = vol
    setVolume(vol)
  }

  return {
    loading,
    playing,
    time,
    progress,
    duration,
    volume,
    triggerPlayer,
    audioRef,
    sliderRef,

    playHandler,
    pauseHandler,
    metadataHandler,
    timeUpdateHandler,
    sliderSeekHandler,
    buttonSeekHandler,
    volumeHandler,
  }
}
