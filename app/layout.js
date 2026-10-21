import { Syne, Inter, JetBrains_Mono } from 'next/font/google';
import { site } from './site';
import './globals.css';

const display = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const title = `${site.name} — ${site.role}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.tagline,
  alternates: { canonical: '/' },
  openGraph: { title, description: site.tagline, url: '/', type: 'profile', images: ['/og.jpg'] },
  twitter: { card: 'summary_large_image', title, description: site.tagline, images: ['/og.jpg'] },
};

export const viewport = { themeColor: '#050806' };

// Hides intro elements until GSAP has set their start state; 4s failsafe if the CDN is down.
// Theme: dark by default, a saved choice wins. Set before first paint so there's no flash.
const boot =
  "var d=document.documentElement;d.classList.add('js');setTimeout(function(){d.classList.add('ready')},4000);" +
  "var t='dark';try{t=localStorage.getItem('theme')||t}catch(e){}d.dataset.theme=t;";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
