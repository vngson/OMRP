import Image from "next/image"
import styles from "./styles.module.css"
import { useState } from "react"

export default function PartnerSmallItem({logo, name, point, userpoint}:any) {
    const [select, setSelect]=useState(false)
    const [hover, setHover]=useState(false)
    const maxitem=Math.floor(userpoint/point)
    return(
        // <div className={styles.container}>
        <div 
        className={`${userpoint===0? styles.partner_disable:select===true? styles.partner_selected: styles.partner}`}
  
        onClick={()=>setSelect(!select)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
        {hover?(<label>Điểm của bạn: {userpoint}
        <p>Số sản phẩm tối đa: {maxitem}</p></label>):(<></>)}

        <Image src={logo} width={20} height={20} className={styles.partner_img} alt=""/>
        {name}
        </div>
        // </div>

    )
}