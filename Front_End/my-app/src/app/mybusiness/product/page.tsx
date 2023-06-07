'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import avatar from "@/assets/images/omrp_logo_white.png"
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import productAPI from '@/app/api/productAPI';
import PartnerAPI from '@/app/api/partnerAPI';
import Product from '@/components/product_in_list_column/page';



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
    const [noti, setNoti]= useState("")
    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const [currentGroup, setCurrentGroup] = useState(1);
    const productsPerPage = 5;
   
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    
    const cusID = user?.userInfo?.ID_Partners;
    const permiss = user?.user?.permission;
    const pms : number = Number(permiss);
    useEffect(() => {
        const fetchProduct= async ()=>{
            const res= await PartnerAPI.getProducts(cusID)
            setProducts(res.data.products)
        }
        fetchProduct();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, products.length);
    const currentProducts = products.slice(startIndex, endIndex);
    const groupSize = 3;
    const totalPages = Math.ceil(products.length / productsPerPage);


    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    };
   
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
      const handleDeleteBtn=async (prod: string, index: number)=>{
        const a1 = products.slice(0, index);
        const a2 = products.slice(index + 1, products.length);
        const new_arr = a1.concat(a2);
        setProducts(new_arr)
        const res = await PartnerAPI.deleteProduct(cusID, prod)

        setNoti(res.data.message);
        setTimeout(() => {
            setNoti("")
        }, 5000);
      console.log("not",res.data.message)
      }
   
  
    if(pms === 2){
        if(products.length===0){
            return (<>Không có sản phẩm.</>)
        }
        return ( 
       
                <div className={cx('list_product-content')}>
                               {noti===""?<></>: <div className={styles.noti}>{noti}</div>}

                    {currentProducts.map((product:any, index) => {
                        return (
                        <div key={product.ID_PRODUCTS} className={cx('list_product-product')} >
                            <Product  info={[product]} view='list_product_admin' />
                            <div className={cx('list_product-btn')} >
                            
                               
                                    <button className={cx("product-btn__remove")} onClick={()=>handleDeleteBtn(product.ID_PRODUCTS,index)}>
                                        <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} size="2x" />
                                        Gỡ sản phẩm
                                    </button>

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
        )
}
    else {
        return (  <div > <label> You do not have permission to access this page </label></div>)}
}

export default ListProduct;
