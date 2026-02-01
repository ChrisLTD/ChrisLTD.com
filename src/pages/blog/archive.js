import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"

const BlogArchivePage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout pageClass="blog">
      <h1>Blog Archive</h1>

      {/* Search form using DuckDuckGo */}
      <form
        method="get"
        action="https://duckduckgo.com/"
        className="mb-8"
      >
        <div className="flex gap-2">
          <input
            type="hidden"
            name="sites"
            value="chrisltd.com/blog"
          />
          <input
            type="text"
            name="q"
            placeholder="Search the blog..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </div>
      </form>

      <ul className="link-list">
        {posts.map((post) => {
          const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
            "en-US",
            { month: "numeric", day: "numeric", year: "numeric" }
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
        <a href="/blog/feed.xml" className="btn">
          Subscribe via RSS
          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
          </svg>
        </a>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Blog Archive" />

export default BlogArchivePage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date
          title
        }
      }
    }
  }
`
