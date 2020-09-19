import React from "react"
import styled from "styled-components"
import { AiOutlineHome } from "react-icons/ai"

const Anchor = styled.a`
  color: #00BFFF;
  font-size: calc(20px + 1vw);
  padding: 10px;
  text-align: center;

  &:hover {
    color: #ffffff;
    font-size: calc(22px + 1vw);
    padding: 9px;
    text-align: center;
  }
`
class homeButton extends React.Component {
  render() {
    return <Anchor href="/"> <AiOutlineHome /> </Anchor>
  }
}

export default homeButton