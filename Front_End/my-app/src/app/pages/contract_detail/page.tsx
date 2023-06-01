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
    ID_CONTRACT: number,
    "Mã số thuế": string,
    "Ngày lập HĐ": string,
    "Ngày hết HĐ": string,
    "Đơn vị đổi": number,
    "% giao dịch": number,
    "Tên doanh nghiệp": string,
    "Số điện thoại": string,
    Email: string,
    Image: string
}

type ApiResponse = {
    message: string;
    contract: CONTRACT[];
};

const cx = classNames.bind(styles);
function ContractDetail({id}: {id: number}) {
    const [contract, setContract] = useState<CONTRACT[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get<ApiResponse>(`https://project-ec-tuankhanh.onrender.com//v1/api/employee/contract/${id}`);
      setContract(response.data.contract);
    }
    fetchData();
  }, []);
    return ( <div className={cx('contract')}>
        <div className={cx('contract-wrapper')}>
        <Header name_view='Nhân viên'/>
        <div className={cx('contract-middle')}>
            <div className={cx('contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/manage_contract' LIST_ACTION={actions} avt={avatar}/>
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
                                {contract[0].ID_CONTRACT} 
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
                                htmlFor="info-title__date_contract" 
                                className={cx("contract__label")}
                            >
                                Ngày lập hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                Ngày hết hạn hợp đồng 
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
                                {contract[0]['Tên doanh nghiệp']}  
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                            {contract[0]['Mã số thuế']} 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                {contract[0]['Số điện thoại']}   
                            </label>  
                            <label 
                                htmlFor="info-title__email"  
                                className={cx("contract__label")}
                            >
                                {contract[0].Email} 
                            </label> 
                            <label 
                                htmlFor="info-title__date_contract" 
                                className={cx("contract__label")}
                            >
                                {new Date(contract[0]["Ngày lập HĐ"]).toLocaleDateString()}
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                {new Date(contract[0]["Ngày hết HĐ"]).toLocaleDateString()}
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label")}
                            >
                                {contract[0]['Đơn vị đổi']} 
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