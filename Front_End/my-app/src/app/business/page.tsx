import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, banner_home_customer, partner_img_1_square, product_img_1, product_img_2 } from '@/assets/images'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerLargeItem from '@/components/items/PartnerLargeItem/PartnerLargeItem'

const inter = Inter({ subsets: ['latin'] })

export default function BusinessListPage() {
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  return (
    <main  className={styles.main} >
      <div className={styles.banner}><Image src={banner_home_customer} className={styles.banner_img} alt=""/></div>
      
      <div className={styles.partner_list}>
        <div className={styles.partner_list__navbar}>
          <div className={styles.partner_list__navbar_title}>Danh sách các doanh nghiệp có thể đổi quà</div>
          <div className={styles.partner_list__navbar_title}>Tất cả doanh nghiệp</div>

        </div>
        <div className={styles.partner_list__grid}>
        {b.map((b)=>(
           
            <PartnerLargeItem img={partner_img_1_square} name="Phuc Long" point={1000}/>
          ))}
        </div>
        <div className={styles.pagination}>
          1 2 3
        </div>
      </div>

    </main>
  )
}
