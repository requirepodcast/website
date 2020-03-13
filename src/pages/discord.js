const isBrowser = () => typeof window !== "undefined"

const Discord = () => {
  if (isBrowser()) window.location.href = "https://discord.gg/kk5gh6T"
  return null
}

export default Discord
