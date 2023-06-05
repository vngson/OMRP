"use client"
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./header_cus.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faUser,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import logo from "@/assets/images/omrp_logo_transparent.png"
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SearchComp from '../search/search';
import { userApi } from '@/app/api/apiReponseType';

const cx = classNames.bind(styles);

export default function Header() {

    const user = useSelector((state: any)=> state.auth.login.currentUser)

    return <div className={cx('header')}>
        <div className={cx('header-wrapper')} >
            <Link href="/" className={cx('header-logo')}><Image src={logo} width={80} height={60} alt='logo' /></Link>
            
            {/* <div className={cx('header-search')}>
                <FontAwesomeIcon className={cx('header-search__icon')} icon={faMagnifyingGlass} />
                <input 
                type="text" 
                className={cx("header-search__input" )}
                id={cx("header-search-input")}
                placeholder="Tìm kiếm"  
                />
            </div> */}
            <SearchComp/>
            {user!==null? ( <label
                htmlFor="header__name-view" 
                className={cx("header-label")}
            >
                Chào, {user?.userInfo?.NAME}
            </label>):( <Link href={"/login"}
                className={cx("header-label")}
            >
                Đăng nhập
            </Link>)}
           <Link href="/account/cart"> 
           <div className={cx('header-icon__wrapper')}><FontAwesomeIcon className={cx('header-cart')} size="2x" icon={faCartShopping} /></div></Link>
         {/* <Link href="/account/cart"></Link> */}
            <div className={cx('header-icon__wrapper')}><FontAwesomeIcon className={cx('header-profile')} size="2x" icon={faUser} /></div>
        </div>
    </div>
};