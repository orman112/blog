import React from "react"
import { Link } from "gatsby"
import styles from "./nav.module.scss"

class Nav extends React.Component {
  render() {
    const NavLink = props => (
      <Link className={styles.link} to={props.to}>
        {props.text}
      </Link>
    )

    return (
      <header className={styles.container}>
        <div className={styles.row}>
          <NavLink to="/" text="HOME" />
          <NavLink to="/blog" text="ALL POSTS" />
          <NavLink to="/about" text="ABOUT" />
        </div>
      </header>
    )
  }
}

export default Nav
