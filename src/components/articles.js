import React from "react"
import { Link } from "gatsby"

import styles from "./articles.module.scss"

class Articles extends React.Component {
  render() {
    const { posts } = this.props

    return posts.map(({ node }) => {
      const title = node.frontmatter.title || node.fields.slug
      return (
        <article className={styles.article} key={node.fields.slug}>
          <div className={styles.articleContent}>
            <img
              className={styles.articleImage}
              src={`https://source.unsplash.com/${node.frontmatter.unsplash_image_id}/350x200/`}
              alt={title}
            />
            <div className={styles.articleCopy}>
              <small className={styles.articleDate}>
                {node.frontmatter.date}
              </small>
              <h3 className={styles.articleHeadline}>
                <Link to={`${node.fields.basePathPrefix}${node.fields.slug}`}>
                  {title}
                </Link>
              </h3>
              <p
                className={styles.articleDescription}
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
}

export default Articles
