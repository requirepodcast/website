import { useEffect } from "react"
import { ScrollScene } from "scrollscene"
import gsap from "gsap"

export const useHeadingAnimation = (ref) => {
  useEffect(() => {
    const wrapper = ref.current
    const heading = ref.current.querySelector("h1")

    gsap.set(heading, { opacity: 0, y: "-=30" })

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
    })
    tl.to(heading, { opacity: 1, y: "+=30" })

    new ScrollScene({
      triggerElement: wrapper,
      gsap: { timeline: tl },
      triggerHook: 0.5,
    })
  }, [ref])
}
