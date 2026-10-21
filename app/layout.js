import { Orbitron, Inter } from 'next/font/google';
import { site } from './site';
import './globals.css';

const display = Orbitron({ subsets: ['latin'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

const title = `${site.name} — ${site.role}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.tagline,
  alternates: { canonical: '/' },
  openGraph: { title, description: site.tagline, url: '/', type: 'website', images: ['/hero.webp'] },
  twitter: { card: 'summary_large_image', title, description: site.tagline, images: ['/hero.webp'] },
};

export const viewport = { themeColor: '#05010f' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
