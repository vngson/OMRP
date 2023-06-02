'use client';
import { Inter } from 'next/font/google'
import classNames from 'classnames/bind';
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'
import Header from '../components/header/page'
import Footer from '../components/footer/page'


const cx = classNames.bind(styles);
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      Home

    </main>
  )
}
