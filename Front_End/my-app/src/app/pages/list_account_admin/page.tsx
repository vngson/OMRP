'use client';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Account from '@/app/components/account_in_list_column/page';
import avt from "@/assets/images/omrp_logo_white.png"

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

const Information = {
    src: avt,
    username: 'Sonvo',
    fullname: "Võ Ngọc Sơn",
    type: "Khách hàng",
    title: 'Khóa tài khoản',
}

const INFO = [Information]

const cx = classNames.bind(styles);
function ListAccount() {
    return ( <div className={cx('list_account')}>
        <div className={cx('list_account-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('list_account-middle')}>
            <div className={cx('list_account-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/list_account' LIST_ACTION={actions}/>
                <div className={cx('list_account-content')}>
                    <Account info={INFO}/>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ListAccount;
