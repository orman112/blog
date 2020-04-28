import React from "react"
import { graphql, Link } from "gatsby"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import styled from "styled-components"

const SiteTitle = styled.h1.attrs({
  className: "title is-uppercase has-text-centered ",
})`
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(34, 47, 62, 0.5);
`

export default ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <SiteTitle>{siteTitle}</SiteTitle>
            <p>
              Welcome to my blog! My name is <Link to="/about">Clayton</Link>{" "}
              and I enjoy learning all about new and interesting topics,
              specifically in the technology and personal finance fields. I also
              enjoy teaching and discussing these topics, as I feel this is
              truly the only way to fully understand a subject. So, I created
              this <Link to="/blog">blog</Link> to do just that! I hope you
              enjoy reading some of my content as I take this journey to expand
              my knowledge on certain topics, while also rambling about a few
              other areas that interest me as well. I also hope you find them
              useful and learn something along the way!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "home.jpeg" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
