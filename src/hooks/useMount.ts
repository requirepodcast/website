import { EffectCallback, useEffect } from "react"

export const useMount = (func: EffectCallback) => useEffect(func, [])
