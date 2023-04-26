import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import LoginRegister from '@/components/login_register/login_register'
import Header from './header/page'
import Footer from './footer/page'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      Home
      <LoginRegister/>
    </main>
  )
}
