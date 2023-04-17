"use client"
import { useState } from 'react';
import styles from './signup.module.css'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/redux/apiRequests';
import { useNavigate } from 'react-router';
export default function Popup_Oauth_Signup() {
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [fullname,setfullname]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [repassword,setrepassword]=useState("");

    const dispatch=useDispatch();
    const router=useRouter();
   
    const handleSubmit =(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        const newUser={
            username: username,
            password: password,
            name: fullname,
            email:email,
            phone: phone
        }
        console.log(newUser)
        registerUser(newUser, dispatch,router)
    }

    return (
        <div className={styles.parent}>
        <div className={styles.popup}>
            <button className={styles.btn_exit}>Thoát</button>
            <div className={styles.header}>
                <span className={styles.btn_switch}>Đăng nhập </span>
                <h1 className={styles.h1}>Đăng ký</h1>

            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" id="fullname" onChange={(e) => setusername(e.target.value)} placeholder='Tên' className={styles.username} />
                <input type="text" id="username" onChange={(e) => setpassword(e.target.value)} placeholder='Tên đăng nhập' className={styles.username} />
                <input type="text" id="password" onChange={(e) => setfullname(e.target.value)} placeholder='Mật khẩu' className={styles.username} />
                <input type="text" id="repassword" onChange={(e) => setemail(e.target.value)} placeholder='Nhập lại mật khẩu' className={styles.username} />
                <input type="text" id="email" onChange={(e) => setphone(e.target.value)} placeholder='Email' className={styles.username} />
                <input type="text" id="phone" onChange={(e) => setrepassword(e.target.value)} placeholder='Phone' className={styles.username} />
            <div className={styles.footer}>
                <button className={styles.btn}>Đăng ký</button>
                <p className={styles.forget_pwd}>
                    <Link href={''} className={styles.link}>Đã có tài khoản? Đăng nhập ngay!</Link></p>
                

            </div>  
            </form>
    
            <div className={styles.rectangles}>      
            <div className={styles.rec3}></div>    
            <div className={styles.rec2}></div>
                <div className={styles.rec1}></div>


            </div>
        </div>
        </div>


    )
}