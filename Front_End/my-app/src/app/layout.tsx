import './globals.css'

export const metadata = {
  title: 'OMRP - One milion reward point',
  description: 'One milion reward point',
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