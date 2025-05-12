import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Mokytojų tvarkaraštis",
  description: "Informacija apie mokytojus bei jų tvarkaraščius",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lt">
      <body className="container mx-auto max-w-screen-x1 bg-white text-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
