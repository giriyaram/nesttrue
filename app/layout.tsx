import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NestTrue — Know Before You Buy",
    template: "%s | NestTrue",
  },
  description:
    "Honest, hyperlocal buyer intelligence for Indian real estate. Real data, real risks, no broker spin.",
  metadataBase: new URL("https://nesttrue.com"),
  openGraph: {
    siteName: "NestTrue",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
