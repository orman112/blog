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
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Home" />
      <section className="hero">
        <div className="hero-body">
          <HomePage>
            <h1 className="title is-uppercase has-text-centered">
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
            <div className="level">
              <section className="message has-text-centered is-info">
                <div className="message-body">
                  <p className="is-size-4">I'm here to geek out!</p>
                  <p className="is-size-2">🤓</p>
                  <a
                    href="/tags/technology"
                    className="button is-info is-medium m-t-md"
                  >
                    Technology
                  </a>
                </div>
              </section>

              <section className="message has-text-centered is-success">
                <div className="message-body">
                  <p className="is-size-4">Show me the money!</p>
                  <p className="is-size-2">💰</p>
                  <a
                    href="/tags/finance"
                    className="button is-success is-medium m-t-md"
                  >
                    Finance
                  </a>
                </div>
              </section>
            </div>
          </HomePage>
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
