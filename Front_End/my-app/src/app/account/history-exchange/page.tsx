
import PartnerSmallItem from "@/components/items/PartnerSmallItem/com"
import styles from "./page.module.css"
import { arrow_left_product, arrow_right_product, delete_icon, partner_img_1, product_img_1 } from "@/assets/images"
import Image from "next/image"
import { count } from "console"
export default function CartPage(){
    const a=[1,2,2,3]
    const table=[{name: "Bình giữ nhiệt",
            price: 30,
            count: 2,
            img: product_img_1},{name: "Bình giữ nhiệt",
            price: 30,
            count: 2,
            img: product_img_1},]

    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.p}>Sản phẩm</div>
                <div className={styles.p}>Mã đơn hàng</div>
                <div className={styles.p}>Giá</div>
          
            </div>
            {a.map((aa)=>(
                <div className={styles.partner}>
                    <PartnerSmallItem name="Phuc long" logo={partner_img_1}/>
                    <div className={styles.ordercode}>12341431234</div>
                    <div className={styles.partner_table}>
                        {table.map((aa) => (
                            <div className={styles.row}>
                                <Image src={product_img_1} width={80} height={80} className={styles.img} alt=""/>
                                <div className={styles.row_element}>{aa.name}
                                <p className={styles.count}>x2</p></div>
                                <p className={styles.row_element}></p>
                                
                                <p className={styles.row_element}>{aa.price*aa.count}</p>
                            </div>
                          
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <p className={styles.footer_ele}>Trạng thái giao hàng</p>
                        <p className={styles.footer_ele}>Giao hàng thành công</p>
                        <p className={styles.footer_ele}>Tổng cộng</p>
                        <p className={styles.total_value}>80</p></div>
                </div>
            ))}

           
        </div>
    )
}