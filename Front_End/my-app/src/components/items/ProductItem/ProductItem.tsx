import Image from "next/image"
import styles from "./styles.module.css"

export default function ProductItem({img, name, price}:any) {

    return(
        <div className={styles.product_list_product}>
              <Image src={img} width={180} height={180} className= {styles.product_list_product_img} alt=""></Image>
              <p className={styles.product_list_product_title}>{name}</p>
              <p className={styles.price}>{price} điểm</p>
            </div>
    )
}