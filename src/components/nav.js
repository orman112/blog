import React from "react"
import { Link } from "gatsby"
import "./nav.scss"

const Nav = () => {
  const NavLink = ({ to, text }) => (
    <Link className="navbar-item" to={to}>
      {text}
    </Link>
  )

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/content/assets/favicon-32x32.png" />
          </Link>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbar" className="navbar-menu">
          <div className="navbar-end">
            <NavLink to="/" text="HOME" />
            <NavLink to="/blog" text="BLOG" />
            <NavLink to="/about" text="ABOUT" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
