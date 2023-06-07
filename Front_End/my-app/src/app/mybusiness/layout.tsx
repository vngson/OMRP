/* eslint-disable react/jsx-key */
"use client"
import { user_avt_1 } from "@/assets/images";
import styles from "./layout.module.css"
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/apiRequests";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
export default function AccountLayout({children}:any) {
  const pathname=usePathname()
  const dispatch=useDispatch()
  
  const router = useRouter()
  const user=useSelector((state:any)=> state.auth.login.currentUser)
  const cusID=user?.user?.userId

  const permission = user?.user?.permission
  // const permission="2"

  const [sticky, setSticky] = useState(false);

    // on render, set listener
    useEffect(() => {
  
      window.addEventListener("scroll", isSticky);
      return () => {
        window.removeEventListener("scroll", isSticky);
      };
    }, []);
    const isSticky = () => {
      /* Method that will fix header after a specific scrollable */
      const scrollTop = window.scrollY;
      scrollTop >= 100 ? setSticky(true) : setSticky(false);
      // setSticky(true)
    };
    const ele=    ["Hồ sơ doanh nghiệp","Chọn sản phẩm","Danh sách sản phẩm","Hợp đồng"]
    const ele_url=["/mybusiness/contract","/mybusiness/chooseproduct", "/mybusiness/product", "/mybusiness/contract"]

    const handleLogoutBtn= () =>{
        logOut(dispatch);
        router.push("/")
    }

    if(permission!=="2"){
      router.push("/")
      
      if (permission==="3")
      {
        router.push("/")
        return (<></>)
      } 
      return (<></>)

    } 

    return(
        <div className={styles.container}>
            <div className={`${sticky? styles.sidebar_sticky: styles.sidebar}`}>

                <Image className={styles.img} src={user?.userInfo.url||user_avt_1} width ={100} height={100} alt=""/>
                <div className={styles.user_name}>{user?.userInfo?.NAME||user?.userInfo?.Name}</div>
                {ele.map((e:any,index)=>( ele_url[index]===pathname?(
                       <div className={styles.element_focus} >{e}</div>
                ):(
                        <div className={styles.element} onClick={()=> router.push(ele_url[index])} >{e}</div>
                )
                
                ))}         

                <button className={styles.layoutbtn} onClick={()=>handleLogoutBtn()}>Đăng xuất</button>       
            </div>
            <div></div>
            {children}
        </div>
    )
}