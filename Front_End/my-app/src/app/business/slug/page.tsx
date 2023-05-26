import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, banner_home_customer, partner_img_1, product_img_1, product_img_2 } from '@/assets/images'
import PartnerSmallItem from '@/components/items/PartnerSmallItem/com'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerSmallItem_1 from '@/components/items/PartnerSmallItem_1/com'

const inter = Inter({ subsets: ['latin'] })

export default function BuninessPage() {
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  return (
   <div className={styles.container}> 
   <PartnerSmallItem_1 logo={partner_img_1} name="Phuc Long"/>
   <div className={styles.title}>Danh sách các sản phẩm của doanh nghiệp</div>
   <div className={styles.product_list__grid}>
        {b.map((b)=>(
           
            <ProductItem img={product_img_2} name="Bình giữ nhiệt" price={100}/>
          ))}
        </div>
        <div className={styles.pagination}>
          1 2 3
        </div>
   </div>
  )
}
