'use client';
import classNames from 'classnames/bind';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Account from '@/app/components/account_in_list_column/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type _AccountKH = {
    ID_Login: number,
    Username: string,
    Permission: string,
    Status: string,
    Name: string,
    Address: string,
    Email: string,
    Phone: string,
    Img: string
}

type _AccountDT = {
    ID_Login: number,
    Username: string,
    Permission: string,
    Status: string,
    Name: string,
    Email: string,
    Address: string,
    Phone: string,
    Img: string
}

const actions = [
    {
        title: 'Danh sách tài khoản',
        to: '/admin/list_account',
    },
    {
        title: 'Thêm sản phẩm',
        to: '/admin/add_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/admin/list_product',
    },
]

type ApiResponse1 = {
    message: string;
    data: _AccountKH[];
};
type ApiResponse2 = {
    message: string;
    data: _AccountDT[];
};


const cx = classNames.bind(styles);
function ListAccount() {
    const [accounts, setAccounts] = useState<_AccountKH[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);

    useEffect(() => {
        async function fetchData() {
        const consumerResponse = await axios.get<ApiResponse1>(`${baseURL}/admin/account?type=KH`);
        const partnerResponse = await axios.get<ApiResponse2>(`${baseURL}/admin/account?type=DT`);
        const data1 = consumerResponse.data.data;
        const data2 = partnerResponse.data.data;
        const newAccounts: _AccountKH[] = [];

        for (const item of data1) {
          newAccounts.push({
            ID_Login: data1[0].ID_Login,
            Username: data1[0].Username,
            Permission: data1[0].Permission,
            Status: data1[0].Status,
            Name: data1[0].Name,
            Email: data1[0].Email,
            Address: data1[0].Address,
            Phone: data1[0].Phone,
            Img: data1[0].Img
          });
        }

        for (const item of data2) {
          newAccounts.push({
            ID_Login: data2[0].ID_Login,
            Username: data2[0].Username,
            Permission: data2[0].Permission,
            Status: data2[0].Status,
            Name: data2[0].Name,
            Email: data2[0].Email,
            Address: data2[0].Address,
            Phone: data2[0].Phone,
            Img: data2[0].Img
          });
        }

        setAccounts(newAccounts);
    }
    fetchData();
    }, []);

    const accountsPerPage = 5;
    

    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * accountsPerPage;
    const endIndex = Math.min(startIndex + accountsPerPage, accounts.length);
    const currentAccounts= accounts.slice(startIndex, endIndex);
    
    const groupSize = 3;
    const totalPages = Math.ceil(accounts.length / accountsPerPage);

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

    return ( <div className={cx('list_account')}>
        <div className={cx('list_account-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('list_account-middle')}>
            <div className={cx('list_account-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/admin/list_account' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('list_account-content')}>
                    {currentAccounts.map((_account) => {
                            return (
                                <div className={cx('list_account-acc')} >
                                    <Account key={_account.ID_Login} account={[_account]} />
                                    </div>
                            )
                    })}
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
                    <style jsx>{`
                    .active {
                        color: var(--primary-color-1);
                    }
                    `}</style>
                </div>               
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ListAccount;