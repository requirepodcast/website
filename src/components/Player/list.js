import React from "react"
import styled from "styled-components"
import { navigate, useStaticQuery, graphql } from "gatsby"

import { titleUrlParser } from "../../utils/titleUrlParser"

const Wrapper = styled.div`
  height: 100%;
  width: 25%;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #141621;
  padding: 10px;
  text-align: center;

  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 50vh;
  }
`

const Heading = styled.h1`
  margin: 0 0 0.5em 0;
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

const ItemHeading = styled.h3`
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
      allContentfulEpisode(sort: { order: ASC, fields: publicationDate }) {
        nodes {
          title
          publicationDate
          shortDescription
          id
        }
      }
    }
  `)

  const episodes = data.allContentfulEpisode.nodes

  return (
    <Wrapper>
      <Heading>Odcinki</Heading>
      <ListContainer>
        {episodes
          .map((episode, i) => (
            <ListItem key={episode.id}>
              <ItemHeading
                onClick={() =>
                  navigate(`/archive/${i}/${titleUrlParser(episode.title)}`)
                }
              >
                {episode.title}
              </ItemHeading>
              <p style={{ fontSize: "1.2em", color: "#ffffff88", margin: 0 }}>
                {" "}
                {episode.publicationDate}
              </p>
              <p>{episode.shortDescription}</p>
            </ListItem>
          ))
          .reverse()}
      </ListContainer>
    </Wrapper>
  )
}

export default List
