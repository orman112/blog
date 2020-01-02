import React from "react"
import { Link } from "gatsby"

import "./articles.scss"

const Articles = ({ posts }) => {
  return posts.map(({ node }) => {
    const title = node.frontmatter.title || node.fields.slug
    return (
      <article className="article" key={node.fields.slug}>
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
      </article>
    )
  })
}

export default Articles
