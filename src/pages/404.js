import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage = () => {
  return (
    <Layout pageClass="error">
      <div className="text-center py-12">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl mb-8">Page Not Found</h2>

        <img
          src="/img/404_animation.gif"
          alt="404 animation"
          className="mx-auto mb-8 max-w-md"
        />

        <p className="mb-8 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn">
            Go to Homepage
          </Link>
          <Link to="/blog/archive" className="btn btn-gray">
            Browse Blog Archive
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
