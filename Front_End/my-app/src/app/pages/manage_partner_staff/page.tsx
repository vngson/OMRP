'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';

const actions = [
    {
        title: 'Hổ trợ khách hàng',
        to: '/customer_support',
    },
    {
        title: 'Quản lý đối tác',
        to: '/manage_partner',
    },
    {
        title: 'Quản lý hợp đồng',
        to: '/manage_contract',
    },
]

const cx = classNames.bind(styles);
function ManagePartner() {
    return ( <div className={cx('manage_partner')}>
        <div className={cx('manage_partner-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_partner-middle')}>
            <div className={cx('manage_partner-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_partner' LIST_ACTION={actions}/>
                <div className={cx('manage_partner-content')}>
                    <div className={cx('manage_partner-title')}>
                        <label 
                                htmlFor="manage_partner-title" 
                                className={cx("manage_partner-title__label2")}
                            >
                                Danh sách đối tác 
                        </label>
                    </div>
                    <div className={cx('manage_partner-nav')}>
                        <label 
                            htmlFor="info-title__partner_name" 
                            className={cx("manage_partner-nav__label1")}
                        >
                            Doanh nghiệp 
                        </label>
                        <label 
                            htmlFor="info-title__ID_partner" 
                            className={cx("manage_partner-nav__label2")}
                        >
                            Mã doanh nghiệp 
                        </label>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_partner-nav__label2")}
                        >
                            Mã hợp đồng 
                        </label>  
                    </div>
                    <div className={cx('manage_partner-info')}>
                        <label 
                            htmlFor="info-title__partnername" 
                            className={cx("manage_partner-info__label1")}
                        >
                            Ngô Gia 
                        </label>
                        <label 
                            htmlFor="info-title__ID_partner" 
                            className={cx("manage_partner-info__label3")}
                        >
                            5977602081 
                        </label>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_partner-info__label3")}
                        >
                            5977602081 
                        </label>  
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ManagePartner;
