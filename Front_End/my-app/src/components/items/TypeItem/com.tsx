import Image from "next/image"
import styles from "./styles.module.css"

export default function TypeItem({logo, name}:any) {

    return(
        <div className={styles.partner}>
        <Image src={logo} className={styles.partner_img} width={40} height={40} alt=""/>
        {name}
        </div>
    )
}