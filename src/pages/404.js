import React from "react"
import { graphql, Link } from "gatsby"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1 className="title has-text-danger">Not Found</h1>
      <p className="error-message">
        You just hit a route that doesn&#39;t exist...the sadness.
      </p>
      <Link to="/">Home</Link>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
