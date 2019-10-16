import React from "react"

const TagSelection = ({ uniqueTags, handleTagSelection }) => {
  return (
    <form>
      <label>
        Choose a tag to see filtered posts:{" "}
        <select onChange={handleTagSelection}>
          {uniqueTags.map(tag => {
            return (
              <option key={tag} value={tag}>
                {tag}
              </option>
            )
          })}
        </select>
      </label>
    </form>
  )
}

export default TagSelection
