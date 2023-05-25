import Image from "next/image"
import styles from "./styles.module.css"

export default function PartnerSmallItem_1({logo, name}:any) {

    return(
        <div className={styles.partner}>
        <Image src={logo} className={styles.partner_img} alt=""/>
        {name}
        </div>
    )
}