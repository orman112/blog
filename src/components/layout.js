import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "../styles/bulma-override.scss"
import SideBar from "./sidebar.tsx"

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
        <SideBar />
        <section className="section">
          <div className="container">{children}</div>
        </section>
        <Footer>The Frugal Dev</Footer>
      </Layout>
    </ThemeProvider>
  )
}
