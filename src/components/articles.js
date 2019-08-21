import React from 'react'
import { Link } from 'gatsby'

import styles from './articles.module.scss'

class Articles extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3 className={styles.articleHeadline}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })
    )
  }
}

export default Articles