'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
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
    ID_Partners: string,
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
function ManagePartner() {
    const [contracts, setContracts] = useState<CONTRACT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get<ApiResponse>('http://localhost:4132/v1/api/employee/contract?page=2&perPage=5')
        .then((response) => setContracts(response.data.contracts))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDisplayContract = () => {

    }

    return ( <div className={cx('manage_partner')}>
        <div className={cx('manage_partner-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_partner-middle')}>
            <div className={cx('manage_partner-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_partner' LIST_ACTION={actions} avt={avatar}/>
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
                    {contracts.map((contract)=>{
                        return (
                                <div key={contract.ID_CONTRACT} className={cx('manage_partner-info')}>
                                    <label 
                                        htmlFor="info-title__partnername" 
                                        className={cx("manage_partner-info__label1")}
                                    >
                                        {contract['Tên Doanh Nghiệp']} 
                                    </label>
                                    <label 
                                        htmlFor="info-title__ID_partner" 
                                        className={cx("manage_partner-info__label3")}
                                    >
                                        {contract.ID_Partners} 
                                    </label>
                                    <label 
                                        htmlFor="info-title__ID_contract" 
                                        className={cx("manage_partner-info__label3")}
                                        onClick={handleDisplayContract}
                                    >
                                        {contract.ID_CONTRACT} 
                                    </label>  
                                </div>)
                    })} 
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ManagePartner;
