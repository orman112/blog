import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

const Nav = styled.nav`
  .navbar-item {
    opacity: 0.65;
    font-weight: bold;

    &:hover {
      opacity: 1;
    }

    &:not(:last-child) {
      padding-right: 1.6em;
    }
  }
`

export default () => {
  const [isActive, setIsActive] = useState(false)

  const data = useStaticQuery(graphql`
    query NavQuery {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(height: 25) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const NavLink = ({ to, text }) => (
    <Link className="navbar-item" to={to}>
      {text}
    </Link>
  )

  const handleClick = e => {
    setIsActive(!isActive)
  }

  return (
    <Nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <Img fixed={data.file.childImageSharp.fixed} />
          </Link>
          <a
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarItems"
            onClick={handleClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarItems"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-end">
            <NavLink to="/" text="HOME" />
            <NavLink to="/blog" text="BLOG" />
            <NavLink to="/about" text="ABOUT" />
          </div>
        </div>
      </div>
    </Nav>
  )
}
