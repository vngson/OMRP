"use client"
import './globals.css'
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import Header from '@/components/header/header_cus'
import Footer from '@/components/footer/page'
import "nprogress/nprogress.css";
import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { usePathname } from 'next/navigation'
import path from 'path'

const queryClient = new QueryClient()
export const metadata = {
  title: 'OMRP - One milion reward point',
  description: 'One milion reward point',
}
const TopProgressBar = dynamic(
  () => {
    return import("@/components/TopProgessBar");
  },
  { ssr: false },
);
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
      <TopProgressBar />
      <QueryClientProvider client={queryClient}>

        {pathname === '/login' || pathname.includes("/admin") || pathname.includes("/employee")?<></>: <Header/>}
        {/* <Header/> */}
        {children}
        </QueryClientProvider>
        {/* {pathname === '/login'?<></>:<Footer/>} */}
        {/* <Footer/> */}
      </Provider>
      </body>
    </html>
  )
}
