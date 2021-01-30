import { useEffect, useState } from "react"

export function use100vh() {
  const [height, setHeight] = useState(measureHeight)

  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

  useEffect(() => {
    if (!wasRenderedOnClientAtLeastOnce) return

    const updateHeight = () => setHeight(measureHeight())
    updateHeight()

    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [wasRenderedOnClientAtLeastOnce])

  return wasRenderedOnClientAtLeastOnce ? height : "100vh"
}

function measureHeight() {
  if (!isClient()) return "100vh"
  return document.documentElement?.clientHeight || window.innerHeight
}

function useWasRenderedOnClientAtLeastOnce() {
  const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] = useState(false)

  useEffect(() => {
    if (isClient()) {
      setWasRenderedOnClientAtLeastOnce(true)
    }
  }, [])

  return wasRenderedOnClientAtLeastOnce
}

function isClient() {
  return typeof window !== "undefined" && typeof document !== "undefined"
}
