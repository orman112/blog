import React from "react"
import "./footer.scss"
import { useStaticQuery } from "gatsby"

const Footer = ({ children }) => {
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
      siteMetadata: { github, linkedIn, twitter },
    },
  } = data

  return (
    <footer className="footer has-text-white">
      <div className="container level">
        <div className="level-left">{children}</div>
        <div>
          <a
            href={`https://www.github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-github">&nbsp;</div>
          </a>
          <a
            href={`https://www.linkedin.com/in/${linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-linkedin">&nbsp;</div>
          </a>
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-twitter">&nbsp;</div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
