"use client"
import './globals.css'
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import Header from '@/components/header/page'
import Footer from '@/components/footer/page'
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
        <Header/>
        {children}
        <Footer/>
      </Provider>
      </body>
    </html>
  )
}
