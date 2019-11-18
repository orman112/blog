import React from "react"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <div className="container">
      <main>
        <Nav />
        <div className="content">{children}</div>
      </main>
      <Footer>The Frugal Dev</Footer>
    </div>
  )
}

export default Layout
