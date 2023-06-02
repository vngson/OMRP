/* eslint-disable react/jsx-key */
"use client"
import { arrow_left_product, arrow_right_product, partner_img_1, product_img_3, product_img_3_1, product_img_3_2, product_img_3_3 } from "@/assets/images"
import styles from "./product.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import React from "react"
import PartnerSmallItem from "@/components/items/PartnerSmallItem/com"
import productAPI from "@/app/api/productAPI"
import { productApi } from "@/app/api/apiReponseType"
import { Metadata } from "next"
import PartnerSmallItemSelected from "@/components/items/PartnerSmallItem _Selected/com"
import UserAPI from "@/app/api/userAPI"
import { useSelector } from "react-redux"
import Link from "next/link"
type Props = {
    params: {  category: string, product: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

export default function ProductPage({ params, searchParams }: Props){
    // const [num, setNum]=useState(0)
    const ID_PRODUCT=params.product
    console.log("parm", ID_PRODUCT)
    const user=useSelector((state:any)=> state.auth.login.currentUser)
   const cusID=user.user.userId
    const [infor_value,setInfor_value]= useState<any[]>()
    const [product, setProduct] = useState<productApi>()
    const [bigImg, setBigImg]= useState("")
    useEffect(()=> {
        const fetchProduct = async () => {
            const res = await productAPI.getProduct(ID_PRODUCT)
            setProduct(res.data.product)
            setInfor_value([res.data.product.NAME, res.data.product.TYPE_PROD, res.data.product.INFOR_PRODUCTS, res.data.product.partners, res.data.product.URL]);
            console.log("r", res.data.product)
            console.log("r", res.data.product.partners)
            // setBigImg(res.data.product.URL[0].img)
            setBigImg(infor_value?.[4]?.[0]?.img)
    
        }
        fetchProduct()
                 
    // console.log("par",infor_value)
    },[])

    const infor_title= ["Tên sản phẩm", "Thể loại", "Giới thiệu", "Giá"]
    
    console.log("par",infor_value?.[4]?.[0]?.img)
    
    console.log("bis", bigImg)
    const [partners,setPartner]= useState("")
    const [count, setCount ] = useState(0)
    const handleCartBtn = function () {
        const newproduct ={
            idProduct: product?.ID_PRODUCTS.toString(),
            nameProduct: product?.NAME,
            price: product?.PRICE,
            quantity: count,
            pType: partners,
        }
        console.log("res1", typeof(count))
        console.log("res", newproduct)
        const res= UserAPI.add2Cart(cusID, newproduct);
        console.log("res", res)
    }
    // idProduct: nameProduct pType, price, quantity: string,
    return (
        <div className={styles.mass}>
        <div className={styles.container}>
            {infor_value===null?(<></>):(<>
 <div className={styles.photos}>
                <Image src={bigImg} alt="" width={300} height={300} className={styles.bigImg}/>
                <div className={styles.smallImgs}>
                {infor_value?.[4].map((photo:any)=>( photo?.img!== bigImg? ( 
               
               <Image src={photo?.img} width={100} height={100} alt="" onClick={(e)=>setBigImg(photo)}/>):(<></>)
            
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
            
                            {
                                partner.ID_Partners===partners?(  <div  className= {styles.selected} onClick={()=>{setPartner(partner.ID_Partners);console.log("p",partner.ID_Partners)}}><PartnerSmallItemSelected logo={partner.url} name={partner.Name}/></div>):(
                                   <div onClick={()=>{setPartner(partner.ID_Partners);console.log("p",partner.ID_Partners)}}> <PartnerSmallItem logo={partner.url} name={partner.Name} /></div>
                                )
                            }</>


                            
                              ))}
                              </div>
                              
                              </>
                        )
                       
                    ))}
                   
                </div>
                {/* footer */}
                <div className={styles.counter}>
                    <Image src={arrow_left_product} alt="" onClick={()=>setCount(count-1)}/>
                    <input pattern="[0-9]*" name="cost" type="number" value={count} onChange={(e)=>setCount(e.target.value)}/>
                    <Image src={arrow_right_product} alt="" onClick={()=>setCount(count+1)}/>
                    </div>
                <div className={styles.buttons}>
                    <button onClick={() => handleCartBtn()} className={styles.button}>
                       <Link href="/account/cart"> Thêm vào giỏ hàng</Link></button>
                        <button className={styles.button} >Đổi ngay</button>
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


    // return products.map((prod:productApi) => ({
    //     category: prod.TYPE_PROD,
    //     product: prod.ID_PRODUCTS,
    //   }));



}

// export function generateMetadata({ params, searchParams }: Props): Metadata {
//     return {
//       title: 'Next.js',
//     };
//   }
//   export async function generateStaticParams(){
//     const res = await productAPI.getAllCatagories();
//     const types = res.data.data
  
//     return types.map((type:categoryApi)=> {
//       category: type.TYPE_PROD
//     })
//   }