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
import avatar from "@/assets/images/omrp_logo_white.png"

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

type CONTRACT = {
    ID_CONTRACT: string,
    'Tên Doanh Nghiệp': string;
}

type ApiResponse = {
    message: string;
    contracts: CONTRACT[];
    totalItems: string;
    perPage: number;
    currentPage: number;
};

const cx = classNames.bind(styles);
function ManageContract() {
    const [contracts, setContracts] = useState<CONTRACT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get<ApiResponse>('https://project-ec-tuankhanh.onrender.com/v1/api/employee/contract?page=2&perPage=5')
        .then((response) => setContracts(response.data.contracts))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDisplayContract = () => {

    }

    const handleAccept = () => {

    }

    const handleRefuse = () => {

    }

    return ( <div className={cx('manage_contract')}>
        <div className={cx('manage_contract-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_contract-middle')}>
            <div className={cx('manage_contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_contract' LIST_ACTION={actions} avt={avatar}/>
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
                    {contracts.map((contract)=>{
                        return (
                        <div className={cx('manage_contract-info')}>
                        <label 
                            htmlFor="info-title__contractname" 
                            className={cx("manage_contract-info__label1")}
                        >
                            {contract['Tên Doanh Nghiệp']} 
                        </label>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_contract-info__label3")}
                            onClick={handleDisplayContract}
                        >
                            {contract.ID_CONTRACT} 
                        </label>
                        <div className={cx("contract-btn")}>
                            <button className={cx("contract-btn__confirm")} onClick={handleAccept}>
                                <FontAwesomeIcon className={cx('confirm__icon')} icon={faCircleCheck} size="2x"/>
                                Duyệt
                            </button>
                            <button className={cx("contract-btn__refuse")} onClick={handleRefuse}>
                                <FontAwesomeIcon className={cx('refuse__icon')} icon={faCircleXmark} size="2x"/>
                                Từ chối
                            </button>  
                        </div>
                        </div>
                    )})} 
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ManageContract;
