"use client";
import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./page.module.css"
import background from "@/assets/images/background.jpg"
import Login_Register_Nav from './login_register_nav/page';
import LoginForm from '../login/page';
import RegisterForm from '../register/page';

const cx = classNames.bind(styles);

export default function LoginRegister() {
    const [ loginPage, setLoginPage] = useState(false)
    return  (<div className={cx('login-register')}>
        <div className={cx('login-register-wrapper')}>
            <Image 
                src={background} 
                alt='background'
                className={cx('login-register__background')}
            />
            <div className={cx('login-register__nav')}><Login_Register_Nav/></div>
            <div className={cx('login-register__form')}>{ loginPage ? <LoginForm/> : <RegisterForm/>}</div>
            
        </div>
    </div>) ;
}