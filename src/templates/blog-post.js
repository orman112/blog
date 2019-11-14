import React from "react"
import { graphql } from "gatsby"
//Components
import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
//Styles
import "./blog-post.scss"
import Share from "../components/share"
import Disqus from "disqus-react"

const BlogPostTemplate = ({ data, location }) => {
  const {
    post: {
      id,
      html,
      excerpt,
      frontmatter: { title, tags, description, unsplash_image_id, date },
      fields: { path },
    },
    site: {
      siteMetadata: {
        siteUrl,
        social: { twitterHandle, disqusShortName },
      },
    },
  } = data
  const disqusConfig = {
    shortname: disqusShortName,
    config: {
      url: `${siteUrl}${path}`,
      title,
      identifier: id,
    },
    twitterHandle,
  }
  const heroImage = `https://source.unsplash.com/${unsplash_image_id}/960x300/`

  return (
    <Layout location={location} title={title}>
      <SEO
        title={title}
        description={description || excerpt}
        imageSrc={heroImage}
      />
      <article>
        <header>
          <h1 className="post-title">{title}</h1>
        </header>
        <div
          className="post-image"
          style={{
            backgroundImage: `Url(${heroImage})`,
          }}
        ></div>
        <p className="post-date">{date}</p>
        <section className="post" dangerouslySetInnerHTML={{ __html: html }} />
        <div className="post-meta">
          {tags && tags.length ? (
            <div className="post-meta__block">
              <span className="title">Tags:</span>
              <Tags tags={tags} />
            </div>
          ) : null}
          <div className="post-meta__block">
            <span className="title">Share:</span>
            <Share
              socialConfig={{
                twitterHandle,
                config: {
                  url: `${siteUrl}${path}`,
                  title,
                },
              }}
              tags={tags}
            />
          </div>
        </div>
      </article>
      <Disqus.DiscussionEmbed {...disqusConfig} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitterHandle
          disqusShortName
        }
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        path
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        unsplash_image_id
        tags
      }
    }
  }
`
