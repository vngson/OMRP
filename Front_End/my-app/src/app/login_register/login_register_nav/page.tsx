import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./page.module.css"
import logo from "@/assets/images/omrp_logo_transparent.png"
import LoginForm from '@/app/login/page';
import RegisterForm from '@/app/register/page';


const cx = classNames.bind(styles);

export default function Login_Register_Nav() {
    const [ loginPage, setLoginPage] = useState(false)
    const handleLogin = () => {
        loginPage ? loginPage : setLoginPage(true);
    }

    const handleRegister = () => {
        loginPage ? setLoginPage(false) : loginPage;
    }

    return  (<div className={cx('login-register-nav')}>
        <div className={cx('nav-wrapper')}>
            <Image src={logo}  alt='logo' className={cx('nav__logo')}/>
            <div className={cx('nav__labels')}> 
                <div className={loginPage ? cx('nav__label-login') : cx('nav__label')} onClick={handleLogin}>
                    Đăng nhập
                </div>
                <div className={loginPage ? cx('nav__label') : cx('nav__label-register')} onClick={handleRegister}>
                    Đăng ký
                </div>
            </div>
            <div className={cx('login-register__form')}>{ loginPage ? <LoginForm/> : <RegisterForm/>}</div> 
        </div>
    </div>) ;
}