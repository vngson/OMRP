/* eslint-disable react/jsx-key */
"use client"
import { arrow_left_product, arrow_right_product, partner_img_1, product_img_3, product_img_3_1, product_img_3_2, product_img_3_3 } from "@/assets/images"
import styles from "./product.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import React from "react"

import productAPI from "@/app/api/productAPI"
import { productApi } from "@/app/api/apiReponseType"
import { Metadata } from "next"
import PartnerSmallItemSelected from "@/components/items/partner/PartnerSmallItem_Selected/com"
import UserAPI from "@/app/api/userAPI"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
type Props = {
    params: {  category: string, product: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
import { useRouter } from "next/navigation"
import { saveSelectedProducts } from "@/redux/SelectedProductapiRequests"
import PartnerSmallItem from "@/components/items/partner/PartnerSmallItemVisablemore/com"
export default function ProductPage({ params, searchParams }: Props){
    // const [num, setNum]=useState(0)
    const ID_PRODUCT=params.product
    // console.log("parm", ID_PRODUCT)
    const user=useSelector((state:any)=> state.auth.login.currentUser)
   const cusID=user?.user?.userId
   const userpoint=user?.userInfo.Points
// const [userpoint, setUserpoint]=useState<any>([])
   
    const [infor_value,setInfor_value]= useState<any[]>()

    const [product, setProduct] = useState<productApi>()

    const [bigImg, setBigImg]= useState("")

    const [maxitem, setMaxitem]= useState(1)

    const infor_title= ["Tên sản phẩm", "Thể loại", "Giới thiệu", "Giá"]

    const [partners,setPartner]= useState<any>()

    const [count, setCount ] = useState(1)

    const [selectedPartnercheckout, SetSelectedPartnercheckout]= useState("")

    const [maxover, setMaxover]= useState(2)

    const [ispartnerselected, setIspartnerselected]=useState(false)
    const fetchProduct = async () => {
        const res1 = await UserAPI.getInfoUser(cusID);
        console.log("user point new", res1.data.data.Points)
        // setUserpoint(res1.data.data.Points)
        let userpointt=userpoint
        const res = await productAPI.getProduct(ID_PRODUCT)
     
        console.log("user point new", res.data.product.partners)

        console.log("r", res.data.product)
        let partners= res.data.product.partners
        console.log("parnter",partners)
        for (let i=0;i<partners.length;i++){
            partners[i] = {... res.data.product.partners[i], userpoint:0}
            for (let j=0;j<userpointt.length;j++){
                console.log("pảtner[", partners[i])
                console.log("userpoi", userpointt[j])
                if(partners[i].ID_Partners===userpointt[j].ID_Partners){
                    partners[i] = {... res.data.product.partners[i], userpoint:userpointt[j].POINTS}
                    // userpoint.splice(j, 1)
                }
            }
        }
        setInfor_value([res.data.product.NAME, res.data.product.TYPE_PROD, res.data.product.INFOR_PRODUCTS, partners, res.data.product.URL, res.data.product.QUANTITY]);

      
        // setBigImg(res.data.product.URL[0].img)
        setBigImg(res.data.product.URL?.[0].img)
        // console.log("par",res.data.product.URL?.[0].img)
        console.log("parnter after", res.data.product.partners)
        setProduct(res.data.product)
    }
   
    useEffect(()=> {

        fetchProduct()
                 
    // console.log("par",infor_value)
    },[])
  
    const [userpartnerPoint, setUserpartnerPoint]=useState(0)
    useEffect(()=>{
        // console.log("parnter sele", partners);
        let uss=0
        for (let i=0;i<userpoint?.length;i++){
            if(partners?.ID_Partners===userpoint?.[i]?.ID_Partners)
                // setUserpartnerPoint(userpoint[i].POINTS)
                uss=userpoint?.[i]?.POINTS
        }
        const max=Math.floor(uss/partners?.GiaDoiThuong)
     
        setMaxitem(max)
        console.log("max", max)

      console.log("is",ispartnerselected)
        console.log("userspint", uss);
    },[maxitem, partners, userpoint,ispartnerselected])

    
    // console.log("par",infor_value?.[4]?.[0]?.img)
    const router=useRouter()
    // console.log("bis", bigImg)
    const handleCartBtn =async function () {
        if(!ispartnerselected){

            return;
        }
        const newproduct ={
            idProduct: product?.ID_PRODUCTS.toString(),
            nameProduct: product?.NAME,
            quantity: count,
            pType: partners.ID_Partners,
        }
     
        console.log("res", newproduct)
        const res= await UserAPI.add2Cart(cusID, newproduct);
        router.push("/account/cart")
        console.log("res", res)
    }

    const handleExchangeBtn = function () {

        const selectedProduct = {
            ID_DoanhNghiep: partners.ID_Partners,
            Total_Point_Trade: count*partners?.GiaDoiThuong,
            products: [{
                ID_PRODUCTS: product?.ID_PRODUCTS,
                NAME_PRODUCTS: product?.NAME,
                QUANTITY: count,
                TOTAL_PRICE: count*partners?.GiaDoiThuong,
                url:product?.URL
            }],
            TenDoanhNghiep:partners.Name,
            Img: partners.url,
        }
        saveSelectedProducts(selectedProduct, dispatch, router)
        router.push("/order/slug")
    }
    // idProduct: nameProduct pType, price, quantity: string,
    const dispatch=useDispatch()
    const handlePartnerBtn = function (partner: any){
        SetSelectedPartnercheckout(partner);
      

    }
    const handleCheckoutButton = function (){
        
    }
    const handleChangecount=(e:any) => {
        console.log("count", count) 
        if(e>infor_value?.[5]){
            setMaxover(3)
        }
        if(e<=0){return}
        if (e<maxitem){
            setCount(e);
            setMaxover(1);
        } else if (e===maxitem) {
            setCount(e);
            setMaxover(2);
        } else{
            setMaxover(3);
        }
    }
    return (
        <div className={styles.mass}>
        <div className={styles.container}>
            {infor_value===null?(<></>):(<>
 <div className={styles.photos}>
                <Image src={bigImg} alt="" width={300} height={300} className={styles.bigImg}/>
                <div className={styles.smallImgs}>
                {infor_value?.[4].map((photo:any)=>( photo?.img!== bigImg? ( 
               
               <Image src={photo?.img} width={100} height={100} alt="" onClick={(e)=>setBigImg(photo?.img)}/>):(<></>)
            
          ))}
                </div>
              
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    {infor_title.map((e, index)=> (
                        e!=="Giá"? (  <><p className={styles.infor_title}>{e}</p>
                        <p className={styles.infor_value}>{infor_value?.[index]}</p></>):(
                              <><p className={styles.infor_title}>{e}</p>
                              <div className={styles.partners}>
                              {infor_value?.[index].map((partner:any)=> (
                                <>
                                    {partner.GiaDoiThuong} điểm
                                    <div onClick={()=>{partner!==partners?(setIspartnerselected(true), setPartner(partner)):(setIspartnerselected(false),setPartner(null))}}>
                                        <PartnerSmallItem 
                                        // onClick={()=>setPartner(partner)}
                                        logo={partner.url} name={partner.Name} point={partner.GiaDoiThuong} userpoint = {partner.userpoint} />
                                    </div>
                            </>


                            
                              ))}
                              </div>
                              
                              </>
                        )
                       
                    ))}
                   
                </div>
                {/* footer */}
                <div className={styles.counter}>
                    <Image src={arrow_left_product} alt="" onClick={()=>handleChangecount(count-1)}/>
                    <input pattern="[0-9]*" name="cost" type="number" value={count} onChange={(e)=>handleChangecount(e.target.value)}/>
                    <Image src={arrow_right_product} alt="" onClick={()=>handleChangecount(count+1)}/>
                    </div>
                    {!ispartnerselected?(<p className={styles.maxover}>Vui lòng chọn đối tác để tiếp tục!</p>):(<div className={styles.empty}></div>)}
                   {maxover===3&& ispartnerselected===true?( <p className={styles.maxover}>Đã vượt quá số sản phẩm tối đa!</p>):(<div className={styles.empty}></div>)}
                <div className={styles.buttons}>
                    <button onClick={() => handleCartBtn()} className={styles.button}>
                       Thêm vào giỏ hàng</button>
                        <button onClick={() => handleExchangeBtn()}  className={styles.button} >Đổi ngay</button>
                </div>
            </div>
            </>)}
           
        </div>
        </div>
    )

}
export function generateMetadata({ params, searchParams }: Props): Metadata {
    return {
      title: 'Next.js',
    };
  }
export async function generateStaticParams() {
    const res = await productAPI.getAllProductsFull()
    const products= res.data.products

    return products.map((prod: productApi)=>({
        category: prod.TYPE_PROD,
        product: prod.ID_PRODUCTS
    }));

}