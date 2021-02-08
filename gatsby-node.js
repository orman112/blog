const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`)
  const tagsTemplate = path.resolve(`./src/templates/tags.js`)
  const seriesTemplate = path.resolve("./src/templates/series.js")
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
                path
              }
              frontmatter {
                title
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        seriesGroup: allMarkdownRemark {
          group(field: frontmatter___series) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  //pages to create with templates
  const posts = result.data.postsRemark.edges
  const tags = result.data.tagsGroup.group
  const series = result.data.seriesGroup.group

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `${post.node.fields.path}`,
      component: blogPostTemplate,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagsTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  series.forEach(series => {
    createPage({
      path: `/series/${_.kebabCase(series.fieldValue)}/`,
      component: seriesTemplate,
      context: {
        series: series.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slugValue = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slugValue,
    })
    createNodeField({
      name: `path`,
      node,
      value: `/blog${slugValue}`,
    })
  }
}
