import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"

const BlogIndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout pageClass="blog">
      {posts.map((post) => {
        const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
          "en-US",
          { month: "numeric", day: "numeric", year: "2-digit" }
        )

        return (
          <article key={post.fields.slug} className="mb-12">
            <header className="mb-4">
              <h1 className="flex flex-wrap items-baseline gap-x-4">
                <Link to={post.fields.slug} className="font-semibold hover:no-underline">
                  {post.frontmatter.title}
                </Link>
                <span className="inner-subhead">{formattedDate}</span>
              </h1>
            </header>

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        )
      })}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link to="/blog/archive" className="btn">
          Browse the blog archive
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Blog" />

export default BlogIndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 10
    ) {
      nodes {
        html
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
