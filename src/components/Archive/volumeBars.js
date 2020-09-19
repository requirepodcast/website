import React from "react"
import styled from "styled-components"
import { lighten } from "polished"

const BarsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const Bar = styled.button`
  display: block;
  border: none;
  width: 100%;
  height: calc(20% - 4px);
  margin: 2px 0;
  background-color: ${({ isActive, bar }) =>
    isActive ? lighten(bar / 6, "#ff5370") : `#141621`};
  cursor: pointer;
`

const bars = [0.2, 0.4, 0.6, 0.8, 1]

const VolumeBars = ({ setVolume, volume }) => (
  <BarsWrapper>
    <div
      style={{
        height: 20,
        verticalAlign: "middle",
        textAlign: "center",
        fontSize: 10,
      }}
    >
      Głośność
    </div>
    {bars
      .map((bar) => (
        <Bar
          onClick={() => setVolume(bar)}
          isActive={bar <= volume}
          bar={bar}
          key={bar}
        />
      ))
      .reverse()}
  </BarsWrapper>
)

export default VolumeBars
