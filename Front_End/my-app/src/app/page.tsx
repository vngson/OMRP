'use client';
import classNames from 'classnames/bind';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './page.module.css'
import ListAccount from './admin/list_account/page';

const cx = classNames.bind(styles);

export default function Home() {
const id:number = 2;
  return (
      <div className={cx('main')}>
          <ListAccount/>
      </div>
  )
}