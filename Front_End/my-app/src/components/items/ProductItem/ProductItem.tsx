import Image from "next/image"
import styles from "./styles.module.css"
import Link from "next/link"

export default function ProductItem({img, name, price, id}:any) {

    return(
        <div className={styles.product_list_product}>
            <Link href={`/product/${name}/${id}`}> 
              <Image src={img} width={180} height={180} className= {styles.product_list_product_img} alt=""></Image>
              <p className={styles.product_list_product_title}>{name}</p>
              {/* <div className={styles.price}><p className={styles.point}>{price}</p> <p >điểm</p></div> */}
              </Link>
            </div>
    )
}