import React from "react"
import { Link } from "gatsby"
//Styles
import "./tags.scss"

const Tags = ({ tags }) => (
  <p className="tags">
    {tags.map(tag => {
      return (
        <Link to={`/tags/${tag}`} key={tag} className="tag">
          #{tag}
        </Link>
      )
    })}
  </p>
)

export default Tags
