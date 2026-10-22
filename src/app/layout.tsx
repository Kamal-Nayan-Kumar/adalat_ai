import type { Metadata } from 'next';
import './globals.css';
import { IconSprite } from '@/components/IconSprite';

export const metadata: Metadata = {
  title: 'Adalat AI — Practice Law. Experience Court. Anywhere.',
  description: 'Adalat AI is a multi-agent LLM courtroom simulator for Indian law students and judiciary aspirants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
