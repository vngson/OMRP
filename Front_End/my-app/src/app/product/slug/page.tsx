"use client"
import { arrow_left_product, arrow_right_product, partner_img_1, product_img_3, product_img_3_1, product_img_3_2, product_img_3_3 } from "@/assets/images"
import styles from "./product.module.css"
import Image from "next/image"
import { useState } from "react"
import PartnerSmallItem from "@/components/items/PartnerSmallItem/com"


export default function ProductPage(){

    const infor_title= ["Tên sản phẩm", "Thể loại", "Giới thiệu", "Giá"]
    const infor_value=["Móc khóa ", "Quà lưu niệm", "Móc khóa phi hành gia loai lớn ", [[20,partner_img_1,"Phúc long"],[15, partner_img_1, "Circle K"]],[product_img_3, product_img_3_1, product_img_3_2,product_img_3_3]]
    const [bigImg, setBigImg] = useState(infor_value[4][0])
    const [count, setCount ] = useState(1)
    return (
        <div className={styles.container}>
            <div className={styles.photos}>
                <Image src={bigImg} alt="" width={300} height={300} className={styles.bigImg}/>
                <div className={styles.smallImgs}>
                {infor_value[4].map((photo)=>( photo!== bigImg? ( 
               
               <Image src={photo} widht={100} height={100} alt="" onClick={(e)=>setBigImg(photo)}/>):(<></>)
            
          ))}
                </div>
              
            </div>
            <div className={styles.content}>
                <div className={styles.info}>
                    {infor_title.map((e, index)=> (
                        e!=="Giá"? (  <><p className={styles.infor_title}>{e}</p>
                        <p className={styles.infor_value}>{infor_value[index]}</p></>):(
                              <><p className={styles.infor_title}>{e}</p>
                              <div className={styles.partners}>
                              {infor_value[index].map((partner:any)=> (
                                <>
                                    {partner[0]} điểm
                            
                                    <PartnerSmallItem logo={partner[1]} name={partner[2]}/>

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
        </div>
    )

}