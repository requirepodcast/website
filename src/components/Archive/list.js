import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

const Wrapper = styled.aside`
  height: 100%;
  width: 500px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #141621;
  padding: 10px;
  text-align: center;

  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 400px;
  }
`

const Heading = styled.h1`
  margin: 0.5em 0;
  color: #ff5370;
  font-size: 2.5em;
  font-weight: 800;
  display: inline-block;
  width: 100%;

  &::after {
    border-top: 2px solid #fff;
    display: block;
    width: 33.3%;
    content: "";
    margin: 4px auto 0;
  }
`

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 2px solid #ff5370;

  &:last-of-type {
    border-bottom: none;
  }
`

const ListContainer = styled.div`
  overflow: auto;
  flex: 1;
  text-align: left;
`

const ItemHeading = styled(Link)`
  display: block;
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;
  color: white;
  margin: 0;

  :hover {
    text-decoration: underline;
  }
`

const List = () => {
  const data = useStaticQuery(graphql`
    query {
      allAnchorEpisode {
        nodes {
          title
          guid
          link
          pubDate
          contentSnippet
        }
      }
    }
    
  `)
  const episodes = data.allAnchorEpisode.nodes

  return (
    <Wrapper>
      <Heading>Daftar Audio</Heading>
      <ListContainer>
        {episodes
          .map((episode) => (
            <ListItem key={episode.guid}>
              <ItemHeading
                to={`/archive${episode.guid}`}
              >
                {episode.title}
              </ItemHeading>
              <p style={{ fontSize: "1.2em", color: "#ffffff88", margin: 0 }}>
                {" "}
                {episode.pubDate}
              </p>
              <p>{episode.contentSnippet}</p>
            </ListItem>
          ))
          .reverse()}
      </ListContainer>
    </Wrapper>
  )
}

export default List
