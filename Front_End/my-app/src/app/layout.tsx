"use client"
import './globals.css'
import { Provider } from "react-redux"
import { store } from "@/redux/store"
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
      <body>
      <Provider store={store}>
        {children}
      </Provider>
      </body>
    </html>
  )
}
