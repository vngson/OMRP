/* eslint-disable react/jsx-key */
'use client'
import PartnerSmallItem from "@/components/items/PartnerSmallItem/com"
import styles from "./page.module.css"
import { arrow_left_product, arrow_right_product, delete_icon, partner_img_1, product_img_1 } from "@/assets/images"
import Image from "next/image"
import { count } from "console"
import { useSelector } from "react-redux"
import UserAPI from "@/app/api/userAPI"
import { useEffect, useState } from "react"
export default function CartPage(){
  

            const user=useSelector((state:any)=> state.auth.login.currentUser)
            // const cusID=user.user.userId
            const cusID="1"
    const [historyExchange, setHistoryExchange]= useState([])
    const fetchHistoryExchange= async function (){
        const res= await UserAPI.getHistoryExchange(cusID, "", "");
        setHistoryExchange(res.data.data)
        console.log("hídd", historyExchange)


    }
    useEffect(()=>{
        fetchHistoryExchange()
        console.log("hí", historyExchange)
    },[])
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.p}>Sản phẩm</div>
                <div className={styles.p}>Mã đơn hàng</div>
                <div className={styles.p}>Giá</div>
          
            </div>
            {historyExchange?.map((exc:any)=>(
                <div className={styles.partner}>
                    <PartnerSmallItem name={exc.TenDoiTac} logo={exc.ImgDoiTac}/>
                    <div className={styles.ordercode}>{exc.ID_TRADE}</div>
                    <div className={styles.partner_table}>
                        {exc.PRODUCTS.map((prod:any) => (
                            <div className={styles.row}>
                                <Image src={prod.ImgSanPham} width={80} height={80} className={styles.img} alt=""/>
                                <div className={styles.row_element}>{prod.NAME}
                                <p className={styles.count}>x{prod.QUANTITY}</p></div>
                                <p className={styles.row_element}></p>
                                
                                <p className={styles.row_element}>{prod.TOTAL_POINTS}</p>
                            </div>
                          
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.footer_ele}>Trạng thái giao hàng</p>
                        <p className={styles.footer_ele}>Giao hàng thành công</p>
                        <p className={styles.footer_ele}>Tổng cộng</p>
                        <p className={styles.total_value}>80</p></div>
                </div>
            ))}

           
        </div>
    )
}