 "use client"

import Image from 'next/image'
 import styles from './login.module.css'
import React,  { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import UserAPI from '../api/userAPI'
import { useSelector,useDispatch } from 'react-redux'
// import { getUsersData } rom '../state/actions/userActions'
import { loginUser } from '@/redux/apiRequests'
import authSlice from '@/redux/authSlice'
import { useRouter } from 'next/navigation'
import { useNavigate } from 'react-router-dom'



export default function Login () {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router=useRouter();
  const handleSubmit =  (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newUser = {
      phone: username,
      password: password,
    };
    console.log("newUser", newUser)
loginUser(newUser, dispatch,router);
   // eslint-disable-next-line react-hooks/rules-of-hooks
   //const user=useSelector((state: any)=> state.auth.login.currentUser)
  //  router.push("/")
  }

   

  return (
    <React.Fragment>
      <div>
       <div className={styles.parent}>
        <div className={styles.popup} >
            <button className={styles.btn_exit}>Thoát</button>
            <div className={styles.header}>
                <h1 className={styles.h1}>Đăng nhập </h1>
                <span className={styles.btn_switch}>Đăng ký</span>

            </div>
            <form className={styles.form} onSubmit={handleSubmit} >
              <div className={styles.input}> <input type="text" id='username' onChange={(e)=> setUsername(e.target.value)} placeholder='Tên đăng nhập' className={styles.username} />
                <input type="text" id ='password' onChange={(e)=> setPassword(e.target.value)} placeholder='Mật khẩu' className={styles.username} /></div>
               
                <div className={styles.footer}>
                    <div className={styles.forget_pwd}>
                     <Link href={''} className={styles.link}>Quên mật khẩu?</Link>
                    </div>
                    <button className={styles.btn}>Đăng nhập</button>
                </div> 
            </form>
     
            <div className={styles.rectangles}>      
            <div className={styles.rec3}></div>    
            <div className={styles.rec2}></div>
                <div className={styles.rec1}></div>


            </div>
        </div>
        </div>
      </div>
    </React.Fragment>
  )
}

