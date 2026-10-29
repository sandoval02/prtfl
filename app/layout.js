import { Inter } from 'next/font/google';
import { site } from './site';
import './globals.css';

const body = Inter({ subsets: ['latin'], variable: '--font-body' });

const title = site.seoTitle;
const description = site.seoDescription;
const ogImage = { url: '/og.jpg', width: 1200, height: 630, alt: `${site.name}, portfolio front page` };
const [firstName, ...lastName] = site.name.split(' ');

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: new URL(site.url).hostname,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    site.name, 'software developer', 'aspiring penetration tester', 'full-stack developer', 'web developer Philippines',
    'Next.js', 'Flutter', 'FastAPI', 'cybersecurity', 'portfolio',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title, description, url: '/', siteName: site.name, locale: 'en_US', type: 'profile',
    firstName, lastName: lastName.join(' '), images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  ...(site.googleVerification && { verification: { google: site.googleVerification } }),
};

export const viewport = { themeColor: '#ffffff' };

// .js lets the scroll fade-ins hide content only when the script that reveals it can run.
// Theme: light by default, a saved choice wins. Set before first paint so there's no flash.
const boot =
  "var d=document.documentElement;d.classList.add('js');" +
  "var t='light';try{t=localStorage.getItem('theme')||t}catch(e){}d.dataset.theme=t;";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={body.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
