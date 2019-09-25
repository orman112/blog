import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"
import Articles from "../components/articles"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Title text="The Frugal Dev" />
        <p className="alert">
          Welcome to my blog!! My name is <Link to="/about">Clayton</Link> and I
          enjoy learning all about new and interesting topics, specifically in
          the technology and personal finance fields. I also enjoy teaching and
          discussing these topics, as I feel this is truly the only way to fully
          understand a subject. So, I created this blog to do just that! I hope
          you enjoy reading some of my content as I take this journey to expand
          my knowledge on certain topics, while also rambling about a few other
          areas that interest me as well. I also hope you find them useful and
          learn something along the way!
        </p>
        <Articles posts={posts} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            keyword
          }
        }
      }
    }
  }
`
