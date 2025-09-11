import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import NextAuthProvider from "../providers/NextAuthProvider";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StayNest - Trouvez votre refuge parfait",
  description:
    "Découvrez des logements uniques et vivez des expériences inoubliables partout dans le monde. Réservez votre séjour idéal sur StayNest.",
  keywords: "location vacances, airbnb, logement, voyage, séjour, hébergement",
  authors: [{ name: "StayNest" }],
  creator: "StayNest",
  publisher: "StayNest",
  openGraph: {
    title: "StayNest - Trouvez votre refuge parfait",
    description:
      "Découvrez des logements uniques et vivez des expériences inoubliables partout dans le monde.",
    url: "https://staynest.com",
    siteName: "StayNest",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StayNest - Trouvez votre refuge parfait",
    description:
      "Découvrez des logements uniques et vivez des expériences inoubliables partout dans le monde.",
    creator: "@staynest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: "en-US" | "de" }>;
}>) {
  return (
    <html lang={(await params).lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <div className="overflow-x-hidden">{children}</div>
        </NextAuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
