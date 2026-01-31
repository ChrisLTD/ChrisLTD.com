import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const projects = [
  {
    url: "http://longdayapp.com",
    image: "/projects/long_day.jpg",
    title: "Long Day",
    description: "An iPhone app for planning your day task by task. Includes notifications to keep you on task. Written in Swift.",
  },
  {
    url: "http://secondbrowser.com",
    image: "/projects/second_browser.jpg",
    title: "Second Browser",
    description: "An iPad app that enables you to have two Safari windows side by side using iOS's Split View or Slide Over features. Written in Swift.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_thumbnail_gallery",
    image: "/projects/jquery.jpg",
    title: "Yo Thumbnail Gallery",
    description: "A jQuery plugin for creating a Google Images-esque thumbnail grid.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_fading_slideshow",
    image: "/projects/jquery.jpg",
    title: "Yo Fading Slideshow",
    description: "A jQuery slideshow plugin that uses just two elements on the page and swaps css background-images.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_simple_filter",
    image: "/projects/jquery.jpg",
    title: "Yo Simple Filter",
    description: "A jQuery plugin to do simple single category filtering on a set of elements.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_faux_pagination",
    image: "/projects/jquery.jpg",
    title: "Yo Faux Pagination",
    description: "A jQuery plugin that will give you controls to page through a set of page elements by hiding and showing them in order. Just activate the plugin on a wrapper element and it will do the work.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_status_tools",
    image: "/projects/expressionengine.jpg",
    title: "Yo Status Tools",
    description: "An Expression Engine plugin to let you change the status of a channel entry, delete old entries by status, or read a status from a template.",
  },
  {
    url: "https://github.com/ChrisLTD/yo_portal",
    image: "/projects/yo_portal.jpg",
    title: "Yo Portal",
    description: "A PHP powered start page for your web browser that displays RSS feeds for the NY Times, Woot, Weather, and Stock Quotes. It also displays a set of static links you can customize in the config file. The design is fluid and responsive, so it will scale down for phones and tablets.",
  },
  {
    url: "https://github.com/ChrisLTD/textexpander_snippets",
    image: "/projects/textexpander.jpg",
    title: "TextExpander Snippets",
    description: "Custom snippets for use in TextExpander, the keyboard shortcut utility.",
  },
  {
    url: "https://github.com/ChrisLTD/textexpander_snippets",
    image: "/projects/fever_ipad.jpg",
    title: "Fever iPad Theme",
    description: "Modified version of the Fever iPhone theme, optimized for the iPad screen.",
  },
]

const ProjectsPage = () => {
  return (
    <Layout pageClass="projects">
      <h1 className="text-center">Projects</h1>

      <ul className="centered-blocks">
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.url}>
              <img src={project.image} alt={project.title} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const Head = () => <Seo title="Projects" />

export default ProjectsPage
