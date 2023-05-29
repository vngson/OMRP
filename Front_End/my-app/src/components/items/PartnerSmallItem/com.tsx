import Image from "next/image"
import styles from "./styles.module.css"

export default function PartnerSmallItem({logo, name}:any) {

    return(
        <div className={styles.partner}>
        <Image src={logo} width={20} height={20} className={styles.partner_img} alt=""/>
        {name}
        </div>
    )
}