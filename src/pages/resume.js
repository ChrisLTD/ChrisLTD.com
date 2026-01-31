import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"

const experience = [
  {
    years: "2022 – present",
    company: "Parker",
    title: "Lead Front-end Engineer",
    description: "Leading a team of 6 front-end engineers to build high-performing credit card, banking, and analytics app. Overhauled the front-end architecture, improving load performance by 90%. Lead drive to implement integration tests so we could confidently deploy the app multiple times per day. Spearheaded hiring and mentorship programs to grow the team from 2 to 6 engineers.",
  },
  {
    years: "2021 – 2022",
    company: "Two Sigma IQ",
    title: "Front-end Engineer",
    description: "Developed React UI for the customer-facing machine learning driven product. Worked with the design team to implement new features and improve the user experience. Integrated the app with the backend using GraphQL.",
  },
  {
    years: "2017 – 2021",
    company: "Justworks",
    title: "Lead Marketing Developer",
    description: "Built and maintained a Ruby on Rails & React site for the marketing team, supporting company growth from 30 to 800 employees. Led a team of 3 developers and managed integrations with Salesforce, HubSpot, Contentful, and Google Analytics. Oversaw migration from Wordpress to Ruby on Rails site powered by a React front-end.",
  },
  {
    years: "2016 – 2017",
    company: "Pave",
    title: "Front-end Developer",
    description: "Maintained and developed new features for an AngularJS single page app with a complex customer sign-up form. Simplified the design and improved the user experience of the sign-up form to increase conversions.",
  },
  {
    years: "2013 – 2018",
    company: "Sideways NYC",
    title: "Senior Developer",
    description: "Developed and maintained large websites for Sideways NYC clients, including American Express, SBE, Tamara Mellon, and Sony. Lead development and launch of Wordpress sites for Radius-TWC, and Arcade CG. Developed PHP and JavaScript modules for the relaunch of SBE.com. Maintain AngularJS and WordPress driven site for SLS Las Vegas.",
  },
  {
    years: null,
    company: "Yoeyo, Ltd.",
    title: "Founder and Principal",
    description: "Developed and maintained websites for national businesses and startups. Notable clients include Ogilvy & Mather, Fubo.tv, Blue Cross and Blue Shield, Scott Health and Safety, Duke University, and Michelin. Also, built and maintain two native iOS apps.",
  },
]

const skills = [
  {
    title: "Front-end web development",
    description: "Expert in React, Next.js, TypeScript, JavaScript, HTML, and CSS. Experienced with Tailwind, SASS, and Bootstrap. Strong understanding of Web Performance, SEO, Accessibility, and a proponent of Responsive Design and Mobile First development.",
  },
  {
    title: "Back-end web development",
    description: "Proficient in Node.js, Ruby on Rails, and Python. Experience integrating GraphQL, REST APIs, third-party services (Salesforce, HubSpot, Contentful, Sendgrid, and Google Analytics).",
  },
  {
    title: "Leadership",
    description: "Led teams of 6 developers, overseeing hiring, mentoring, and performance reviews. Cross-functional collaboration with design, product, and marketing teams. Agile & Scrum experience using Jira, Linear, Asana, and Trello.",
  },
  {
    title: "Testing & CI/CD",
    description: "Experience with Jest, Playwright, and React Testing Library. Implemented CI/CD pipelines (GitHub Actions, Vercel) for automated deployments.",
  },
]

const ResumePage = () => {
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

  return (
    <Layout pageClass="resume">
      <h1>
        <img
          src="/img/logo-black@2x.png"
          width="330"
          alt="Chris Johnson"
          className="max-w-[330px]"
        />
      </h1>

      <p className="text-xl text-gray-600 mb-8">{site.siteMetadata.tagline}</p>

      <div className="space-y-4 mb-8">
        <article className="flex gap-4">
          <aside className="w-24 text-sm text-gray-500 shrink-0">Site</aside>
          <a href="/">ChrisLTD.com</a>
        </article>

        <article className="flex gap-4">
          <aside className="w-24 text-sm text-gray-500 shrink-0">Email</aside>
          <a href="mailto:Chris@ChrisLTD.com">Chris@ChrisLTD.com</a>
        </article>

        <article className="flex gap-4">
          <aside className="w-24 text-sm text-gray-500 shrink-0">Phone</aside>
          <span>(917) 727-3545</span>
        </article>

        <article className="flex gap-4">
          <aside className="w-24 text-sm text-gray-500 shrink-0">Summary</aside>
          <p>
            Lead Front-end Engineer with extensive experience in building scalable web applications, leading high-performing teams, and optimizing front-end architecture. Expertise in React, Next.js, TypeScript, and modern UI frameworks. Passionate about performance optimization, testing best practices, and creating seamless user experiences. Proven ability to mentor developers, drive agile processes, and collaborate cross-functionally with product and design teams.
          </p>
        </article>
      </div>

      <div className="grid-layout">
        <div className="col-2-3">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>

          {experience.map((job, index) => (
            <article key={index} className="flex gap-4 mb-6">
              <aside className="w-32 text-sm text-gray-500 shrink-0">{job.years}</aside>
              <div>
                <h3 className="font-semibold">{job.company}</h3>
                <h4 className="text-gray-600 mb-2">{job.title}</h4>
                <p className="text-sm">{job.description}</p>
              </div>
            </article>
          ))}

          <h2 className="text-2xl font-semibold mb-6 mt-12">Education</h2>

          <article className="flex gap-4">
            <aside className="w-32 text-sm text-gray-500 shrink-0"></aside>
            <div>
              <h3 className="font-semibold">University of North Carolina at Chapel Hill</h3>
              <h4 className="text-gray-600 mb-2">Bachelor of Arts, Journalism &amp; Mass Communication</h4>
              <p className="text-sm">
                Major: Multimedia &amp; Graphic Design
                <br />
                Minor: History
              </p>
            </div>
          </article>
        </div>

        <div className="col-1-3">
          <h2 className="text-2xl font-semibold mb-6">Skills</h2>

          {skills.map((skill, index) => (
            <article key={index} className="mb-6">
              <h4 className="font-semibold mb-2">{skill.title}</h4>
              <p className="text-sm">{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" />

export default ResumePage
