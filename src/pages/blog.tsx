import React from "react"
import { graphql } from "gatsby"
//Components
import Articles from "../components/articles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

const ArticlesContainer = styled.div``

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  // const siteTitle = data.site.siteMetadata.title

  return (
    <Layout>
      <SEO title="Blog" />

      <ArticlesContainer>
        <Articles posts={posts} />
      </ArticlesContainer>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            path
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
