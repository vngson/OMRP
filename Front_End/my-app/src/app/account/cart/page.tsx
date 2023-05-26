
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
                <div className={styles.p}>Giá (điểm)</div>
                <div className={styles.p}>Số lượng</div>
                <div className={styles.p}>Tổng diểm</div>
            </div>
            {a.map((aa)=>(
                <div className={styles.partner}>
                    <PartnerSmallItem name="Phuc long" logo={partner_img_1}/>
                    <div className={styles.partner_table}>
                        {table.map((aa) => (
                            <div className={styles.row}>
                                <Image src={product_img_1} width={80} height={80} className={styles.img} alt=""/>
                                <p className={styles.row_element}>{aa.name}</p>
                                <p className={styles.row_element}>{aa.price}</p>
                                <div className={styles.counter}>
                                    <Image src={arrow_left_product} alt=""/>
                                    <input type="text" value={aa.count} />
                                    <Image src={arrow_right_product} alt=""/>
                                </div>
                                <p className={styles.row_element}>{aa.price*aa.count}</p>
                            </div>
                          
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.total}>Tổng cộng
                <p className={styles.total_value}>80</p></div>
            <div className={styles.buttons}>
                <button> <Image className={styles.delete_icon} src={delete_icon} alt=""/> Xóa</button>
                <button className={styles.checkout}> <Image className={styles.checkout_icon}  src={delete_icon} alt=""/> Thanh toán</button>
            </div>
        </div>
    )
}