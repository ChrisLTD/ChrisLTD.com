import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

const projects = [
  {
    title: 'Long Day',
    image: '/projects/long_day.jpg',
    url: 'http://longdayapp.com',
    description:
      'An iPhone app for planning your day task by task. Includes notifications to keep you on task. Written in Swift.',
  },
  {
    title: 'Second Browser',
    image: '/projects/second_browser.jpg',
    url: 'http://secondbrowser.com',
    description:
      "An iPad app that enables you to have two Safari windows side by side using iOS's Split View or Slide Over features. Written in Swift.",
  },
  {
    title: 'Yo Thumbnail Gallery',
    image: '/projects/jquery.jpg',
    url: 'https://github.com/ChrisLTD/yo_thumbnail_gallery',
    description:
      'A jQuery plugin for creating a Google Images-esque thumbnail grid.',
  },
  {
    title: 'Yo Fading Slideshow',
    image: '/projects/jquery.jpg',
    url: 'https://github.com/ChrisLTD/yo_fading_slideshow',
    description:
      'A jQuery slideshow plugin that uses just two elements on the page and swaps css background-images.',
  },
  {
    title: 'Yo Simple Filter',
    image: '/projects/jquery.jpg',
    url: 'https://github.com/ChrisLTD/yo_simple_filter',
    description:
      'A jQuery plugin to do simple single category filtering on a set of elements.',
  },
  {
    title: 'Yo Faux Pagination',
    image: '/projects/jquery.jpg',
    url: 'https://github.com/ChrisLTD/yo_faux_pagination',
    description:
      'A jQuery plugin that will give you controls to page through a set of page elements by hiding and showing them in order. Just activate the plugin on a wrapper element and it will do the work.',
  },
  {
    title: 'Yo Status Tools',
    image: '/projects/expressionengine.jpg',
    url: 'https://github.com/ChrisLTD/yo_status_tools',
    description:
      'An Expression Engine plugin to let you change the status of a channel entry, delete old entries by status, or read a status from a template.',
  },
  {
    title: 'Yo Portal',
    image: '/projects/yo_portal.jpg',
    url: 'https://github.com/ChrisLTD/yo_portal',
    description:
      'A PHP powered start page for your web browser that displays RSS feeds for the NY Times, Woot, Weather, and Stock Quotes. It also displays a set of static links you can customize in the config file. The design is fluid and responsive, so it will scale down for phones and tablets.',
  },
  {
    title: 'TextExpander Snippets',
    image: '/projects/textexpander.jpg',
    url: 'https://github.com/ChrisLTD/textexpander_snippets',
    description:
      'Custom snippets for use in TextExpander, the keyboard shortcut utility.',
  },
  {
    title: 'Fever iPad Theme',
    image: '/projects/fever_ipad.jpg',
    url: 'https://github.com/ChrisLTD/textexpander_snippets',
    description:
      'Modified version of the Fever iPhone theme, optimized for the iPad screen.',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <h1 className="text-center">Projects</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none pl-0">
        {projects.map((project) => (
          <li key={project.title} className="mb-0">
            <a
              href={project.url}
              className="block text-body-color no-underline hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded mb-3"
              />
              <h2 className="text-lg mt-0 mb-2">{project.title}</h2>
              <p className="text-sm text-light-gray">{project.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
