import React from "react"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "./layout.scss"

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer>The Frugal Dev</Footer>
    </>
  )
}

export default Layout
