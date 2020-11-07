import { useEffect } from "react"

export const useMount = (func) => useEffect(func, [])
