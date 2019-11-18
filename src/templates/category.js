import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import string from "lodash/string"
//Components
import Articles from "../components/articles"
import Layout from "../components/layout"

const Category = ({ pageContext, data }) => {
  const { category } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const categoryHeader = `${totalCount} ${string.capitalize(category)} Post${
    totalCount === 1 ? "" : "s"
  }`

  return (
    <Layout location={data.location}>
      <h1>{categoryHeader}</h1>
      <Articles posts={edges} />
    </Layout>
  )
}

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
          }),
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
      }).isRequired
    ),
  }),
}

export default Category
export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { in: [$category] }, published: { eq: true } }
      }
    ) {
      totalCount
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
