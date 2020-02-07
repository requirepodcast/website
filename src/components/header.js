import React from "react"
import styled from "styled-components"

const Navbar = styled.header`
  z-index: 2;
  position: absolute;
  top: 0;
  width: 100vw;
  height: 5em;
  border-bottom: 0.5px solid #dddddd75;
  background-color: #0f111a;
`

const Header = () => {
  return <Navbar>Hellow!</Navbar>
}

export default Header
