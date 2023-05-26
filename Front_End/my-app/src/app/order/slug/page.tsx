import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, banner_home_customer, checkout_icon, partner_img_1, product_img_1, product_img_2 } from '@/assets/images'
import PartnerSmallItem from '@/components/items/PartnerSmallItem/com'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerSmallItem_1 from '@/components/items/PartnerSmallItem_1/com'

const inter = Inter({ subsets: ['latin'] })

export default function BuninessPage() {
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  return (
   <div className={styles.container}>
    <div className={styles.inputs}>
        <div className={styles.input}>Địa chỉ giao hàng      </div>
        <input type="text" />
        <div className={styles.input}>Số điện thoại        </div>
        <input type="text" />
    </div>
   
    <div className={styles.products}>
        <PartnerSmallItem_1 name="Phuc Long" logo={partner_img_1}/>
        <div className={styles.line}></div>
        <div className={styles.productlist}>
        {a.map(a=>(
                    
            <><div className={styles.product}>

                <Image src={product_img_1} alt="" />
                <p className={styles.title}>Binh giu nhiet</p>
                <p className={styles.title}>x2</p>
                <p className={styles.title}>60</p>
            </div><div className={styles.line1}></div></>
        ))}
        </div>
        <div className={styles.line2}></div>
        <div className={styles.total}>  <p className={styles.total_title}>Tong cong</p>
        <div className={styles.total_value}>60</div></div>
      
    </div>
 
    <button className={styles.checkout}> <Image className={styles.checkout_icon}  src={checkout_icon} alt=""/> Đặt hàng</button>
   </div>
  )
}
