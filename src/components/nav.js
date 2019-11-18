import React from "react"
import { Link } from "gatsby"
import "./nav.scss"

const Nav = () => {
  const NavLink = ({ to, text }) => (
    <Link className="link" to={to}>
      {text}
    </Link>
  )

  return (
    <header className="header-container">
      <div className="row">
        <NavLink to="/" text="HOME" />
        <NavLink to="/blog" text="BLOG" />
        <NavLink to="/about" text="ABOUT" />
      </div>
    </header>
  )
}

export default Nav
