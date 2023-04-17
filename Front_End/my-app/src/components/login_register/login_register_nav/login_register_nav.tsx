import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./login_register_nav.module.css"
import logo from "@/assets/images/omrp_logo_transparent.png"
import LoginForm from '@/components/login/login';
import RegisterForm from '@/components/register/register';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

export default function Login_Register_Nav() {
    const [ loginPage, setLoginPage] = useState(false)
    const handleLogin = () => {
        loginPage ? loginPage : setLoginPage(true);
    }
    const router=useRouter();
    const handleRegister = () => {
        loginPage ? setLoginPage(false) : loginPage;
    }

    return  (<div className={cx('login-register-nav')}>
        <div className={cx('nav-wrapper')}>
            <Image src={logo}  alt='logo' className={cx('nav__logo')}/>
            <div className={cx('nav__labels')}> 
                <button className={loginPage ? cx('nav__label-login') : cx('nav__label')} onClick={(e) =>router.push("/")}>
                    Đăng nhập
                </button>
                <button className={loginPage ? cx('nav__label') : cx('nav__label-register')} onClick={handleRegister}>
                    Đăng ký
                </button>
            </div>
            <div className={cx('login-register__form')}>{ loginPage ? <LoginForm/> : <RegisterForm/>}</div> 
        </div>
    </div>) ;
}