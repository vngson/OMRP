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
function ContractDetail() {
    return ( <div className={cx('contract')}>
        <div className={cx('contract-wrapper')}>
        <Header name_view='Nhân viên'/>
        <div className={cx('contract-middle')}>
            <div className={cx('contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_contract' LIST_ACTION={actions}/>
                <div className={cx('contract-container')}>
                    <div className={cx('contract-title')}>
                        <label 
                                htmlFor="contract-title" 
                                className={cx("contract-title__label")}
                            >
                                HỢP ĐỒNG 
                        </label>
                    </div>
                    <div className={cx('contract-ID')}>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label1")}
                            >
                                Mã hợp đồng 
                        </label>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label2")}
                            >
                                5977602081 
                        </label>
                    </div>
                    <div className={cx('contract-content')}>
                        <div className={cx('contract-topic')}>
                            <label 
                                htmlFor="info-title__contract_name" 
                                className={cx("contract__label")}
                            >
                                Tên doanh nghiệp 
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                                Mã số thuế 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                Số điện thoại 
                            </label>  
                            <label 
                                htmlFor="info-title__email" 
                                className={cx("contract__label")}
                            >
                                Email 
                            </label> 
                            <label 
                                htmlFor="info-title__bank_account" 
                                className={cx("contract__label")}
                            >
                                Tài khoản ngân hàng 
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                Thời hạn hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label")}
                            >
                                Tỉ lệ quy đổi điểm 
                            </label> 
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label")}
                            >
                                Phí hoa hồng 
                            </label>   
                        </div>
                        <div className={cx('contract-info')}>
                        <label 
                                htmlFor="info-title__contract_name" 
                                className={cx("contract__label")}
                            >
                                Ngô gia 
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                                2846389039572 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                03xxxxxxxx 
                            </label>  
                            <label 
                                htmlFor="info-title__ID_contract" 
                                className={cx("contract__label")}
                            >
                                ngogia@gmail.com 
                            </label> 
                            <label 
                                htmlFor="info-title__ID_contract" 
                                className={cx("contract__label")}
                            >
                                5008xxxxxxxxx 
                            </label> 
                            <label 
                                htmlFor="info-title__ID_contract" 
                                className={cx("contract__label")}
                            >
                                3 năm 
                            </label> 
                            <label 
                                htmlFor="info-title__ID_contract" 
                                className={cx("contract__label")}
                            >
                                1 point - 1 VND 
                            </label>  
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label")}
                            >
                                30% 
                            </label>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ContractDetail;
