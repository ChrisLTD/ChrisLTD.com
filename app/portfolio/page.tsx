import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
};

const portfolioItems = [
  {
    image: '/portfolio/integral.jpg',
    title: 'Integral',
    type: 'Website',
    role: 'WordPress developer, and information architect',
    url: 'https://teamintegral.com/',
  },
  {
    image: '/portfolio/justworks.jpg',
    title: 'Justworks',
    type: 'Website',
    role: 'Ruby on Rails and React developer',
    url: 'https://justworks.com/',
  },
  {
    image: '/portfolio/socent-law-tracker.jpg',
    title: 'Social Enterprise Law Tracker',
    type: 'Website',
    role: 'Angular developer',
    url: 'https://socentlawtracker.org/',
  },
  {
    image: '/portfolio/aclassicpartyrental.jpg',
    title: 'A Classic Party Rental',
    type: 'Website',
    role: 'WordPress developer',
    url: 'https://www.aclassicpartyrental.com/',
  },
  {
    image: '/portfolio/paladin.png',
    title: 'Paladin',
    type: 'Website',
    role: 'Developer of responsive HTML/CSS templates and JavaScript interactions',
    url: 'https://www.joinpaladin.com/',
  },
  {
    image: '/portfolio/sbe.jpg',
    title: 'sbe.com',
    type: 'Website',
    role: 'Developer of responsive HTML/CSS templates, JavaScript modules and WordPress back-end functionality',
    url: 'http://sbe.com/',
  },
  {
    image: '/portfolio/sls-las-vegas.jpg',
    title: 'SLS Las Vegas',
    type: 'Website',
    role: 'Developer of AngularJS functionality and WordPress integration',
    url: 'http://slslasvegas.com/',
  },
  {
    image: '/portfolio/radius-twc.jpg',
    title: 'Radius TWC',
    type: 'Website',
    role: 'Developer of responsive WordPress theme and jQuery interactions',
    url: 'http://radiustwc.com/',
  },
  {
    image: '/portfolio/novella.jpg',
    title: 'Novella Clinical',
    type: 'Website',
    role: 'Developer of responsive WordPress theme and jQuery interactions',
    url: 'http://novellaclinical.com/',
  },
  {
    image: '/portfolio/cree-showcase.jpg',
    title: 'Cree Showcase',
    type: 'Touch-screen installation',
    role: 'Developer of back-end API for use with Backbone JS powered touch-screen',
    url: null,
  },
  {
    image: '/portfolio/unc-pns.jpg',
    title: 'UNC Partnership for National Security',
    type: 'Website',
    role: 'Developer of responsive HTML/CSS templates and jQuery interactions',
    url: 'http://uncserves.northcarolina.edu/',
  },
  {
    image: '/portfolio/duke-tip.jpg',
    title: 'Duke TIP',
    type: 'Website',
    role: 'Developer of Drupal theme and jQuery interactions',
    url: 'http://tip.duke.edu',
  },
  {
    image: '/portfolio/unc-holiday-map.jpg',
    title: 'UNC Interactive Holiday Map',
    type: 'Web App',
    role: 'Developer of responsive HTML/CSS templates and jQuery interactions',
    url: 'http://holiday.uncgreetings.org/',
  },
  {
    image: '/portfolio/scott-safety.jpg',
    title: 'Scott Health & Safety Partner Center',
    type: 'Intranet Website',
    role: 'Developer of HTML/CSS templates and jQuery interactions',
    url: null,
  },
  {
    image: '/portfolio/unc-global.jpg',
    title: 'UNC Global',
    type: 'Website',
    role: 'Designer',
    url: 'http://global.unc.edu',
  },
  {
    image: '/portfolio/marine-sciences.jpg',
    title: 'UNC Marine Sciences',
    type: 'Website',
    role: 'Designer, developer of HTML/CSS templates, and information architect',
    url: 'http://marine.unc.edu/',
  },
  {
    image: '/portfolio/fyi-carolina-email.jpg',
    title: 'FYI Carolina',
    type: 'Email',
    role: 'Designer and developer of HTML email template',
    url: null,
  },
];

const clients = [
  'Justworks',
  'The University of North Carolina at Chapel Hill',
  'Two Sigma IQ',
  'Parker',
  'Ogilvy & Mather',
  'Blue Cross and Blue Shield',
  'Michelin',
  'Duke University',
  'North Carolina Museum of Art',
  'American Express',
  'IGN',
  'R+M',
  'Sideways NYC',
  'Cree Lighting',
  'MetaMetrics',
  'Scott Health & Safety',
  'PPD',
  'Novella Clinical',
  'Lonerider Brewing',
  'Elevation Burger',
  'Sarah Lee Guthrie and Johnny Irion',
  'Top of the Hill Restaurant and Distillery',
  'Franklin Hotel',
  'Image Space Incorporated',
  'Piedmont Health',
  'Doe & Ingalls',
  'Peak, Swirles & Cavallito Properties',
  'Dunwell',
  'LabCorp',
  'Arcade CG',
  'SBE',
  'Radius TWC',
  'Responsify',
  'Pave',
  'The Pallet Alliance',
  'Koroberi',
  'Integral',
  'VMG Creative',
];

export default function PortfolioPage() {
  return (
    <>
      <h1>Portfolio</h1>

      {portfolioItems.map((item, index) => (
        <article key={index} className="portfolio-item">
          <div className="image-col">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
          <div>
            <h2 className="mt-0">{item.title}</h2>
            <p>
              <small className="uppercase text-light-gray text-xs">Type:</small>{' '}
              {item.type}
              <br />
              <small className="uppercase text-light-gray text-xs">Role:</small>{' '}
              {item.role}
            </p>
            {item.url && (
              <p>
                <a
                  href={item.url}
                  className="btn btn-small"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit &rarr;
                </a>
              </p>
            )}
          </div>
        </article>
      ))}

      <article className="mt-12 pt-8 border-t border-faint-gray">
        <h2>Clients</h2>
        <ul className="columns-2 md:columns-3 gap-4 list-none pl-0">
          {clients.map((client) => (
            <li key={client} className="mb-1 text-sm">
              {client}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
