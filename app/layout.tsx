import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://beatriz-lucas-casamento.lucasedb87.chatgpt.site'),
  title: 'Beatriz & Lucas — Nosso casamento',
  description: 'Celebre com Beatriz e Lucas: conheça nossa história, confirme sua presença e escolha um presente divertido.',
  openGraph: {
    title: 'Beatriz & Lucas',
    description: 'Nosso casamento — venha celebrar essa história com a gente.',
    url: 'https://beatriz-lucas-casamento.lucasedb87.chatgpt.site',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Beatriz & Lucas — Nosso casamento' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beatriz & Lucas',
    description: 'Nosso casamento — venha celebrar essa história com a gente.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
