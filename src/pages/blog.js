import React from "react"
import { graphql, navigate } from "gatsby"
//Components
import Articles from "../components/articles"
import TagSelection from "../components/tag-selection"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const siteTitle = data.site.siteMetadata.title
  const allTags = posts.reduce((acc, post) => {
    return acc.concat(post.node.frontmatter.tags)
  }, [])
  const uniqueTags = Array.from(new Set(allTags))

  const handleTagSelection = event => {
    navigate(`tags/${event.target.value}`)
  }

  return (
    <Layout location={data.location} title={siteTitle}>
      <SEO title="Blog" />

      <TagSelection
        handleTagSelection={handleTagSelection}
        uniqueTags={uniqueTags}
      />

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
            tags
          }
        }
      }
    }
  }
`
