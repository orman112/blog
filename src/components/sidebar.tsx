import { Link } from "gatsby"
import React from "react"

const SideBar = () => {
  return (
    <aside className="menu is-hidden-mobile is-fullheight is-flex-desktop">
      <ul className="menu-list">
        <li>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/uses">Uses</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </aside>
  )
}

export default SideBar
