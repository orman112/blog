import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Title from "../components/title"

class About extends React.Component {
  render() {
    const { data } = this.props
    const { author, social, title } = data.site.siteMetadata

    return (
      <Layout location={this.props.location} title={title}>
        <SEO title="About Me" />
        <Title text="About Me"></Title>

        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author}
          style={{
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
        <strong>{author}</strong>
        <p>
          I am developer with over 5 years of professional experience. I
          primarily like to dabble in the .Net and Javascript world. My other
          passions include personal finance topics, bourbon, and sports (I'm a
          huge Georgia Bulldogs fan). Feel free to reach out to me on{" "}
          <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>,{" "}
          <a href={`https://github.com/${social.github}`}>Github</a>, or{" "}
          <a href={`https://www.linkedin.com/in/${social.linkedIn}/`}>
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
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
        title
      }
    }
  }
`
