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

  const { social } = data.site.siteMetadata
  return (
    <footer>
      <div className="footer-container">
        <div className="footer">{children}</div>
        <div className="row">
          <a
            href={`https://www.github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-github">&nbsp;</div>
          </a>
          <a
            href={`https://www.linkedin.com/in/${social.linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="button-linkedin">&nbsp;</div>
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
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
