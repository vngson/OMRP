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

type url = {
    id: number,
    img: string,
}
  
type PRODUCT = {
    ID_PRODUCTS: number,
    NAME: string,
    INFOR_PRODUCTS: string | null,
    QUANTITY: number,
    PRICE: number,
    URL: url[],
    TYPE_PROD: string
}

type ApiResponse = {
    message: string;
    products: PRODUCT[];
    totalItems: string;
    perPage: number;
    currentPage: number;
};

const cx = classNames.bind(styles);
function ListProduct() {
    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get<ApiResponse>('https://project-ec-tuankhanh.onrender.com/v1/api/consumer/product')
        .then((response) => setProducts(response.data.products))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleRemove = () => {}
    const handleUpdate = () => {}

    return ( <div className={cx('list_product')}>
        <div className={cx('list_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('list_product-middle')}>
            <div className={cx('list_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/list_product' LIST_ACTION={actions}/>
                <div className={cx('list_product-content')}>
                    {products.map((product) => {
                        return (
                        <div key={product.ID_PRODUCTS} >
                            <Product  info={[product]} view='list_product_admin' />
                            <button className={cx("product-btn__update")} onClick={handleUpdate}>
                                <FontAwesomeIcon className={cx('update__icon')} icon={faCircleCheck} />
                                Cập nhật sản phẩm
                            </button>
                            <button className={cx("product-btn__remove")} onClick={handleRemove}>
                            <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                                Xóa sản phẩm
                            </button>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ListProduct;
