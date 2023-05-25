"use client"
import './globals.css'
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import Header from '@/components/header/header_cus'
import Footer from '@/components/footer/page'
import { usePathname } from 'next/navigation'
export const metadata = {
  title: 'OMRP - One milion reward point',
  description: 'One milion reward point',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname=usePathname()

  return (
    <html lang="en">
      <body>
      <Provider store={store}>
        {/* {pathname === '/login'?<></>: <Header/>} */}
        <Header/>
        {children}
        {/* {pathname === '/login'?<></>:<Footer/>} */}
        {/* <Footer/> */}
      </Provider>
      </body>
    </html>
  )
}
