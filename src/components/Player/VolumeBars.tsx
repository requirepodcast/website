import React from "react"
import { lighten } from "polished"
import styles from "./volumeBars.module.scss"

type VolumeBarsProps = {
  setVolume: (vol: number) => void
  volume: number
}

const bars = [0.2, 0.4, 0.6, 0.8, 1]

const VolumeBars = ({ setVolume, volume }: VolumeBarsProps) => (
  <div className={styles.wrapper}>
    <div className={styles.label}>Głośność</div>
    {bars
      .map((bar) => (
        <button
          className={styles.bar}
          onClick={() => setVolume(bar)}
          style={{
            backgroundColor: bar <= volume ? lighten(bar / 6, "#ff5370") : `#141621`,
          }}
          key={bar}
          aria-label={`Głośność ${bar * 100}%`}
        />
      ))
      .reverse()}
  </div>
)

export default VolumeBars
