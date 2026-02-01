import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const CategoryTemplate = ({ data, pageContext }) => {
  const { category } = pageContext
  const posts = data.allMarkdownRemark.nodes
  const totalCount = data.allMarkdownRemark.totalCount

  // Format category name for display (capitalize, replace hyphens)
  const categoryTitle = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <Layout pageClass="blog">
      <h1>
        Category: {categoryTitle}
        <span className="inner-subhead ml-4">({totalCount} posts)</span>
      </h1>

      <ul className="link-list mt-8">
        {posts.map((post) => {
          const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
            "en-US",
            {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            }
          )

          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug}>
                <h3>
                  <b>{post.frontmatter.title}</b>
                  <span className="inner-subhead ml-2">{formattedDate}</span>
                </h3>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="mt-8">
        <Link to="/blog/archive" className="btn">
          View all posts
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => {
  const categoryTitle = pageContext.category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return <Seo title={`Category: ${categoryTitle}`} />
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          category: { eq: $category }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date
        }
      }
    }
  }
`
