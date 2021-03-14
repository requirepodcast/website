import { usePlayerState } from "./usePlayerState"
import { renderHook, act } from "@testing-library/react-hooks"

jest.useFakeTimers()

const DURATION = 1337

describe("usePlayerState", () => {
  let audioRef: HTMLAudioElement
  beforeAll(() => {
    Object.defineProperty(window.HTMLAudioElement.prototype, "play", { value: jest.fn() })
    Object.defineProperty(window.HTMLAudioElement.prototype, "pause", { value: jest.fn() })
  })

  beforeEach(() => {
    audioRef = document.createElement("audio")
    Object.defineProperty(audioRef, "duration", { value: DURATION, writable: true })
  })

  it("handles loading data", () => {
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef

    expect(result.current.playing).toBe(false)
    expect(result.current.loading).toBe(true)

    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.duration).toBe(DURATION)

    act(() => {
      // @ts-ignore
      audioRef.duration = 2137
      // @ts-ignore
      result.current.handlers.onTimeUpdate({ target: audioRef })
    })

    expect(result.current.duration).toBe(2137)
  })

  it("loads properly when audio is loaded before mounting", () => {
    const { result } = renderHook(() => {
      const res = usePlayerState({ slug: "", title: "" })

      Object.defineProperty(audioRef, "readyState", { value: 1 })
      res.audioRef.current = audioRef

      return res
    })

    expect(result.current.duration).toBe(DURATION)
    expect(result.current.duration).toBe(audioRef.duration)
    expect(result.current.loading).toBe(false)
  })

  it("trigger method triggers the playback", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    act(() => {
      result.current.triggerPlayer()
    })
    expect(result.current.playing).toBe(true)
    expect(audioRef.play).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.triggerPlayer()
    })
    expect(result.current.playing).toBe(false)
    expect(audioRef.pause).toHaveBeenCalledTimes(1)

    act(() => {
      result.current.triggerPlayer()
    })
    expect(result.current.playing).toBe(true)
    expect(audioRef.play).toHaveBeenCalledTimes(2)
  })

  it("seek method seeks properly", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    expect(result.current.time).toBe(0)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)

    act(() => {
      result.current.seek(15)
    })

    expect(result.current.time).toBe(15)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)

    act(() => {
      result.current.seek(-10)
    })

    expect(result.current.time).toBe(5)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)

    act(() => {
      result.current.seekTo(50)
    })

    expect(result.current.time).toBe(50)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)
  })

  it("changing volume works properly", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    expect(result.current.volume).toBe(1)
    expect(result.current.volume).toBe(audioRef.volume)

    act(() => {
      result.current.setVolume(0.5)
    })

    expect(result.current.volume).toBe(0.5)
    expect(result.current.volume).toBe(audioRef.volume)
  })

  it("changing playback rate works properly", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    expect(result.current.rate).toBe(1)
    expect(result.current.rate).toBe(audioRef.playbackRate)

    act(() => {
      result.current.setRate(1.5)
    })

    expect(result.current.rate).toBe(1.5)
    expect(result.current.rate).toBe(audioRef.playbackRate)
  })

  it("play interval is working properly", () => {
    const onPlay = jest.fn()
    const onPause = jest.fn()

    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "", onPlay, onPause }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
      audioRef.currentTime = 15
    })

    act(() => {
      result.current.triggerPlayer()
      // @ts-ignore
      result.current.handlers.onPlay({ target: audioRef })
    })

    act(() => jest.advanceTimersByTime(100))

    expect(result.current.playing).toBe(true)
    expect(result.current.time).toBe(15)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)
    expect(onPlay).toHaveBeenCalledTimes(1)

    act(() => {
      audioRef.currentTime = 35
      jest.advanceTimersByTime(100)
    })

    expect(result.current.time).toBe(35)
    expect(result.current.time).toBe(audioRef.currentTime)
    expect(result.current.progress).toBe(result.current.time / DURATION)

    act(() => {
      result.current.triggerPlayer()
      // @ts-ignore
      result.current.handlers.onPause({ target: audioRef })
    })

    expect(result.current.playing).toBe(false)
    expect(onPause).toHaveBeenCalledTimes(1)
  })

  it("finishes on the end of listening", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef
    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
      audioRef.currentTime = 15
    })

    act(() => {
      result.current.triggerPlayer()
      // @ts-ignore
      result.current.handlers.onPlay({ target: audioRef })
    })

    act(() => jest.advanceTimersByTime(100))

    expect(result.current.time).toBe(15)
    expect(result.current.time).toBe(audioRef.currentTime)

    act(() => {
      audioRef.currentTime = DURATION + 5
      jest.advanceTimersByTime(100)
    })

    expect(result.current.playing).toBe(false)
    expect(result.current.loading).toBe(false)
  })

  it("handles seek using a slider", () => {
    // Setup audio
    const { result } = renderHook(() => usePlayerState({ slug: "", title: "" }))
    result.current.audioRef.current = audioRef

    const sliderRef = document.createElement("div")
    Object.defineProperty(sliderRef, "clientWidth", { value: 100 })

    result.current.sliderRef.current = sliderRef

    act(() => {
      // @ts-ignore
      result.current.handlers.onLoadedMetadata({ target: audioRef })
    })

    act(() => {
      // @ts-ignore
      result.current.handleSliderSeek({ nativeEvent: { offsetX: 10 } })
    })

    expect(result.current.progress).toBeCloseTo(0.1)
    expect(result.current.time).toBe(0.1 * DURATION)
  })
})
