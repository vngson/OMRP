"use client"
import { withRouter } from 'next/router'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, banner_home_customer, checkout_icon, partner_img_1, product_img_1, product_img_2 } from '@/assets/images'
import PartnerSmallItem from '@/components/items/partner/PartnerSmallItem/com'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerSmallItem_1 from '@/components/items/partner/PartnerSmallItem_1/com'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import UserAPI from '@/app/api/userAPI'
import Link from 'next/link'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { deleteSelectedProducts } from '@/redux/SelectedProductapiRequests'

const inter = Inter({ subsets: ['latin'] })

export default function BuninessPage() {
const products = useSelector((state:any)=> state.selectedProducts.save.products)
    const [modalOpen, setModalOpen] = useState(false)
    const router=useRouter();
  const param=useParams();
//   console.log("par",products)
    let temptotal=0
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    const id=user?.user?.userId
    // const id="1"
  console.log("id",id)
    const total =products?.Total_Point_Trade;
    const dispatch=useDispatch()
 
    const [address, setAddress]= useState("");
    const [phone, setPhone]= useState("");
    const handleCheckout =  async function () {

        let prods=[]
        for (let i =0;i<products?.products?.length;i++){
            prods.push({Id_Product: products?.products?.[i].ID_PRODUCTS.toString(),
                Name_Product:products?.products?.[i]?.NAME_PRODUCTS,
                Quantity:products?.products?.[i]?.QUANTITY.toString(),
                Total_Point: products?.products?.[i]?.TOTAL_PRICE.toString()})
        }
     
        const newOrder ={
            Address: address,
            Phone: phone,
            Total_Point_Trade: total.toString(),
            Id_DoiTac: products?.ID_DoanhNghiep.slice(0,1),
            Products: prods
        }
  
        console.log("res", newOrder)
        const res = await UserAPI.order(id,newOrder,"false")
        console.log("res", res)
        // console.log("new", newOrder)
        setModalOpen(true)
        deleteSelectedProducts(dispatch, router)
    }
  return (
   <div className={styles.container} style={{opacity: `${modalOpen?0.2:1}`}}>
    <div className={styles.inputs}>
        <div className={styles.input}>Địa chỉ giao hàng      </div>
        <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        <div className={styles.input}>Số điện thoại        </div>
        <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
    </div>
   
    <div className={styles.products}>
        <PartnerSmallItem_1 name={products?.TenDoanhNghiep} logo={products?.Img}/>
        <div className={styles.line}></div>
        <div className={styles.productlist}>
        {products?.products.map((prod:any)=>(
                    
            <><div className={styles.product}>

                <Image src={prod.url[0].img} alt="" width={60} height={60}/>
                <p className={styles.title}>{prod.NAME_PRODUCTS}</p>
                <p className={styles.title}>x{prod.QUANTITY}</p>
                <p className={styles.title}>{prod.TOTAL_PRICE}</p>
            </div><div className={styles.line1}></div></>
        ))}
        </div>
        <div className={styles.line2}></div>
        <div className={styles.total}>  <p className={styles.total_title}>Tổng cộng</p>
        <div className={styles.total_value}>{total}</div></div>
      
    </div>
 
    <button onClick={()=> handleCheckout()} className={styles.checkout}> <Image className={styles.checkout_icon}  src={checkout_icon} alt="" /> Đặt hàng</button>
    <div className={styles.modal_container} >
        <Modal className={styles.modal}  toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} >
        <div className={styles.modal_header}>
          <h5 className={styles.modal_title} id="exampleModalLabel">
            Đặt hàng thành công!
          </h5>
  
        </div>
        <ModalBody>...</ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => {setModalOpen(!modalOpen);router.push("/")}}
            className={styles.button_}
          >
            Tiếp tục mua sắm
         
          </Button>
          <Button color="primary" type="button" onClick={() => router.push("/account/history-exchange")}
            className={styles.button_}>
        
            Xem đơn hàng
          </Button>
        </ModalFooter>
      </Modal>
      </div>
   </div>
  )
}
