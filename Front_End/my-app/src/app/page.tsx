import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
 import LoginRegister from "../components/login_register/login_register"
// import {logo} from "@asset/images"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      Home
      {/* <LoginRegister/> */}
    </main>
  )
}
