import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const featuredWork = [
  {
    image: "/portfolio/sbe.jpg",
    title: "sbe.com",
    description: "Type: Website | Role: Developer of responsive HTML/CSS templates, JavaScript modules and WordPress back-end functionality",
  },
  {
    image: "/portfolio/novella.jpg",
    title: "Novella Clinical",
    description: "Type: Website | Role: Developer of responsive WordPress theme and JavaScript interactions",
  },
  {
    image: "/portfolio/justworks.jpg",
    title: "Justworks",
    description: "Type: Website | Role: Rails and React developer",
  },
  {
    image: "/portfolio/integral.jpg",
    title: "Integral",
    description: "Type: Website | Role: WordPress developer, and information architect",
  },
]

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredWork.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <Layout pageClass="home">
      {/* Intro */}
      <div className="py-8">
        <div className="hr" />
        <p className="text-lg leading-relaxed">
          Hello! My name is Chris Johnson and I'm a frontend engineer with a passion for building user experiences through the intersection of web technology and design. I've led high-performing teams in delivering scalable, user-centric applications. I mentor engineers to think beyond code, considering the broader user experience while maintaining high standards for performance and accessibility. If you'd like to work together,{" "}
          <Link to="/about">please get in touch</Link>.
        </p>
        <div className="hr" />
      </div>

      {/* Main grid */}
      <div className="grid-layout">
        {/* Featured work */}
        <div className="col-2-3">
          <h1>
            <Link to="/portfolio" className="hover:no-underline">Featured work</Link>
          </h1>

          <div className="featured-work bg-gray-100 rounded-lg overflow-hidden">
            <div className="relative">
              {featuredWork.map((work, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                >
                  <img src={work.image} alt={work.title} className="w-full" />
                  <div className="p-4">
                    <span className="featured-work__slide__title">{work.title}</span>
                    <div className="featured-work__slide__description">
                      {work.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 pb-4">
              {featuredWork.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <p className="mt-4">
            <Link to="/portfolio" className="btn btn-small">
              See more work
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </p>
        </div>

        {/* Blog posts sidebar */}
        <aside className="col-1-3">
          <h1>
            <Link to="/blog" className="hover:no-underline">Blog posts</Link>
          </h1>

          <ul className="link-list">
            {posts.map((post) => {
              const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
                "en-US",
                { month: "numeric", day: "numeric", year: "2-digit" }
              )

              return (
                <li key={post.fields.slug}>
                  <Link to={post.fields.slug}>
                    <h3>
                      <b>{post.frontmatter.title}</b>
                      <span className="inner-subhead ml-2">{formattedDate}</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {post.excerpt}
                    </p>
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link to="/blog" className="btn btn-small mt-4">
            Read more blog posts
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </aside>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      limit: 4
    ) {
      nodes {
        excerpt(pruneLength: 80)
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
