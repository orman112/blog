import React from "react"
import { graphql } from "gatsby"
//Components
import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
//Styles
import styles from "./blog-post.module.scss"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

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
          <Tags tags={post.frontmatter.tags} />
          <section
            className={styles.post}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr />
        </article>
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
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        unsplash_image_id
        tags
      }
    }
  }
`
