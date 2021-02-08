import React from "react"
import { graphql, Link } from "gatsby"
//Components
import Layout from "../components/layout"
import SEO from "../components/seo"
//Styles
import styled from "styled-components"

const HomePage = styled.div`
  .level {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    @media (max-width: ${props => props.theme.mobile}) {
      margin: 0;
      max-width: 100%;
    }

    .message {
      margin: 2em;

      @media (max-width: ${props => props.theme.mobile}) {
        margin: 2em 0;
        width: 100%;
      }
    }
  }

  h1 {
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(34, 47, 62, 0.5);
  }
`

export default ({ data, location }) => {
  // const siteTitle = data.site.siteMetadata.title
  const {
    site: {
      siteMetadata: {
        title,
        social: { githubUserName, linkedInSuffix, twitterHandle },
      },
    },
  } = data

  return (
    <Layout location={location} title={title}>
      <SEO title="Home" />
      <section className="hero">
        <HomePage>
          <h1 className="title is-1 is-uppercase has-text-centered">{title}</h1>
          <p>
            Welcome! My name's <Link to="/about">Clayton</Link> and I'm a
            software developer based out of Louisville, KY. I'm constantly
            striving to learn new and exciting technologies, and figured a{" "}
            <Link to="/blog">blog</Link> was a good way to capture that journey
            and maybe help others in the process. Feel free to explore the site
            and reach out to me on{" "}
            <a
              href={`https://www.github.com/${githubUserName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            , or{" "}
            <a
              href={`https://www.linkedin.com/in/${linkedInSuffix}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>{" "}
            if you want to learn more!
          </p>
        </HomePage>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        social {
          githubUserName
          linkedInSuffix
          twitterHandle
        }
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
