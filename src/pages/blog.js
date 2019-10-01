import React from "react"
import { graphql } from "gatsby"

import Articles from "../components/articles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={data.location} title={siteTitle}>
      <SEO title="All Posts" />
      <Title text="All Posts" />
      <Articles posts={posts} />
    </Layout>
  )
}

export default Blog

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
            basePathPrefix
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            unsplash_image_id
          }
        }
      }
    }
  }
`
