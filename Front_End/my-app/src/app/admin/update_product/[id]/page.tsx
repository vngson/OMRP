'use client';
import classNames from 'classnames/bind';
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import UpdateProductForm from '@/app/components/update_product_form/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useSelector } from 'react-redux';

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

const cx = classNames.bind(styles);
function UpdateProduct() {
    const router = useRouter();
    const searchParams = useSearchParams(); // get the search params object
    const id = searchParams.get("id"); // get the value of id
    const productId = Number(id); // convert it to a number
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    
    const cusID = user.user.userId
    const permiss = user.user.permission;
    const pms : number = Number(permiss);
    if (productId!== null && pms === 1) {
        return ( <div className={cx('update_product')}>
            <div className={cx('update_product-wrapper')}>
            <Header name_view='Admin'/>
            <div className={cx('update_product-middle')}>
                <div className={cx('update_product-middle__wrapper')}>
                    <Sidebar author='Admin' page_path='/admin/list_product' LIST_ACTION={actions} avt={avatar}/>
                    <div className={cx('update_product-content')}>
                        <UpdateProductForm idProduct={productId} />
                    </div>
                </div>
            </div>
            <Footer />
            </div>
        </div> );
    }
    else if(productId === null){
        <div> <h1>Can not find product</h1> </div>
    }
    else if(pms !== 1){
        return (  <div > <label> You do not have permission to access this page </label></div>)}
}

export default UpdateProduct;
