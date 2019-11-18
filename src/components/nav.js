import React from "react"
import { Link } from "gatsby"
import "./nav.scss"

class Nav extends React.Component {
  render() {
    const NavLink = props => (
      <Link className="link" to={props.to}>
        {props.text}
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
}

export default Nav
