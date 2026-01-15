import "./globals.css"

export const metadata = {
  title: "Scientific Calculator",
  description: "Calculator App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
