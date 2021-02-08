import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Home, Edit3, Briefcase, Tool, Coffee } from "react-feather"

const SidebarWrapper = styled.aside`
  min-width: 20%;
  margin-right: 1em;
  a {
    margin: 1em 0;
    padding: 1em;
  }
  span {
    padding-left: 1em;
  }
`

const SideBar = () => {
  return (
    <SidebarWrapper className="menu is-hidden-mobile">
      <ul className="menu-list">
        <li>
          <Link to="/">
            <Home />
            <span>Home</span>
          </Link>
          <Link to="/blog">
            <Edit3 />
            <span>Blog</span>
          </Link>
          <Link to="/uses">
            <Briefcase />
            <span>Uses</span>
          </Link>
          <Link to="/projects">
            <Tool />
            <span>Projects</span>
          </Link>
          <Link to="/about">
            <Coffee />
            <span>About</span>
          </Link>
        </li>
      </ul>
    </SidebarWrapper>
  )
}

export default SideBar
