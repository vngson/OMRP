import Image from "next/image"
import styles from "./styles.module.css"

export default function PartnerSmallItem_1({logo, name}:any) {

    return(
        <div className={styles.partner}>
        <Image src={logo} width={40} height={40} className={styles.partner_img} alt=""/>
        {name}
        </div>
    )
}