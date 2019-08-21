import React from "react"
import { Link } from "gatsby"

import styles from './layout.module.scss'
import Nav from './nav'
import Footer from './footer'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div  className={styles.container}>
        <main>
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
