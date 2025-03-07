import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Real Estate Investment Calculator",
  description: "Calculate the return on your real estate investment",
  keywords: "real estate, investment, calculator",
  openGraph: {
    title: "Real Estate Investment Calculator",
    description: "Calculate the return on your real estate investment",
    type: "website",
    url: "https://www.rental-calc.nicolasbolt.com/",
    images: [
      {
        url: "https://www.rental-calc.nicolasbolt.com/og.svg",
        width: 800,
        height: 600,
        alt: "Real Estate Investment Calculator Social Image",
      },
    ],
  },
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
