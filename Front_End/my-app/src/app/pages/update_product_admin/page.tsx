'use client';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import UpdateProductForm from '@/app/components/update_product_form/page';

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

const cx = classNames.bind(styles);
function UpdateProduct() {
    return ( <div className={cx('add_product')}>
        <div className={cx('add_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('add_product-middle')}>
            <div className={cx('add_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/add_product' LIST_ACTION={actions}/>
                <div className={cx('add_product-content')}>
                    <UpdateProductForm />
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default UpdateProduct;
