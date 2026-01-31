import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { title, date } = post.frontmatter

  // Format date as M/D/YY
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  })

  return (
    <Layout pageClass="blog">
      <article>
        <header className="mb-8">
          <h1 className="flex flex-wrap items-baseline gap-x-4">
            <span className="font-semibold">{title}</span>
            <span className="inner-subhead">{formattedDate}</span>
          </h1>
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
        <Link to="/blog/archive" className="btn">
          Browse the blog archive
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <a
          href="https://itunes.apple.com/us/app/long-day-day-planner/id1062689795?ls=1&mt=8&at=11l5Li"
          className="btn"
        >
          Download my app Long Day
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
    </Layout>
  )
}

export const Head = ({ data, location }) => {
  const post = data.markdownRemark
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt}
      pathname={location.pathname}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        category
      }
      fields {
        slug
      }
    }
  }
`
