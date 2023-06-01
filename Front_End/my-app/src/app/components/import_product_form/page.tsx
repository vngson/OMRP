'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import classNames from 'classnames/bind';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from './page.module.css';
import DefaultImage from  "@/assets/images/image_default.jpg"


const cx = classNames.bind(styles);

type url = {
  id: number,
  img: string,
}

type Product = {
  ID_PRODUCTS: number;
  NAME: string;
  INFOR_PRODUCTS: string | null;
  QUANTITY: number,
  PRICE: number,
  URL: url[],
  TYPE_PROD: string
}

function ProductForm() {
  const [product, setProduct] = useState<Product>({
    ID_PRODUCTS: 0,
    NAME: "",
    INFOR_PRODUCTS: "",
    QUANTITY: 0,
    PRICE: 0,
    URL: [],
    TYPE_PROD: ""
  });
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (newImages.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: newImages,
      }));
      setNewImages([]);
    }
  }, [newImages]);

  const handleImportImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageURL = URL.createObjectURL(file);

      setProduct(prevProduct => ({
        ...prevProduct,
        URL: [...prevProduct.URL, { id: prevProduct.URL.length + 1, img: imageURL }]
      }));
    }
  }

  const handleLabelClick = () => {
    (document.getElementById('file-input') as HTMLInputElement).click();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };     

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://project-ec-tuankhanh.onrender.com//v1/api/admin/postProduct/', product);
      console.log(response.data);
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  return (
    <div className={cx('product_inport_form')}>
      <div className={cx('product_inport_form-wrapper')}>
        <div className={cx('product_inport_form-image')}>
          <label
              className={cx('product_inport_form-image__label')}
              onClick={handleLabelClick}
            >
              Chọn hình ảnh
          </label>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImportImage}
            className={cx('product_inport_form-image__input')}
            placeholder='a'
          />
          <div className={cx('product_inport_form-image__show')}>
          {product.URL.length > 0 && (
              <>
                <div className={cx('product_inport_form-larger_image')}>
                  {product.URL.slice(0, 1).map((_url, index) => (
                    <img
                      key={index}
                      src={_url.img}
                      alt=""
                      className={cx('product_inport_form-larger_image-img')}
                      width={300}
                      height={300}
                    />
                  ))}
                </div>
                <div className={cx('product_inport_form-small_image')}>
                  {product.URL.slice(1, 4).map((_url) => (
                    <>
                      <img
                        key={_url.id}
                        src={_url.img}
                        alt=""
                        className={cx('product_inport_form-small_image-child')}
                        width={90}
                        height={90}
                      />
                    </>
                  ))}
                  {product.URL.length > 0 &&
                    product.URL.length < 4 &&
                    Array.from({ length: 4 - product.URL.length }).map((_, index) => (
                      <>
                        <div key={index} className={cx('product_import_form-small__image')}>
                          <Image
                            src={DefaultImage}
                            alt="image default"
                            className={cx('product_import_form-small_image-child')}
                            width={90}
                            height={90}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </>
            )}
            {product.URL.length === 0 && (
              <>
                <div className={cx('product_inport_form-larger_image')}>
                  <Image
                    src={DefaultImage}
                    alt="image default"
                    className={cx('product_inport_form-larger_image-img')}
                    width={300}
                    height={300}
                  />
                </div>
                <div className={cx('product_import_form-small_image')}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <>
                        <Image
                          key={index}
                          src={DefaultImage}
                          alt="image default"
                          className={cx('product_import_form-small_image-child')}
                          width={90}
                          height={90}
                        />
                    </>
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
        <div className={cx('product_inport_form-info')}>
          <label className={cx('product_inport_form-name')}>
            Tên sản phẩm:
            <input
              type="text"
              name="name"
              value={product.NAME}
              onChange={handleInputChange}
              className={cx('product_inport_form-name__input')}
            />
          </label>
          <label className={cx('product_inport_form-type')}>
            Loại sản phẩm:
            <input
              type="text"
              name="type"
              value={product.TYPE_PROD}
              onChange={handleInputChange}
              className={cx('product_inport_form-type__input')}
            />
          </label>
          <label className={cx('product_inport_form-description')}>
            Giới thiệu sản phẩm:
            <textarea
              name="description"
              value={product.INFOR_PRODUCTS||""}
              onChange={handleInputChange}
              className={cx('product_inport_form-description__input')}
            />
          </label>
          <label className={cx('product_inport_form-price')}>
            Giá:
            <input
              type="number"
              name="quantity"
              value={product.PRICE}
              onChange={handleInputChange}
              className={cx('product_inport_form-price__input')}
              min="0"
            />
          </label>
          <label className={cx('product_inport_form-quantity')}>
            Số lượng:
            <input
              type="number"
              name="quantity"
              value={product.QUANTITY}
              onChange={handleInputChange}
              className={cx('product_inport_form-quantity__input')}
              min="0"
            />
          </label>
          <button className={cx("product_inport_form-btn")} onClick={handleSubmit}>
          <FontAwesomeIcon className={cx('btn__icon')} icon={faCircleCheck} />
            Thêm sản phẩm
          </button> 
        </div>     
      </div>
    </div>
  );
}

export default ProductForm;