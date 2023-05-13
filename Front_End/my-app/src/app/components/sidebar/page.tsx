import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./page.module.css"
import avt from "@/assets/images/omrp_logo_white.png"
import React from "react";
import { stringify } from 'querystring';

const LIST_ACTION = [
    {
        title: 'Danh sách tài khoản',
        to: '/list_account',
    },
    {
        title: 'Thêm sản phẩm',
        to: '/add_product',
    },
    {
        title: 'Xóa sản phẩm',
        to: '/remove_product',
    },
    {
        title: 'Quản lý đơn hàng',
        to: '/manage_order',
    },
]

const cx = classNames.bind(styles);

type MyComponentProps = {
    page_path: string,
  };

export default function Sidebar({page_path}: MyComponentProps) {
    const handleClassname = (path:string) => {
        if(page_path===path)
            return 'sidebar-acction__btn-active'
        else
            return 'sidebar-acction__btn'
    }
    return  (<div className={cx('sidebar')}>
        <div className={cx('sidebar-wrapper')}>
            <div className={cx('sidebar-account__info')}>
                <Image src={avt}  alt='avt' className={cx('sidebar-account__avt')}/>
                <label 
                    htmlFor="sidebar-account__name" 
                    className={cx("sidebar-label")}
                >
                    Admin
                </label>
                <div className={cx("sidebar-account__line")}></div>
            </div> 
            <div className={cx('sidebar-acction')}>
            {LIST_ACTION.map((action, index) =>{
                return <button className={cx(handleClassname(action.to.toString()))} key={index}>{action.title}</button>
            })}
            </div>
            <button className={cx('sidebar__logout-btn')}>Đăng xuất</button>          
        </div>
    </div>) ;
}