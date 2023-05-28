'use client';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from "./page.module.css"
import { useState } from 'react';

type Info = {
    src: StaticImageData;
    username: string;
    fullname: string;
    type: string;
    title: string;
}

type MyComponentProps = {
    info: Info[]
  };

const cx = classNames.bind(styles);

function Account({info}: MyComponentProps) {
    const title = info[0].title;
    return  (<div className={cx('account')}>
        <div className={cx('account-wrapper')}>
            <div className={cx("account-name")} >
                <label 
                    htmlFor="account-name" 
                    className={cx("account-name__text")}
                >
                    {info[0].username}
                </label>
            </div>
            <div className={cx("account__line-top")}></div>
            <div className={cx("account-info")}>
                <Image
                    src= {info[0].src}
                    alt={'avatar'}
                    className={cx('account-info__avt')}                 
                />
                <label 
                    htmlFor="account-info__username" 
                    className={cx("account-info__username")}
                >
                    Tên người dùng : {info[0].fullname}
                </label>
                <label 
                    htmlFor="account-info__accounttype" 
                    className={cx("account-info__accounttype")}
                >
                    Loại tài khoản : {info[0].type} 
                </label>
            </div>
            <div className={cx("account__line-bottom")}></div>
            {title === 'Mở khóa tài khoản' && (
            <button className={cx("account-btn__activated")}>
                <FontAwesomeIcon className={cx('activated__icon')} icon={faCircleCheck} />
                Mở khóa tài khoản
            </button>)}
            {title === 'Khóa tài khoản' && (<button className={cx("account-btn__banned")}>
            <FontAwesomeIcon className={cx('banned__icon')} icon={faCircleXmark} />
                Khóa tài khoản
            </button>) }
        </div>
    </div>) ;
}

export default Account;