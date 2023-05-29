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

type Props = {
    params: {  category: string, product: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };

export default function ProductPage({ params, searchParams }: Props){

    const ID_PRODUCT=params.product
    console.log("parm", ID_PRODUCT)
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
    },[product, bigImg, infor_value])

    const infor_title= ["Tên sản phẩm", "Thể loại", "Giới thiệu", "Giá"]
    
    console.log("par",infor_value?.[4]?.[0]?.img)
    
    console.log("bis", bigImg)
    const [count, setCount ] = useState(1)
    return (
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
                            
                                    <PartnerSmallItem logo={partner.url} name={partner.Name}/>

                                    </>
                            
                              ))}
                              </div>
                              
                              </>
                        )
                       
                    ))}
                   
                </div>
                {/* footer */}
                <div className={styles.counter}>
                    <Image src={arrow_left_product} alt=""/>
                    <input type="text" value={count} />
                    <Image src={arrow_right_product} alt=""/>
                    </div>
                <div className={styles.buttons}>
                    <button className={styles.button}>
                        Thêm vào giỏ hàng</button>
                        <button className={styles.button}>Đổi ngay</button>
                </div>
            </div>
            </>)}
           
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