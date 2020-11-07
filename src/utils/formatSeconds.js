import { pad } from "./pad"

export const formatSeconds = (sec) => {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec - hours * 3600) / 60)
  const seconds = Math.floor(sec - hours * 3600 - minutes * 60)

  return `${hours ? `${hours}:` : ""}${pad(minutes)}:${pad(seconds)}`
}
