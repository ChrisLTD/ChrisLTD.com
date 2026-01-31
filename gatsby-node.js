const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    // Get the file path
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    // Extract year and month from directory structure or filename
    // Files are in format: YYYY/YYYY-MM-DD-title.md
    const match = parsedFilePath.name.match(/^(\d{4})-(\d{2})-\d{2}-(.+)$/)

    let slug
    if (match) {
      const year = match[1]
      const month = match[2]
      const title = match[3]
      slug = `/blog/${year}/${month}/${title}/`
    } else {
      slug = createFilePath({ node, getNode, basePath: "_posts" })
    }

    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  // Create blog post pages
  const blogPostTemplate = path.resolve("./src/templates/blog-post.js")
  const categoryTemplate = path.resolve("./src/templates/category.js")

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            category
            categories
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading posts", result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog post pages
  posts.forEach((post, index) => {
    const previousPostId = index === posts.length - 1 ? null : posts[index + 1].id
    const nextPostId = index === 0 ? null : posts[index - 1].id

    createPage({
      path: post.fields.slug,
      component: blogPostTemplate,
      context: {
        id: post.id,
        previousPostId,
        nextPostId,
      },
    })
  })

  // Collect all categories
  const categories = new Set()
  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categories.add(post.frontmatter.category)
    }
    if (post.frontmatter.categories) {
      // Handle space-separated categories string
      const cats = post.frontmatter.categories.split(/\s+/)
      cats.forEach((cat) => categories.add(cat))
    }
  })

  // Create category pages
  categories.forEach((category) => {
    createPage({
      path: `/blog/category/${category}/`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })

  // Create redirects for old URLs
  const redirects = [
    { from: "/blog/feed/", to: "/blog/feed.xml" },
    { from: "/about.html", to: "/about" },
    { from: "/portfolio.html", to: "/portfolio" },
    { from: "/projects.html", to: "/projects" },
    { from: "/blog/archive.html", to: "/blog/archive" },
    { from: "/resume.html", to: "/resume" },
    { from: "/404.html", to: "/404" },
  ]

  redirects.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: true,
    })
  })
}

// Create schema customization for consistent field types
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
      category: String
      categories: String
      layout: String
      draft: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}
