'use client';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import React from "react";

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

type MyComponentProps = {
    view: string;
    info: PRODUCT[]
};
const cx = classNames.bind(styles);

function Product({view, info}: MyComponentProps) {
    return  (<div className={cx('product')}>
        <div className={cx('product-wrapper')}>
            <div className={cx("product-info")}>
                <img
                    src= {info[0].URL[0].img}
                    alt='Hình ảnh sản phẩm'
                    className={cx('product-info__image')}
                    width={150}
                    height={150}                 
                />
                <div className={cx('product-info__intro')}>
                    <div className={cx('product-info__title')}>
                        <label 
                            htmlFor="info-title__username" 
                            className={cx("product-info__label")}
                        >
                            Tên sản phẩm : 
                        </label>
                        <label 
                            htmlFor="info-title__product_type" 
                            className={cx("product-info__label")}
                        >
                            Thể loại : 
                        </label>
                        <label 
                            htmlFor="info-title__description" 
                            className={cx("product-info__label")}
                        >
                            Giới thiệu : 
                        </label>
                        <label 
                            htmlFor="info-title__price" 
                            className={cx("product-info__label")}
                        >
                            {(view === 'list_product_admin'||view === 'remove_product_admin'||view === 'choose_product_business') && 'Số lượng :'}
                            {(view === 'list_product_business'|| view === 'remove_product_business') && 'Giá :'} 
                        </label>
                    </div>
                    <div className={cx('product-info__content')}>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            {info[0].NAME}
                        </label>
                        <label 
                            htmlFor="info-content__producttype" 
                            className={cx("product-info__label")}
                        >
                            {info[0].TYPE_PROD} 
                        </label>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            {info[0].INFOR_PRODUCTS}
                        </label>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            {(view === 'list_product_admin'||view === 'remove_product_admin'||view === 'choose_product_business') && `${info[0].QUANTITY} `}
                            {(view === 'list_product_business'|| view === 'remove_product_business') && `${info[0].PRICE} điểm`}
                            
                        </label>
                    </div>
                </div>
            </div>
            <div className={cx("product-line")}></div>
            {/* {(view === 'list_product_admin') && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__update")}>
                    <FontAwesomeIcon className={cx('update__icon')} icon={faCircleCheck} />
                    Cập nhật sản phẩm
                </button>
                <button className={cx("product-btn__remove")}>
                    <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                    Xóa sản phẩm
                </button>
            </div>
            ) }
            {(view === 'remove_product_admin') && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__remove")}>
                    <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                    Xác nhận xóa
                </button>
            </div>
            )}
            {(view === 'choose_product_business') && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__choose")}>
                    <FontAwesomeIcon className={cx('choose__icon')} icon={faCircleCheck} />
                    Chọn sản phẩm
                </button>
            </div>)}
            {(view === 'list_product_business') && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__remove")}>
                    <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                    Gỡ sản phẩm
                </button>
            </div>)}
            {(view === 'remove_product_business') && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__remove")}>
                    <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                    Xác nhận gỡ
                </button>
            </div>
            )} */}
        </div>
    </div>) ;
}

export default Product;