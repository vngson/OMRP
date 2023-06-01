'use client';
import { Inter } from 'next/font/google'
import classNames from 'classnames/bind';
import styles from './page.module.css'
import AddProduct from './pages/add_product_admin/page';

const cx = classNames.bind(styles);
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={cx('main')}>     
      <AddProduct />
    </div>
  )
}