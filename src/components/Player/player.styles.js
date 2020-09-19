import styled from "styled-components"
import { Icon } from "@mdi/react"
import { lighten } from "polished"

export const PlayerWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #1d1f2d;
  flex-shrink: 0;
`

export const PlayerSectionLeft = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: solid 1px #141621;
`

export const PlayerSectionCenter = styled.div`
  flex: 1;
  height: 100px;
  display: flex;
  flex-direction: column;
`

export const PlayerSectionRight = styled.div`
  width: 75px;
  height: 100px;
  border-left: solid 1px #141621;
`

export const PlayButton = styled.button`
  display: block;
  width: 50px;
  height: 50px;
  border: none;
  margin: 0 auto;
  color: white;
  font-family: unset;
  cursor: pointer;
  appearance: none;
  transition: color 0.3s;
  padding: 0;
  text-align: center;
  background-color: transparent;

  > * {
    vertical-align: middle;
    margin: 0 auto;
  }

  &:hover {
    color: #bbbbbb;
  }
`

export const DurationInfo = styled.div`
  font-size: 10px;
  color: white;
`

export const TimeButtons = styled.div`
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    margin: 0 5px;
  }
`

export const TimeButtonIcon = styled(Icon)`
  transition: color 0.3s;
  color: white;

  &:hover {
    color: #dddddd;
  }
`

export const TimeButton = styled.button`
  color: inherit;
  background-color: transparent;
  border: none;
  padding: none;
  margin: 0;
  cursor: pointer;
`

export const Slider = styled.div`
  width: 100%;
  height: 20px;
  cursor: pointer;
  background-color: #141621;
  position: relative;
`

export const SliderTime = styled.div`
  height: 100%;
  background: linear-gradient(
    30deg,
    #ff5370 0%,
    ${lighten(0.15, "#ff5370")} 100%
  );
  transition: width 0.1s ease-in-out;
  min-width: 10px;
  width: 0%;
`
