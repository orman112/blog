import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Article = styled.article`
  margin: 3rem 0;
  border-bottom: solid 1px rgba(42, 68, 105, 0.3);

  &:last-child {
    border-bottom: none;
  }

  .article-headline {
    margin-bottom: 0;
    font-weight: lighter;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    @media (max-width: ${props => props.theme.tablet}) {
      margin-top: 1rem;
    }
  }

  .article-date {
    opacity: 0.7;
  }

  .article-image {
    margin-right: 3rem;
    box-shadow: 1px 1px 15px -1px rgba(51, 48, 51, 0.42);
    border-radius: 8px;
  }

  .article-content {
    display: flex;
    padding-bottom: 4rem;

    @media (max-width: ${props => props.theme.tablet}) {
      display: block;
      padding-bottom: 2rem;
    }
  }

  .article-copy {
    display: flex;
    flex-direction: column;
  }

  .article-description {
    max-width: 45rem;

    @media (max-width: ${props => props.theme.tablet}) {
      margin-top: 1rem;
    }
  }
`

export default ({ posts }) => {
  return posts.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    return (
      <Article key={node.fields.slug}>
        <div className="article-content">
          <img
            className="article-image"
            src={`https://source.unsplash.com/${node.frontmatter.unsplash_image_id}/350x200/`}
            alt={title}
          />
          <div className="article-copy">
            <small className="article-date">{node.frontmatter.date}</small>
            <h3 className="article-headline title">
              <Link to={`${node.fields.path}`}>{title}</Link>
            </h3>
            <p
              className="article-description"
              dangerouslySetInnerHTML={{
                __html: node.frontmatter.description || node.excerpt,
              }}
            />
          </div>
        </div>
      </Article>
    )
  })
}
