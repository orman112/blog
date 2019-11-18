import React from "react"
import { graphql, Link } from "gatsby"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import "./404.scss"

const NotFoundPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location title={siteTitle}>
      <SEO title="404: Not Found" />
      <div className="content">
        <h1 className="header">Not Found</h1>
        <p className="errorMessage">
          You just hit a route that doesn&#39;t exist...the sadness.
        </p>
        <Link to="/">Home</Link>
      </div>
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
