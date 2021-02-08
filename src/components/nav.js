import React, { useState } from "react"
import { Link } from "gatsby"
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
          <div className="navbar-end is-uppercase">
            <NavLink to="/" text="Home" />
            <NavLink to="/blog" text="Blog" />
            <NavLink to="/uses" text="Uses" />
            <NavLink to="/projects" text="Projects" />
            <NavLink to="/about" text="About" />
          </div>
        </div>
      </div>
    </Nav>
  )
}
