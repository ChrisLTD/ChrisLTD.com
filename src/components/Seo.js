import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, pathname, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const url = `${site.siteMetadata.siteUrl}${pathname || ""}`
  const ogImage = `https://mugshotbot.com/m?mode=light&color=d74824&pattern=hideout&hide_watermark=true&url=${url}`

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={site.siteMetadata.author} />

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={title ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${site.siteMetadata.social?.twitter}`} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="144x144" href="/img/favicons/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/img/favicons/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="57x57" href="/img/favicons/apple-touch-icon-57x57.png" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* RSS */}
      <link rel="alternate" type="application/rss+xml" title="Chris Johnson's Blog Feed" href="/blog/feed.xml" />

      {children}
    </>
  )
}

export default Seo
