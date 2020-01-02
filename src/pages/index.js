import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import "./index.scss"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-uppercase has-text-centered site-title">
              {siteTitle}
            </h1>
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
        <div className="home-image">
          <Img
            fluid={data.file.childImageSharp.fluid}
            style={{ maxHeight: "100%" }}
          />
        </div>
      </section>
    </Layout>
  )
}

export default BlogIndex

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
