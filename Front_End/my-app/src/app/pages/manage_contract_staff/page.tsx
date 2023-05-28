'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';

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
function ManageContract() {
    return ( <div className={cx('manage_contract')}>
        <div className={cx('manage_contract-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_contract-middle')}>
            <div className={cx('manage_contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_contract' LIST_ACTION={actions}/>
                <div className={cx('manage_contract-content')}>
                    <div className={cx('manage_contract-title')}>
                        <label 
                                htmlFor="manage_contract-title" 
                                className={cx("manage_contract-title__label2")}
                            >
                                Danh sách hợp đồng 
                        </label>
                    </div>
                    <div className={cx('manage_contract-nav')}>
                        <label 
                            htmlFor="info-title__contract_name" 
                            className={cx("manage_contract-nav__label1")}
                        >
                            Doanh nghiệp 
                        </label>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_contract-nav__label2")}
                        >
                            Mã hợp đồng 
                        </label>  
                    </div>
                    <div className={cx('manage_contract-info')}>
                        <label 
                            htmlFor="info-title__contractname" 
                            className={cx("manage_contract-info__label1")}
                        >
                            Ngô Gia 
                        </label>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_contract-info__label3")}
                        >
                            5977602081 
                        </label>
                        <div className={cx("contract-btn")}>
                            <button className={cx("contract-btn__confirm")}>
                                <FontAwesomeIcon className={cx('confirm__icon')} icon={faCircleCheck} />
                                Duyệt
                            </button>
                            <button className={cx("contract-btn__refuse")}>
                                <FontAwesomeIcon className={cx('refuse__icon')} icon={faCircleXmark} />
                                Từ chối
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ManageContract;
