import React from "react"
import { graphql } from "gatsby"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import "./about.scss"

const About = ({ data }) => {
  const {
    site: {
      siteMetadata: { author, social, title },
    },
  } = data

  return (
    <Layout title={title}>
      <SEO title="About Me" />

      <div className="about-profile">
        <div className="about-picture" />
        <h2 className="about-name">{author}</h2>
      </div>
      <p className="about-text">
        I am a developer with close to 10 years of professional experience. I
        primarily dabble in the .Net and JavaScript space, but always enjoy
        learning new things. My other passions include personal finance topics,
        bourbon, and sports (I'm a huge Georgia Bulldogs fan). Feel free to
        reach out to me on{" "}
        <a
          className="social-link"
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        ,{" "}
        <a
          className="social-link"
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        , or{" "}
        <a
          className="social-link"
          href={`https://www.linkedin.com/in/${social.linkedIn}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        .
      </p>
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
  }
`
