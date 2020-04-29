import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "../styles/bulma-override.scss"

const Layout = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 5rem;
`

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Nav />
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer>The Frugal Dev</Footer>
      </Layout>
    </ThemeProvider>
  )
}
