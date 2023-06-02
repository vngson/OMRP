"use client"
import { withRouter } from 'next/router'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, banner_home_customer, checkout_icon, partner_img_1, product_img_1, product_img_2 } from '@/assets/images'
import PartnerSmallItem from '@/components/items/PartnerSmallItem/com'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerSmallItem_1 from '@/components/items/PartnerSmallItem_1/com'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import UserAPI from '@/app/api/userAPI'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function BuninessPage() {
const products = useSelector((state:any)=> state.selectedProducts.save.products)

  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  const param=useParams();
  console.log("par",products)
    const [total, setTotal]= useState(0)
    let temptotal=0
    

    useEffect(()=>{
        for (let i=0;i<products.products.length;i++){
            temptotal=temptotal+products.products[i].TOTAL_PRICE;
                }
                setTotal(temptotal);
        
    },[])
    const [address, setAddress]= useState("");
    const [phone, setPhone]= useState("");
    const handleCheckout = function () {

        let prods=[]
        for (let i =0;i<products.products.length;i++){
            prods.push({Id_Product: products.products?.[i].ID_PRODUCTS.toString(),
                Name_Product:products.products?.[i].NAME_PRODUCTS,
                Quantity:products.products?.[i].QUANTITY,
                Total_Point: products.products?.[i].TOTAL_PRICE})
        }
     
        const newOrder ={
            Address: address,
            Phone: phone,
            Total_Point_Trade: total,
            Id_DoiTac: products.ID_DoanhNghiep,
            Products: prods
        }
        const id="1"
        const res = UserAPI.order(id,newOrder,"true")
        console.log("res", res)
        console.log("new", newOrder)
    }
  return (
   <div className={styles.container}>
    <div className={styles.inputs}>
        <div className={styles.input}>Địa chỉ giao hàng      </div>
        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        <div className={styles.input}>Số điện thoại        </div>
        <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
    </div>
   
    <div className={styles.products}>
        <PartnerSmallItem_1 name={products.TenDoanhNghiep} logo={products.Img}/>
        <div className={styles.line}></div>
        <div className={styles.productlist}>
        {products.products.map((prod:any)=>(
                    
            <><div className={styles.product}>

                <Image src={product_img_1} alt="" />
                <p className={styles.title}>{prod.NAME_PRODUCTS}</p>
                <p className={styles.title}>x{prod.QUANTITY}</p>
                <p className={styles.title}>{prod.PRICE}</p>
            </div><div className={styles.line1}></div></>
        ))}
        </div>
        <div className={styles.line2}></div>
        <div className={styles.total}>  <p className={styles.total_title}>Tong cong</p>
        <div className={styles.total_value}>{total}</div></div>
      
    </div>
 
    <button onClick={()=> handleCheckout()} className={styles.checkout}> <Link href="/"><Image className={styles.checkout_icon}  src={checkout_icon} alt="" /> Đặt hàng</Link></button>
   </div>
  )
}

// export default withRouter((props) => (

//     <div className={styles.container}>
//     <div className={styles.inputs}>
//         <div className={styles.input}>Địa chỉ giao hàng      </div>
//         <input type="text" />
//         <div className={styles.input}>Số điện thoại        </div>
//         <input type="text" />
//     </div>
   
//     <div className={styles.products}>
//         <PartnerSmallItem_1 name="Phuc Long" logo={partner_img_1}/>
//         <div className={styles.line}></div>
//         <div className={styles.productlist}>
//         {a.map(a=>(
                    
//             <><div className={styles.product}>

//                 <Image src={product_img_1} alt="" />
//                 <p className={styles.title}>Binh giu nhiet</p>
//                 <p className={styles.title}>x2</p>
//                 <p className={styles.title}>60</p>
//             </div><div className={styles.line1}></div></>
//         ))}
//         </div>
//         <div className={styles.line2}></div>
//         <div className={styles.total}>  <p className={styles.total_title}>Tong cong</p>
//         <div className={styles.total_value}>60</div></div>
      
//     </div>
 
//     <button className={styles.checkout}> <Image className={styles.checkout_icon}  src={checkout_icon} alt=""/> Đặt hàng</button>
//    </div>
//    ))
