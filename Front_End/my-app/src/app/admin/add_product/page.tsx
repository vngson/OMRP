'use client'
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import ProductForm from '@/app/components/import_product_form/page';
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
function AddProduct() {
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    
    const cusID = user?.user?.userId
    const permiss = user?.user?.permission;
    const pms : number = Number(permiss);

    if(pms === 1){
        return ( <div className={cx('add_product')}>
        <div className={cx('add_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('add_product-middle')}>
            <div className={cx('add_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/admin/add_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('add_product-content')}>
                    <ProductForm />
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> )}
    else {
        return (  <div > <label> You do not have permission to access this page </label></div>)}
}

export default AddProduct;
