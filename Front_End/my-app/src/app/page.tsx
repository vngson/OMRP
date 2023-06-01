'use client';
import { Inter } from 'next/font/google'
import classNames from 'classnames/bind';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { publicRoutes,privateRoutes } from './routes/page';
import styles from './page.module.css'
import AddProduct from './pages/add_product/page';

const cx = classNames.bind(styles);
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Router>
      <div className={cx('main')}>     
        {/* <Routes>
          {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={
                              <Page />
                      }
                  />
              );
          })}
          {privateRoutes.map((route, index) => {
              const Page = route.component;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={
                              <Page />
                      }
                  />
              );
          })}
        </Routes> */}
        <AddProduct/>
      </div>
    </Router>
  )
}