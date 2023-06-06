import { useRef } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./page.module.css"
import logo from "@/assets/images/omrp_logo_transparent.png"
import React from "react";


const cx = classNames.bind(styles);

export default function Footer() {
    return <div className={cx('footer')}>
        <div className={cx('footer-wrapper')}>
            <Image src={logo}  alt='logo' className={cx('footer-logo')}/>
            <div className={cx('footer-text__wrapper')}>
                <div className={cx('footer-text')}>
                    <label
                        htmlFor="footer__text" 
                        className={cx("footer-label")}
                    >
                        Copyright © 2023 OMRP. All rights reserved
                    </label>
                    <label
                        htmlFor="footer__text" 
                        className={cx("footer-label")}
                    >
                        OMRP - One milion reward point
                    </label>
                    <label
                        htmlFor="footer__text" 
                        className={cx("footer-label")}
                    >
                        1 triệu điểm thưởng, 1 triệu niềm vui
                    </label>
                </div>
            </div>
        </div>
    </div>
};