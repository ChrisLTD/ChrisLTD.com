import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = ({ pageClass }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            tagline
          }
        }
      }
    `
  )

  const navItems = [
    { path: "/", label: "Home", activeClass: "home" },
    { path: "/portfolio", label: "Portfolio", activeClass: "portfolio" },
    { path: "/projects", label: "Projects", activeClass: "projects" },
    { path: "/blog", label: "Blog", activeClass: "blog" },
    { path: "/about", label: "About", activeClass: "about" },
  ]

  return (
    <header className="py-6 border-b border-gray-200">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="inline-block">
              <img
                src="/img/logo@2x.png"
                width="330"
                alt="Chris Johnson"
                className="max-w-[250px] md:max-w-[330px]"
              />
            </Link>
            <div className="text-gray-medium text-sm mt-1">
              {site.siteMetadata.tagline}
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-1 md:gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded transition-colors ${
                      pageClass === item.activeClass
                        ? "bg-primary text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
