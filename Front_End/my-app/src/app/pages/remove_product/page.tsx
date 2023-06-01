'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Product from '@/app/components/product_in_list_column/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import avatar from "@/assets/images/omrp_logo_white.png"

const actions = [
    {
        title: 'Hồ sơ doanh nghiệp',
        to: '/partner_profile',
    },
    {
        title: 'Chọn sản phẩm',
        to: '/choose_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/product_array',
    },
    {
        title: 'Hợp đồng',
        to: '/make_contract',
    },
]

type url = {
    id: number,
    img: string,
}
  
type PRODUCT = {
    ID_PRODUCTS: number;
    NAME: string;
    INFOR_PRODUCTS: string | null;
    QUANTITY: number,
    PRICE: number,
    URL: url[],
    TYPE_PROD: string
}


const cx = classNames.bind(styles);
function RemoveProduct({ product }: { product: PRODUCT }) {

    const handleRemove = async () => {
        try {
            const response = await axios.delete(`/api/products/${product.ID_PRODUCTS}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        };

    return ( <div className={cx('remove_product')}>
        <div className={cx('remove_product-wrapper')}>
        <Header name_view='Doanh nghiệp'/>
        <div className={cx('remove_product-middle')}>
            <div className={cx('remove_product-middle__wrapper')}>
                <Sidebar author='Doanh nghiệp' page_path='/remove_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('remove_product-content')}>
                    <div className={cx('remove_product-product')}>
                        <Product  info={[product]} view='remove_product_business' />
                        <div className={cx('remove_product-btn')}>
                            <button className={cx("product-btn__remove")} onClick={handleRemove}>
                            <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} size="2x" />
                                Xác nhận gỡ
                            </button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default RemoveProduct;
