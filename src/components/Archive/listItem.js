import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  padding: 12px;
  background-color: ${({ current }) => current && "#181a25"};

  &:not(:first-of-type) {
    border-top: 2px solid #0f111a;
  }
`
const ItemHeading = styled(Link)`
  display: block;
  cursor: pointer;
  font-size: 1.1em;
  text-decoration: none;
  color: white;
  margin: 0;
  box-sizing: content-box;

  :hover {
    text-decoration: underline;
  }
`

const ListItem = ({ episode, current }) => (
  <Wrapper current={current}>
    <p style={{ color: "#ffffff88", margin: 0, fontSize: "0.9em" }}>
      {episode.childMarkdownRemark.frontmatter.publicationDate}
    </p>
    <ItemHeading to={`/archive${episode.childMarkdownRemark.frontmatter.slug}`}>
      {episode.childMarkdownRemark.frontmatter.title}
    </ItemHeading>
  </Wrapper>
)

export default ListItem
