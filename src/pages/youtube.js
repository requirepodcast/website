const isBrowser = () => typeof window !== "undefined"

const YouTube = () => {
  if (isBrowser())
    window.location.href =
      "https://www.youtube.com/channel/UCec_mTVjUKQAsSilMJ3J1TQ?sub_confirmation=1"
  return null
}

export default YouTube
