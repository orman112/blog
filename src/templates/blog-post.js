import React from 'react'
import { Link, graphql } from 'gatsby'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Title from '../components/title'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    //Disqus integration
    const disqusConfig = {
      url: `${this.props.data.site.siteMetadata.siteUrl + this.props.location.pathname}`,
      identifier: post.id,
      title: post.title,
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <header>
            <Title text={post.frontmatter.title} />
            <strong>
              {post.frontmatter.date}
            </strong>
          </header>
          {/* <div style={{width: '100%', height: '200px', backgroundImage: `Url(https://source.unsplash.com/960x200/?${post.frontmatter.keywords})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', marginBottom: '30px'}}></div> */}
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr/>
          <footer>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <CommentCount config={disqusConfig} placeholder={'...'} />
        <Disqus config={disqusConfig} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
      }
    }
  }
`
