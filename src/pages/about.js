import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./about.module.scss"

class About extends React.Component {
  render() {
    const { data } = this.props
    const { author, social, title } = data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title}>
        <SEO title="About Me" />

        <div className={styles.aboutProfile}>
          <div className={styles.aboutPicture} />
          <h2 className={styles.aboutName}>{author}</h2>
        </div>
        <p className={styles.aboutText}>
          I am a developer with close to 10 years of professional experience. I
          primarily dabble in the .Net and JavaScript space, but always enjoy
          learning new things. My other passions include personal finance
          topics, bourbon, and sports (I'm a huge Georgia Bulldogs fan). Feel
          free to reach out to me on{" "}
          <a
            className={styles.socialLink}
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          ,{" "}
          <a
            className={styles.socialLink}
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          , or{" "}
          <a
            className={styles.socialLink}
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
}

export default About

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        author
        social {
          twitter
          github
          linkedIn
        }
        title
      }
    }
  }
`
