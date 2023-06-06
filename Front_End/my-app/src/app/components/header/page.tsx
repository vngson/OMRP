import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./page.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faUser,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import logo from "@/assets/images/omrp_logo_transparent.png"
import React from "react";

type MyComponentProps = {
    name_view: string
  };
const cx = classNames.bind(styles);

export default function Header({name_view}: MyComponentProps) {
    return <div className={cx('header')}>
        <div className={cx('header-wrapper')}>
            <Image src={logo}  alt='logo' className={cx('header-logo')}/>
            <div className={cx('header-search')}>
                <FontAwesomeIcon className={cx('header-search__icon')} icon={faMagnifyingGlass} size="2x"/>
                <input 
                type="text" 
                className={cx("header-search__input" )}
                id={cx("header-search-input")}
                placeholder="Tìm kiếm"  
                />
            </div>
            <label
                htmlFor="header__name-view" 
                className={cx("header-label")}
            >
                Chào, {name_view}
            </label>
            <div className={cx('header-icon__wrapper')}>
                <FontAwesomeIcon className={cx('header-cart')} icon={faCartShopping} size="2x"/>
            </div>
            <div className={cx('header-icon__wrapper')}>
                <FontAwesomeIcon className={cx('header-profile')} icon={faUser} size="2x"/>
            </div>
        </div>
    </div>
};