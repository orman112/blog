import React from "react"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "./layout.scss"
import * as theme from "../styles/theme.scss"
import { ThemeProvider } from "styled-components"

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="layout-container">
        <Nav />
        <main>
          <div className="container is-fluid">{children}</div>
        </main>
        <Footer>The Frugal Dev</Footer>
      </div>
    </ThemeProvider>
  )
}

export default Layout
