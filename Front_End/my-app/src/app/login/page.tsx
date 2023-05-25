"use client"
import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./page.module.css"
import background from "@/assets/images/background.jpg"
import Login_Register_Nav from '@/components/login/login_register_nav/login_register_nav'
import RegisterForm from '@/components/login/register/register';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import logo from "@/assets/images/omrp_logo_transparent.png"
import {useRouter} from "next/navigation"
import { loginUser } from '@/redux/apiRequests';
import LoginForm from '@/components/login/login/login';
const cx = classNames.bind(styles);

export default function Login_Page() {
    const [ loginPage, setLoginPage] = useState(true)
    const [username, setUsername]=useState("")
    const [pwd, setPwd] = useState("")
    console.log("ssr: ",username, pwd)
    const dispatch=useDispatch()
    const router=useRouter();
    const handleSubmitLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const newUser ={
            phone: username,
            password: pwd
        }
        console.log("newuser sent: ",newUser)
        loginUser(newUser, dispatch, router)
    }

    const handleLogin = () => {
    
        loginPage ? (  loginPage) :( setLoginPage(true));
        // setLoginPage(true)
        console.log(loginPage)
    }

    const handleRegister = () => {
        loginPage ? setLoginPage(false) : loginPage
        // setLoginPage(false)
        console.log(loginPage)
    }
    return  (<div className={cx('login-register')}>
        <div className={cx('login-register-wrapper')}>
            <Image 
                src={background} 
                alt='background'
                className={cx('login-register__background')}
            />
            <div className={cx('login-register__nav')}><Login_Register_Nav/></div>
        </div>
    </div>) ;
}