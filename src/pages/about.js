import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import "./about.scss"

const About = ({ data }) => {
  const {
    site: {
      siteMetadata: {
        author,
        title,
        social: { githubUserName, linkedInSuffix, twitterHandle },
      },
    },
  } = data

  return (
    <Layout title={title}>
      <SEO title="About Me" />
      <div className="about-profile has-text-centered is-flex">
        <Img
          fixed={data.file.childImageSharp.fixed}
          className="about-picture"
        />
        <h2 className="title is-2">{author}</h2>
        <p className="about-text is-size-5">
          I am a developer with close to 10 years of professional experience. I
          primarily dabble in the .Net and JavaScript space, but always enjoy
          learning new things. My other passions include personal finance
          topics, bourbon, and sports (I'm a huge Georgia Bulldogs fan). Feel
          free to reach out to me on{" "}
          <a
            className="social-link"
            href={`https://twitter.com/${twitterHandle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          ,{" "}
          <a
            className="social-link"
            href={`https://github.com/${githubUserName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          , or{" "}
          <a
            className="social-link"
            href={`https://www.linkedin.com/in/${linkedInSuffix}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        author
        social {
          twitterHandle
          githubUserName
          linkedInSuffix
        }
        title
      }
    }
    file(relativePath: { eq: "profile-pic.jpg" }) {
      childImageSharp {
        fixed(height: 250, width: 250, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
