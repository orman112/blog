import React from "react"
import { Link } from "gatsby"

const Tags = ({ tags }) => (
  <p className="tags">
    {tags.map(tag => {
      return (
        <Link to={`/tags/${tag}`} key={tag} className="tag is-info is-light">
          #{tag}
        </Link>
      )
    })}
  </p>
)

export default Tags
