import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from "../components/seo"

import Title from '../components/title'

class About extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        
        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO title="About Me" />
                <Title text="About Me"></Title>
                <p>
                    Refer to bio component to update about page.
                </p>
            </Layout>
        )
    }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`