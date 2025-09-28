import './globals.css';
import type { Metadata } from 'next';
import { futuraHeavyOblique, gestura } from './fonts';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jordan Campbell',
  description: 'Personal website of Jordan Campbell',
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
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
