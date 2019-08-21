import React from "react"
import { Link } from "gatsby"

import styles from './layout.module.scss'
import Nav from './nav'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div 
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
      >
        <header>{header}</header>
        <main className={styles.container}>
          <Nav />

          <div className={styles.content}>
            {children}
          </div>
          
          <Footer>
            The Frugal Dev
          </Footer>
        </main>
      </div>
    )
  }
}

export default Layout
