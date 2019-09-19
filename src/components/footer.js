import React from "react"
import styles from "./footer.module.scss"
import { useStaticQuery } from "gatsby"

const Footer = ({ children }) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedIn
          }
        }
      }
    }
  `)

  const { social } = data.site.siteMetadata
  return (
    <footer className={styles.container}>
      <div className={styles.footerContainer}>
        <div className={styles.footer}>{children}</div>
        <div className={styles.row}>
          <a
            href={`https://www.github.com/${social.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.buttonGithub}>&nbsp;</div>
          </a>
          <a
            href={`https://www.linkedin.com/in/${social.linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.buttonLinkedin}>&nbsp;</div>
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.buttonTwitter}>&nbsp;</div>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
