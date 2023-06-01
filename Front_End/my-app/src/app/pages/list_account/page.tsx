'use client';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Account from '@/app/components/account_in_list_column/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useEffect, useState } from 'react';

type _Account = {
    ID_Login: number,
    Username: string,
    Permission: string,
    Status: string,
    Name: string,
    Email: string,
    Address: string,
    Phone: string,
    url: string
}

const actions = [
    {
        title: 'Danh sách tài khoản',
        to: '/list_account',
    },
    {
        title: 'Thêm sản phẩm',
        to: '/add_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/list_product',
    },
]

// const Information = {
//     "ID_Login": 3,
//     "Username": "0975087857",
//     "Permission": "Doanh Nghiệp",
//     "Status": "unlocked",
//     "Name": "BinPartner",
//     "Email": "luutuankhanhpart@gmail.com",
//     "Address": "617 thống nhất",
//     "Phone": "0975087857",
//     "url": "https://24hstore.vn/images/news/2020/07/29/original/apple-id-avatar_1596036467.jpg"
// }

// const INFO = [Information]

const cx = classNames.bind(styles);
function ListAccount() {
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
        const consumerResponse = await axios.get('http://localhost:4132/v1/api/admin/account?type=KH');
        const partnerResponse = await axios.get('http://localhost:4132/v1/api/admin/account?type=DT');
        setAccounts([...consumerResponse.data, ...partnerResponse.data]);
        }
    fetchData();
  }, []);

    return ( <div className={cx('list_account')}>
        <div className={cx('list_account-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('list_account-middle')}>
            <div className={cx('list_account-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/list_account' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('list_account-content')}>
                {accounts.map((_account) => {
                        return (
                            <Account key={_account.ID_Login} account={[_account]} />
                        )
                    })}
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ListAccount;