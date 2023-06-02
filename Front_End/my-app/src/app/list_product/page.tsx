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
import Link from 'next/link';
import avatar from "@/assets/images/omrp_logo_white.png"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


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
  
type PRODUCT = {
    ID_PRODUCTS: number,
    NAME: string,
    INFOR_PRODUCTS: string | null,
    QUANTITY: number,
    PRICE: number,
    URL: string,
    TYPE_PROD: string
}

type ApiResponse = {
    message: string;
    products: PRODUCT[];
    totalItems: string;
    perPage: number;
    currentPage: number;
};

type link = string;

const cx = classNames.bind(styles);
function ListProduct() {
    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
        .get<ApiResponse>('http://localhost:4132/v1/api/consumer/product?page=1&perPage=100')
        .then((response) => setProducts(response.data.products))
        .catch((error) => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const productsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
    const currentProducts = products.slice(startIndex, endIndex);
    const [currentGroup, setCurrentGroup] = useState(1);
    const groupSize = 3;
    const totalPages = Math.ceil(products.length / productsPerPage);

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

    return ( <div className={cx('list_product')}>
        <div className={cx('list_product-wrapper')}>
        <Header name_view='Admin'/>
        <div className={cx('list_product-middle')}>
            <div className={cx('list_product-middle__wrapper')}>
                <Sidebar author='Admin' page_path='/list_product' LIST_ACTION={actions} avt={avatar}/>
                <div className={cx('list_product-content')}>
                    {currentProducts.map((product) => {
                        return (
                        <div key={product.ID_PRODUCTS} className={cx('list_product-product')} >
                            <Product  info={[product]} view='list_product_admin' />
                            <div className={cx('list_product-btn')} >
                                <Link href={`/update_product`}> 
                                    <button className={cx("product-btn__update")} >
                                        <FontAwesomeIcon className={cx('update__icon')} icon={faCircleCheck} size="2x" />
                                        Cập nhật sản phẩm
                                    </button> 
                                </Link>
                                <Link href={`/delete_product`}>
                                    <button className={cx("product-btn__remove")} >
                                        <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} size="2x" />
                                        Xóa sản phẩm
                                    </button>
                                </Link>
                            </div>
                    
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

export default ListProduct;
