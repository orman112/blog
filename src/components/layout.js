import React from "react"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Nav />
      <main>
        <div className="container is-fluid">{children}</div>
      </main>
      <Footer>The Frugal Dev</Footer>
    </div>
  )
}

export default Layout
