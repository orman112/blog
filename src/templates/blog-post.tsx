import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
//Components
import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
import Social from "../components/social"

const BlogPostTemplate = styled.article`
  min-width: 0;

  .post {
    border-bottom: ${props => props.theme.borderBottom};

    h3 {
      opacity: 0.7;
      margin-bottom: 0.3rem;
    }

    p {
      margin-top: 0.5rem;
    }

    img {
      display: block;
      margin: 0 auto;
    }

    .gatsby-highlight {
      margin-bottom: 1.7rem;
    }
  }

  .post-date {
    opacity: 0.6;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  .post-image {
    width: 100%;
  }
`

export default ({ data, location }) => {
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
        social: { twitterHandle },
      },
    },
  } = data

  const heroImage = `https://source.unsplash.com/${unsplash_image_id}/960x300/`

  return (
    <Layout>
      <SEO
        title={title}
        description={description || excerpt}
        imageSrc={heroImage}
      />
      <BlogPostTemplate>
        <h1 className="title is-1 has-text-centered">{title}</h1>

        <img className="post-image" src={heroImage} alt="" />

        <p className="post-date">{date}</p>
        <section
          className="post content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="post-meta">
          {tags && tags.length ? (
            <div>
              <span>Tags:</span>
              <Tags tags={tags} />
            </div>
          ) : null}
          <div>
            <span>Share:</span>
            <Social
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
      </BlogPostTemplate>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        social {
          twitterHandle
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
