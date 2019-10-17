import React from "react"
import { Link } from "gatsby"

const CategoriesNav = ({ posts }) => {
  const categories = posts.reduce((acc, post) => {
    return acc.add(post.node.frontmatter.category)
  }, new Set())

  return (
    <>
      <h2>Filter by Category:</h2>
      {Array.from(categories).map(cat => {
        return (
          <Link key={cat} to={`category/${cat}`}>
            {cat}
          </Link>
        )
      })}
    </>
  )
}

export default CategoriesNav
