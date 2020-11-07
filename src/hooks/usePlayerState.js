import { useRef, useState } from "react"
import { useMount } from "./useMount"

export const usePlayerState = ({ onPlay, onPause, slug }) => {
  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  const audioRef = useRef()
  const intervalRef = useRef()
  const sliderRef = useRef()

  useMount(() => {
    if (audioRef.current.readyState > 0) {
      setDuration(audioRef.current.duration)
      setLoading(false)
    }
  })

  function triggerPlayer() {
    setPlaying((prev) => {
      prev ? audioRef.current.pause() : audioRef.current.play()

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

      window.localStorage.setItem(`${slug}_time`, currentTime)

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

  function metadataHandler(e) {
    const savedTime = Number(window.localStorage.getItem(`${slug}_time`))

    e.target.currentTime = savedTime

    setTime(savedTime)
    setProgress(savedTime / e.target.duration)
    setDuration(e.target.duration)
    setLoading(false)
  }

  function timeUpdateHandler(e) {
    setDuration(e.target.duration)
    setLoading(false)
  }

  function sliderSeekHandler(e) {
    const duration = audioRef.current.duration

    if (duration) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / sliderRef.current.clientWidth) * duration

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  function buttonSeekHandler(t) {
    const duration = audioRef.current.duration

    if (duration) {
      audioRef.current.currentTime = time + t

      setTime(audioRef.current.currentTime)
      setProgress(audioRef.current.currentTime / duration)
    }
  }

  function volumeHandler(vol) {
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
