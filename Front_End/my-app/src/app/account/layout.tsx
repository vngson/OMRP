"use client"
import { user_avt_1 } from "@/assets/images";
import styles from "./layout.module.css"
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
export default function AccountLayout({children}:any) {
    const pathname= usePathname();
 
    const ele=["Thông tin tài khoản", "Lịch sử trao đổi", "Danh sách doanh nghiệp"];
    const ele_url=["/account/infor","/account/history-exchange", "/account/business"]
    return(
        <div className={styles.container}>
            <div className={styles.sidebar}>

                <Image className={styles.img} src={user_avt_1} alt=""/>
                <div className={styles.user_name}>Kim Ngan</div>
                {ele.map((e,index)=>( ele_url[index]===pathname?(
                       <div className={styles.element_focus}>{e}</div>
                ):(
                        <div className={styles.element}>{e}</div>
                )
                
                ))}         

                <button>Đăng xuất</button>       
            </div>
            {children}
        </div>
    )
}