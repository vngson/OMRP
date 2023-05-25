import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'
import Header from '../components/header/header_cus'
import Footer from '../components/footer/page'
import { arrow_img, banner_home_customer, product_img_1, product_img_2 } from '@/assets/images'
import ProductItem from '@/components/items/ProductItem/ProductItem'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  return (
    <main  className={styles.main} >
      <div className={styles.banner}><Image src={banner_home_customer} className={styles.banner_img} alt=""/></div>
      <div className={styles.product_catalog}>
        <p className={styles.catalog_title}>Danh mục sản phẩm</p>
        <div className={styles.catalog_productList}>
          {/* mot san pham */}
          {a.map((b)=>(
            <div className={styles.catalog_product}>
              <Image src={product_img_1} width={100} height={120} alt=""></Image>
              <p className={styles.catalog_product_title}>San pham 1</p>
            </div>
          ))}
          <Image src={arrow_img} width={40} height={40} alt="" className={styles.catalog_arrow}></Image>
        </div>
      </div>
      <div className={styles.product_list}>
        <div className={styles.product_list__navbar}>
          <div className={styles.product_list__navbar_title}>Tất cả sản phẩm</div>
          <div className={styles.product_list__navbar_title}>Sản phẩm đủ điểm đổi</div>
          <div className={styles.product_list__navbar_title}>Sản phẩm có thể đổi</div>
        </div>
        <div className={styles.product_list__grid}>
        {b.map((b)=>(
           
            <ProductItem img={product_img_2} name="Bình giữ nhiệt"/>
          ))}
        </div>
        <div className={styles.pagination}>
          1 2 3
        </div>
      </div>

    </main>
  )
}
