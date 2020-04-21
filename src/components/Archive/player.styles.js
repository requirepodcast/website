import styled from "styled-components"
import { Icon } from "@mdi/react"

export const PlayerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  background-color: #1d1f2d;
  flex-shrink: 0;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`

export const ControlsWrapper = styled.div`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const SpectrumWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const PlayButton = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  border: none;
  margin: 5px auto;
  background-color: white;
  color: #1d1f2d;
  font-family: unset;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: background-color 0.3s;
  padding: 0;
  text-align: center;

  > * {
    vertical-align: middle;
    margin: 0 auto;
  }

  &:hover {
    background-color: #dddddd;
  }
`

export const DurationInfo = styled.div`
  margin-top: 1em;
  font-size: 12px;
  color: white;
`

export const TimeButtons = styled.div`
  color: white;
  height: 30px;
  padding: 5px;

  > * {
    margin: 0 5px;
  }
`

export const TimeButton = styled(Icon)`
  transition: color 0.3s;
  color: white;
  cursor: pointer;

  &:hover {
    color: #dddddd;
  }
`

export const Slider = styled.div`
  width: 100%;
  margin-top: 7px;
  margin-bottom: 3px;
  height: 20px;
  cursor: pointer;
  background-color: #141621;
  position: relative;
`

export const SliderTime = styled.div`
  width: ${({ width }) => width}%;
  height: 100%;
  background: linear-gradient(30deg, #ff5370 0%, #ff97b4 100%);
  transition: width 0.1s ease-in-out;
  min-width: 10px;
`

export const Tooltip = styled.div`
  position: absolute;
  height: 100%;
  border-right: 2px solid white;
  vertical-align: middle;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: white;
  z-index: 2;
  top: 0;
  padding: 0 2px;
  transform: translateX(-100%);
`
