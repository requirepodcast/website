import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

const Wrapper = styled.aside`
    width: 100%;
    height: 400px;
  }
`

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #00bfff;
`

const ListContainer = styled.div`
  overflow: auto;
  flex: 1;
  text-align: center;
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
