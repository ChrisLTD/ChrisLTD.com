import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import "../styles/global.css"

const Layout = ({ children, pageClass }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded">
        Skip to content
      </a>

      <Header pageClass={pageClass} />

      <main id="main" className="flex-grow py-8">
        <div className="container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
