import React from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../styles/theme"
//Components
import Nav from "./nav"
import Footer from "./footer"
//Styles
import "../styles/bulma-override.scss"
import SideBar from "./sidebar"

const Layout = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 5rem;
`

const LayoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <Layout>
        <section className="section">
          <LayoutContainer className="container">
            <SideBar />
            {children}
          </LayoutContainer>
        </section>
        <Footer />
      </Layout>
    </ThemeProvider>
  )
}
