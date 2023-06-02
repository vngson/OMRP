import Image from "next/image"
import styles from "./styles.module.css"
import Link from "next/link"

export default function TypeItem({logo, name}:any) {

    return(
        <div className={styles.partner}>
            <Link href={`/product/${name}`}>
        <Image src={logo} className={styles.partner_img} width={40} height={40} alt=""/>
        {name}
        </Link>
        </div>
    )
}