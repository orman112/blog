import React from "react"

import styles from "./layout.module.scss"
import Nav from "./nav"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className={styles.container}>
        <main>
          <Nav />

          <div className={styles.content}>{children}</div>

          <Footer>The Frugal Dev</Footer>
        </main>
      </div>
    )
  }
}

export default Layout
