'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import avatar from "@/assets/images/omrp_logo_white.png"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const actions = [
    {
        title: 'Hổ trợ khách hàng',
        to: '/employee/customer_support',
    },
    {
        title: 'Quản lý đối tác',
        to: '/employee/manage_partner',
    },
    {
        title: 'Quản lý hợp đồng',
        to: '/employee/manage_contract',
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
    const [message, setMessage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);

    useEffect(() => {
        axios
        .get<ApiResponse>(`${baseURL}/employee/contract?page=1&perPage=100`)
        .then((response) => setContracts(response.data.contracts))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const contractsPerPage = 5;

    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * contractsPerPage;
    const endIndex = Math.min(startIndex + contractsPerPage, contracts.length);
    const currentContracts = contracts.slice(startIndex, endIndex);
    const groupSize = 3;
    const totalPages = Math.ceil(contracts.length / contractsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
          handlePageChange(currentPage + 1);
          if (currentPage % groupSize === 0) {
            setCurrentGroup(currentGroup + 1);
          }
        }
      };
      
    const handlePrevPage = () => {
        if (currentPage > 1) {
          handlePageChange(currentPage - 1);
          if ((currentPage - 1) % groupSize === 0) {
            setCurrentGroup(currentGroup - 1);
          }
        }
      };

    const handleAccept  = async (event: React.MouseEvent,e:string) => {
        try {
      
          const response = await axios.put(
            `https://project-ec-tuankhanh.onrender.com/v1/api/employee/updateContract/${e}`
          );
          console.log(response.data);
          setMessage('Duyệt thành công!');
          setTimeout(() => {
            location.reload();
          }, 2000);
        } catch (error) {
          console.error((error as Error).message);
          setMessage('Có lỗi xảy ra');
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      };

    const handleRefuse  = async (event: React.MouseEvent,e:string) => {
        try {
            const response = await axios.put(
                `https://project-ec-tuankhanh.onrender.com/v1/api/employee/updateContract/${e}`
              );
            // const response = await axios.put(
            //   `https://project-ec-tuankhanh.onrender.com/v1/api/employee/deleteContract/${e}`
            // );
            console.log(response);
            setMessage('Đã từ chối hợp đồng!');
            setTimeout(() => {
                location.reload();
              }, 2000);
          } catch (error) {
            console.error((error as Error).message);
            setMessage('Có lỗi xảy ra');
            setTimeout(() => {
                location.reload();
              }, 2000);
          }
        };
    

    return ( <div className={cx('manage_contract')}>
        <div className={cx('manage_contract-wrapper')}>
        <Header name_view='Nhân viên' />
        <div className={cx('manage_contract-middle')}>
            <div className={cx('manage_contract-middle__wrapper')}>
                <Sidebar author='Nhân viên' page_path='/employee/manage_contract' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('manage_contract-content')}>
                    {message&&(
                        <div className={cx('message')}>
                            <label 
                                htmlFor="info-title__message" 
                                className={cx("manage_contract-info__label4")}
                            >
                                {message} 
                            </label>
                        </div>
                    )}
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
                    {currentContracts.map((contract)=>{
                        return (
                        <div className={cx('manage_contract-info')}>
                        <label 
                            htmlFor="info-title__contractname" 
                            className={cx("manage_contract-info__label1")}
                        >
                            {contract['Tên Doanh Nghiệp']} 
                        </label>
                        <Link href={{ pathname: "/employee/contract_detail/:id", query: { id: contract.ID_CONTRACT } }}>
                        <label 
                            htmlFor="info-title__ID_contract" 
                            className={cx("manage_contract-info__label3")}
                        >
                            {contract.ID_CONTRACT} 
                        </label>
                        </Link>
                        <div className={cx("contract-btn")}>
                            <button className={cx("contract-btn__confirm")} onClick={(event) => handleAccept(event,contract.ID_CONTRACT)}>
                                <FontAwesomeIcon className={cx('confirm__icon')} icon={faCircleCheck} size="2x"/>
                                Duyệt
                            </button>
                            <button className={cx("contract-btn__refuse")} onClick={(event) => handleRefuse(event,contract.ID_CONTRACT)}>
                                <FontAwesomeIcon className={cx('refuse__icon')} icon={faCircleXmark} size="2x"/>
                                Từ chối
                            </button>  
                        </div>
                        </div>
                    )})} 
                    <div className={cx("pagination")}>
                        <button onClick={handlePrevPage} className={cx("prev-btn")}>
                            <FontAwesomeIcon className={cx('btn__icon')} icon={faChevronLeft} size="2x"/>    
                        </button>
                        {Array.from(
                        { length: Math.min(groupSize, totalPages - (currentGroup - 1) * groupSize) },
                        (_, index) => {
                            const pageNumber = (currentGroup - 1) * groupSize + index + 1;
                            return (
                            <button
                                key={index}
                                onClick={() => handlePageChange(pageNumber)}
                                className={cx(
                                "page_number",
                                pageNumber === currentPage ? "active" : ""
                                )}
                            >
                                {pageNumber}
                            </button>
                            );
                        }
                        )}
                        <button onClick={handleNextPage} className={cx("next-btn")}>
                            <FontAwesomeIcon className={cx('btn__icon')} icon={faChevronRight} size="2x"/>
                        </button>
                    </div>
                    <style jsx>
                        {`
                            .active {
                                color: var(--primary-color-1);
                            }
                        `}
                    </style>
                    
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
};

export default ManageContract;
