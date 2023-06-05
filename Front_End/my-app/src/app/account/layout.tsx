/* eslint-disable react/jsx-key */
"use client"
import { user_avt_1 } from "@/assets/images";
import styles from "./layout.module.css"
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/apiRequests";
import axios from "axios";
export default function AccountLayout({children}:any) {
    const pathname= usePathname();
    const router = useRouter()
    const ele=["Thông tin tài khoản", "Lịch sử trao đổi", "Danh sách doanh nghiệp", "Giỏ hàng"];
    const ele_url=["/account/infor","/account/history-exchange", "/account/business", "/account/cart"]

    const dispatch=useDispatch()
    const handleLogoutBtn= () =>{
        logOut(dispatch);
        router.push("/")
    }
    return(
        <div className={styles.container}>
            <div className={styles.sidebar}>

                <Image className={styles.img} src={user_avt_1} alt=""/>
                <div className={styles.user_name}>Kim Ngan</div>
                {ele.map((e,index)=>( ele_url[index]===pathname?(
                       <div className={styles.element_focus} >{e}</div>
                ):(
                        <div className={styles.element} onClick={()=> router.push(ele_url[index])} >{e}</div>
                )
                
                ))}         

                <button onClick={()=>handleLogoutBtn()}>Đăng xuất</button>       
            </div>
            {children}
        </div>
    )
}