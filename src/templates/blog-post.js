import React from "react"
import { Link, graphql } from "gatsby"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "./blog-post.module.scss"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    //Disqus integration
    const disqusConfig = {
      url: `${this.props.data.site.siteMetadata.siteUrl +
        this.props.location.pathname}`,
      identifier: post.id,
      title: post.title,
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <h1 className={styles.postTitle}>{post.frontmatter.title}</h1>
          </header>
          <div
            className={styles.postImage}
            style={{
              backgroundImage: `Url(https://source.unsplash.com/${post.frontmatter.unsplash_image_id}/960x300/)`,
            }}
          ></div>
          <p className={styles.postDate}>{post.frontmatter.date}</p>
          <section
            className={styles.post}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr />
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link
                  to={`${previous.fields.basePathPrefix}${previous.fields.slug}`}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link
                  to={`${next.fields.basePathPrefix}${next.fields.slug}`}
                  rel="next"
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <CommentCount config={disqusConfig} placeholder={"..."} />
        <Disqus config={disqusConfig} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        unsplash_image_id
      }
    }
  }
`
