import localFont from "next/font/local";
import "./globals.css";
import {Lexend, Montserrat} from 'next/font/google'

const lexend = Lexend({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Team-CodeJS",
  description: "bit and build project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className}${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <link rel="icon" href="/codejslogo.jpg" sizes="any" />
        {children}
      </body>
    </html>
  );
}
