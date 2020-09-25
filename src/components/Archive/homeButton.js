import React from "react"
import styled from "styled-components"
import { AiFillHome } from "react-icons/ai"

const Anchor = styled.a`
  color: #00bfff;
  font-size: calc(30px + 1vw);
  text-align: center;
  padding: 0;

  &:hover {
    color: #ffffff;
  }
`
class homeButton extends React.Component {
  render() {
    return (
      <Anchor href="/">
        <AiFillHome />
      </Anchor>
    )
  }
}

export default homeButton
