'use client';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from "./page.module.css"
import image_product from "@/assets/images/ly_giu_nhiet.png"
import { useState } from 'react';
import React from "react";

type MyComponentProps = {
    admin: React.ReactNode;
    business: React.ReactNode; 
    red_title: string,
    green_title: string,
  };
const cx = classNames.bind(styles);

function Product({admin = false, business = false, red_title, green_title}: MyComponentProps) {
    const [banned, setBanned] = useState(false)
    const [custommer, setCustommer] = useState(false)
    return  (<div className={cx('product')}>
        <div className={cx('product-wrapper')}>
            <div className={cx("product-info")}>
                <Image
                    src= {image_product}
                    alt='Hình ảnh sản phẩm'
                    className={cx('product-info__image')}                 
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
                            Giá : 
                        </label>
                    </div>
                    <div className={cx('product-info__content')}>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            Bình giữ nhiệt
                        </label>
                        <label 
                            htmlFor="info-content__producttype" 
                            className={cx("product-info__label")}
                        >
                            Cốc, ly, bình 
                        </label>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            Ly giữ nhiệt 600ml chính hãng tặng kèm ống hút inox 304 cao cấp thiết kế nhám mờ hạn chế trầy xước cách nhiệt chân không
                        </label>
                        <label 
                            htmlFor="info-content__username" 
                            className={cx("product-info__label")}
                        >
                            30 điểm 
                        </label>
                    </div>
                </div>
            </div>
            <div className={cx("product-line")}></div>
            {admin && (
            <div className={cx('product-btn')}>
                <button className={cx("product-btn__delete")}>
                    <FontAwesomeIcon className={cx('delete__icon')} icon={faCircleXmark} />
                    Xóa sản phẩm
                </button>
            </div>
            ) }
            {business && (
            <div className={cx('product-btn')}>
                {green_title&&(
                <button className={cx("product-btn__update")}>
                    <FontAwesomeIcon className={cx('update__icon')} icon={faCircleCheck} />
                    {green_title}
                </button>)}
                {red_title&&(
                <button className={cx("product-btn__remove")}>
                    <FontAwesomeIcon className={cx('remove__icon')} icon={faCircleXmark} />
                    {red_title}
                </button>)}
            </div>
            )}
        </div>
    </div>) ;
}

export default Product;