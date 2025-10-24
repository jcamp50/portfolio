import './globals.css';
import type { Metadata } from 'next';
import { futuraHeavyOblique, gestura } from './fonts';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.jordancampbell.me'),
  title: 'Jordan Campbell - Software Engineer & Full-Stack Developer',
  description:
    'Software engineer with experience at Fidelity, Lockheed Martin, and Netflix. Specializing in TypeScript, React, Angular, Node.js, and full-stack development. View my portfolio, projects, and resume.',
  keywords:
    'Jordan Campbell, software engineer, full-stack developer, TypeScript, React, Angular, Node.js, Python, portfolio, web development, Fidelity, Lockheed Martin, Netflix, UCF',
  authors: [{ name: 'Jordan Campbell' }],
  creator: 'Jordan Campbell',
  publisher: 'Jordan Campbell',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jordancampbell.me',
    title: 'Jordan Campbell - Software Engineer & Full-Stack Developer',
    description:
      'Software engineer with experience at Fidelity, Lockheed Martin, and Netflix. Specializing in TypeScript, React, Angular, Node.js, and full-stack development.',
    siteName: 'Jordan Campbell Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jordan Campbell - JC Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jordan Campbell - Software Engineer & Full-Stack Developer',
    description:
      'Software engineer with experience at Fidelity, Lockheed Martin, and Netflix. Specializing in TypeScript, React, Angular, Node.js, and full-stack development.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.jordancampbell.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      data-snap='true'
      className={`${futuraHeavyOblique.variable} ${gestura.variable}`}
    >
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jordan Campbell',
              jobTitle: 'Software Engineer',
              description:
                'Software engineer with experience at Fidelity, Lockheed Martin, and Netflix. Specializing in TypeScript, React, Angular, and full-stack development.',
              url: 'https://www.jordancampbell.me',
              image: 'https://www.jordancampbell.me/images/headshot.svg',
              email: '7jacampbell@gmail.com',
              sameAs: [
                'https://github.com/jcamp50',
                'https://linkedin.com/in/campbell-jordan',
              ],
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'University of Central Florida',
                sameAs: 'https://www.ucf.edu',
              },
              worksFor: [
                {
                  '@type': 'Organization',
                  name: 'Fidelity Investments',
                  jobTitle: 'Software Engineering Intern',
                  startDate: '2025-06',
                  endDate: '2025-08',
                },
              ],
              knowsAbout: [
                'TypeScript',
                'JavaScript',
                'React',
                'Angular',
                'Node.js',
                'Express.js',
                'Python',
                'Java',
                'C++',
                'PostgreSQL',
                'MongoDB',
                'AWS',
                'Docker',
                'Full-Stack Development',
                'Software Engineering',
                'System Design',
                'Web Development',
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
