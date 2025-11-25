import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Simple Will Maker',
  description: 'Create a basic will in minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
