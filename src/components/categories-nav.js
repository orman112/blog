import React from "react"
import string from "lodash/string"

import { Link } from "gatsby"

const CategoriesNav = ({ posts }) => {
  const categories = posts.reduce((acc, post) => {
    return acc.add(post.node.frontmatter.category)
  }, new Set())

  return (
    <>
      <span>Filter by Category:</span>{" "}
      {Array.from(categories).map((cat, index, array) => {
        let isLastItem = index === array.length - 1

        return (
          <>
            <Link key={cat} to={`/category/${cat}`}>
              {string.capitalize(cat)}
            </Link>
            {isLastItem ? "" : " | "}
          </>
        )
      })}
    </>
  )
}

export default CategoriesNav
