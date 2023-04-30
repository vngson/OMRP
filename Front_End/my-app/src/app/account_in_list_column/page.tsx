'use client';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from "./page.module.css"
import avt from "@/assets/images/omrp_logo_white.png"
import { useState } from 'react';


const cx = classNames.bind(styles);

function Account() {
    const [banned, setBanned] = useState(false)
    const [custommer, setCustommer] = useState(false)
    return  (<div className={cx('account')}>
        <div className={cx('account-wrapper')}>
            <div className={cx("account-name")} >
                <label 
                    htmlFor="account-name" 
                    className={cx("account-name__text")}
                >
                    Sonvo1
                </label>
            </div>
            <div className={cx("account__line-top")}></div>
            <div className={cx("account-info")}>
                <Image
                    src= {avt}
                    alt={'avatar'}
                    className={cx('account-info__avt')}                 
                />
                <label 
                    htmlFor="account-info__username" 
                    className={cx("account-info__username")}
                >
                    Tên người dùng : Võ Ngọc Sơn 
                </label>
                <label 
                    htmlFor="account-info__accounttype" 
                    className={cx("account-info__accounttype")}
                >
                    Loại tài khoản : {custommer ? "Khách hàng":"Doanh nghiệp"} 
                </label>
            </div>
            <div className={cx("account__line-bottom")}></div>
            {banned ? (<button className={cx("account-btn__banned")}>
            <FontAwesomeIcon className={cx('banned__icon')} icon={faCircleXmark} />
                Khóa tài khoản
            </button>) :(
            <button className={cx("account-btn__activated")}>
                <FontAwesomeIcon className={cx('activated__icon')} icon={faCircleCheck} />
                Mở khóa tài khoản
            </button>) }
        </div>
    </div>) ;
}

export default Account;