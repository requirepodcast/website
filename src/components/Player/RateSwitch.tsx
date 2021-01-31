import React, { memo } from "react"
import styles from "./rateSwitch.module.scss"

const rates = {
  0.75: 1,
  1: 1.25,
  1.25: 1.5,
  1.5: 2,
  2: 2.5,
  2.5: 0.75,
}

type RateSwitchProps = {
  rate: number
  setRate: (rate: number) => void
}

const RateSwitch = memo(({ rate, setRate }: RateSwitchProps) => (
  <div className={styles.wrapper}>
    <p className={styles.label}>Szybkość</p>
    <button className={styles.button} onClick={() => setRate(rates[rate])}>
      {rate}x
    </button>
  </div>
))

export default RateSwitch
