'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Product from '@/app/components/product_in_list_column/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useRouter, useSearchParams } from 'next/navigation';

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

type url = {
    id: number,
    img: string,
  }
  
type ProductData = {
  ID_PRODUCTS: number;
  NAME: string;
  INFOR_PRODUCTS: string | null;
  QUANTITY: number;
  PRICE: number;
  STT: number;
  TYPE_PROD: string;
  URL: {
    id: number;
    img: string;
  }[];
  partners: {
    ID_Partners: string;
    Name: string;
    url: string;
    GiaDoiThuong: number;
  }[];
};

type ApiResponse = {
  message: string;
  product: ProductData;
};


type Product = {
    ID_PRODUCTS: number;
    NAME: string;
    INFOR_PRODUCTS: string | null;
    QUANTITY: number,
    PRICE: number,
    URL: string,
    TYPE_PROD: string
}


const cx = classNames.bind(styles);
function DeleteProduct() {
    
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [product2, setProduct2] = useState<Product>({
        ID_PRODUCTS: 0,
        NAME: "",
        INFOR_PRODUCTS: "",
        QUANTITY: 0,
        PRICE: 0,
        URL: "",
        TYPE_PROD: ""
    });
    
    const router = useRouter();
    const searchParams = useSearchParams(); // get the search params object
    const id = searchParams.get("id"); // get the value of id
    const productId = Number(id); // convert it to a number

    useEffect(() => {
        axios
          .get<ApiResponse>(`${baseURL}/consumer/product/${productId}`)
          .then((response) => {
            const productData = response.data.product;
            setProduct2({
              ID_PRODUCTS: productData.ID_PRODUCTS,
              NAME: productData.NAME,
              INFOR_PRODUCTS: productData.INFOR_PRODUCTS,
              QUANTITY: productData.QUANTITY,
              PRICE: productData.PRICE,
              URL: productData.URL[0].img,
              TYPE_PROD: productData.TYPE_PROD,
            });
          })
          .catch((error) => setError(error.message));
      }, []);
      

    if (error) {
        return <div>Error: {error}</div>;
    }
    

    const handleRemove = async () => {
        try {
            const response = await axios.delete(
            `https://project-ec-tuankhanh.onrender.com/v1/api/admin/product/${product2.ID_PRODUCTS}`
            );
            console.log(response.data);  
            setMessage('Xóa sản phẩm thành công!');
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

    return ( <div className={cx('remove_product')}>
        <div className={cx('remove_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('remove_product-middle')}>
            <div className={cx('remove_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/admin/list_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('remove_product-content')}>
                    <div className={cx('remove_product-product')}>
                        <Product  info={[product2]} view='delete_product_admin' />
                        <div className={cx('remove_product-btn')}>
                            <button className={cx("product-btn__remove")} onClick={handleRemove}>
                            <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} size="2x"/>
                                Xác nhận xóa
                            </button>
                        </div>
                    </div>
                    {message&&(
                        <div className={cx('message')}>
                            <label 
                                htmlFor="info-title__message" 
                                className={cx("message__label")}
                            >
                                {message} 
                            </label>
                        </div>
                    )} 
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default DeleteProduct;
