import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealObserver from '@/components/RevealObserver';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BK Lab — Baek & Kim Research Group, KIST',
    template: '%s · BK Lab',
  },
  description:
    "BK Lab researches multifunctional oxide thin films, thermoelectrics, and ferroelectric devices at the Korea Institute of Science and Technology.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
