import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import ListItem from "./ListItem"

const Wrapper = styled.aside`
  height: 100%;
  width: 400px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #141621;
  text-align: center;
  padding-bottom: 12px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 400px;
  }
`

const Heading = styled.h1`
  height: 100px;
  line-height: 100px;
  color: #ff5370;
  font-size: 2em;
  font-weight: 800;
  width: 100%;
  margin: 0;

  &::after {
    border-top: 2px solid #fff;
    display: block;
    width: 20%;
    content: "";
    margin: -26px auto 0;
  }
`

const ListContainer = styled.ul`
  overflow: auto;
  text-align: left;
  flex: 1;
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const List = ({ episode: currentEpisode }) => {
  const data = useStaticQuery(graphql`
    query EpisodeList {
      allFile(
        filter: { sourceInstanceName: { eq: "episodes" } }
        sort: {
          order: ASC
          fields: childMarkdownRemark___frontmatter___publicationDate
        }
      ) {
        nodes {
          id
          childMarkdownRemark {
            frontmatter {
              title
              slug
              shortDescription
              publicationDate
            }
          }
        }
      }
    }
  `)

  const episodes = data.allFile.nodes

  return (
    <Wrapper>
      <Heading>Odcinki</Heading>
      <ListContainer>
        {episodes
          .map((episode, i) => (
            <ListItem
              key={i}
              episode={episode}
              current={
                episode.childMarkdownRemark.frontmatter.slug ===
                currentEpisode.frontmatter.slug
              }
            />
          ))
          .reverse()}
      </ListContainer>
    </Wrapper>
  )
}

export default List
