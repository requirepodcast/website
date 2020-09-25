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
  color: #00bfff;
  font-size: 1em;
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
  border-bottom: 1px solid #00bfff;
`

const ListContainer = styled.div`
  overflow: auto;
  flex: 1;
  text-align: left;
`

const ItemHeading = styled(Link)`
  display: block;
  cursor: pointer;
  font-size: 1.3em;
  font-weight: 1000;
  text-decoration: none;
  color: white;
  margin: 1;

  :hover {
    color: #00bfff;
  }
`

export default function List() {
  const data = useStaticQuery(graphql`
    query {
      allAnchorEpisode {
        nodes {
          title
          id
          link
          pubDate
          isoDate(formatString: "DD MMM YYYY")
          contentSnippet
          enclosure {
            url
          }
        }
      }
    }
  `)
  const episodes = data.allAnchorEpisode.nodes

  return (
    <Wrapper>
      <ListContainer>
        {episodes
          .map((episode) => (
            <ListItem key={episode.id}>
              <ItemHeading to={`/archive/${episode.id}`}>
                {episode.title}
              </ItemHeading>
              <p style={{ fontSize: "1em", color: "#919191", margin: 0 }}>
                {episode.isoDate}
              </p>
              <p
                style={{
                  fontSize: "0.9em",
                  color: "#Fafafa",
                  marginVertical: 1,
                }}
              >
                {episode.contentSnippet}
              </p>
            </ListItem>
          ))
          .reverse()}
      </ListContainer>
    </Wrapper>
  )
}
