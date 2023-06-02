/* eslint-disable react/jsx-key */
"use client"
import PartnerSmallItem from "@/components/items/PartnerSmallItem/com"
import styles from "./page.module.css"
import { arrow_left_product, arrow_right_product, delete_icon, partner_img_1, product_img_1 } from "@/assets/images"
import Image from "next/image"
import { count } from "console"
import { useDispatch, useSelector } from "react-redux"
import UserAPI from "@/app/api/userAPI"
import { useEffect, useState } from "react"
import { productApi } from "@/app/api/apiReponseType"
import Link from "next/link"
import {useRouter} from "next/navigation"
import { saveSelectedProducts } from "@/redux/apiRequests"
export default function CartPage(props:any){
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    // const userid=user.user.userId;
    const userid="1"
    const dispatch=useDispatch()
    const router=useRouter();
    const [selectedPartnercheckout, setSelectedPartnercheckout]=useState({})
    const [cart, setCart]= useState<any[]>([])
    const product ={
        productId:1,
        productName: "Nước hoa hồng cocoon (rose water toner)",
        pointType: "2    ",
        price: 1019,

    }
    const [total,setTotal]= useState(0)
    const fetchCart = async function (){
        const res = await UserAPI.getCart(userid);
        // console.log("cart", res.data)
        setCart( res.data.data)
        const tempcart= res.data.data
        console.log("ctart", tempcart)
        console.log("len0", tempcart.length)
        setTotal(0)
       


    }
    const insertCart = async function (){
        const res = await UserAPI.add2Cart(userid, product);
        console.log("res insert", res)
    }
    useEffect(()=>{
        fetchCart();
        let sum=0;
        for (let i=0;i<cart.length;i++){
            console.log("len 1", cart[i].products.length)
            for (let j=0;j<cart[i].products.length;j++){
                console.log("car[",cart[i].products?.[j])
                console.log("sum:", cart[i].products?.[j]?.QUANTITY * cart[i].products?.[j]?.PRICE)
                sum=sum+ cart[i].products?.[j]?.QUANTITY * cart[i].products?.[j]?.PRICE;
            }
           }
        setTotal(sum)
        // console.log("cart af", cart)

    },[])
    const handleinsert =  function () {
        insertCart();
    }
    const handleCheckoutButton = function (){
        saveSelectedProducts(selectedPartnercheckout, dispatch, router)
    }
    const handlePartnerBtn = function (partner: {}){
        setSelectedPartnercheckout(partner);
        console.log("sel", partner);

    }

    return(
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                {/* <button onClick={()=> handleinsert()}> insert</button> */}
                <div className={styles.p}>Sản phẩm</div>
                <div className={styles.p}>Giá (điểm)</div>
                <div className={styles.p}>Số lượng</div>
                <div className={styles.p}>Tổng diểm</div>
            </div>
            {cart.map((ele:any, index)=>(
                <div className={styles.partner}>
                    {ele===selectedPartnercheckout ?(
                        <button className={styles.radiobtn_click} onClick={()=> {handlePartnerBtn(ele)}}></button>
                    ):(
                        <button className={styles.radiobtn} onClick={()=> {handlePartnerBtn(ele)}}></button>
                    )}
                    
                    <PartnerSmallItem name={ele.TenDoanhNghiep} logo={ele.Img}/>
                    <div className={styles.partner_table}>
                        {ele.products.map((prod:any) => (
                            <div className={styles.row}>
                                <Image src={prod.URL} width={80} height={80} className={styles.img} alt=""/>
                                <p className={styles.row_element}>{prod.NAME_PRODUCTS}</p>
                                <p className={styles.row_element}>{prod.PRICE}</p>
                                <div className={styles.counter}>
                                    <Image src={arrow_left_product} alt=""/>
                                    <input type="text" value={prod.QUANTITY} />
                                    <Image src={arrow_right_product} alt=""/>
                                </div>
                                <p className={styles.row_element}>{prod.PRICE*prod.QUANTITY}</p>
                            </div>
                          
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.total}>Tổng cộng
                <p className={styles.total_value}>{total}</p></div>
            <div className={styles.buttons}>
                <button> <Image className={styles.delete_icon} src={delete_icon} alt=""/> Xóa</button>
                <button className={styles.checkout}> <Image className={styles.checkout_icon}  src={delete_icon} onClick={()=>handleCheckoutButton()} alt=""/>
                {/* <Link href={`/order/slug?products=${cart}`}> Thanh toán</Link> */}
                Thanh toán
                </button>
            </div>
        </div>
        </>
    )
}