import Image from "next/image"
import styles from "./styles.module.css"
import Link from "next/link"

export default function PartnerLargeItem({img, name, point,id}:any) {

    return(
        <div className={styles.product_list_product}><Link href={`/product/business/${name}/${id}`}>
              <Image src={img} width={140} height={140} className= {styles.product_list_product_img} alt=""></Image>
              <p className={styles.product_list_product_title}>{name}</p>
              {/* <p className={styles.price}>{point} điểm</p> */}
              </Link>
            </div>
    )
}