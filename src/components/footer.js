import React from "react"
import { useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Twitter, GitHub, Linkedin } from "react-feather"

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5rem;

  .button-icon {
    display: inline-flex;
    padding: 0.125em 0.75em;
    margin-right: 0.625em;
  }
`

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitterHandle
            githubUserName
            linkedInSuffix
          }
        }
      }
    }
  `)
  const {
    site: {
      siteMetadata: {
        social: { githubUserName, linkedInSuffix, twitterHandle },
      },
    },
  } = data

  return (
    <Footer className="footer has-text-white">
      <div className="container level">
        <div className="level-left">{children}</div>
        <div>
          <a
            href={`https://www.github.com/${githubUserName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-icon github">
              <GitHub />
            </div>
          </a>
          <a
            href={`https://www.linkedin.com/in/${linkedInSuffix}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-icon linkedin">
              <Linkedin />
            </div>
          </a>
          <a
            href={`https://twitter.com/${twitterHandle}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-icon twitter">
              <Twitter />
            </div>
          </a>
        </div>
      </div>
    </Footer>
  )
}
