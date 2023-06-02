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

type ImageFile = {
  file: File
  imageUrl: string
}

type urlg = {
  id: number,
  img: string,
}

type Product_get = {
  ID_PRODUCTS: number;
  NAME: string;
  INFOR_PRODUCTS: string | null;
  QUANTITY: number,
  PRICE: number,
  STT: number,
  URL: urlg[],
  TYPE_PROD: string
}

type category = {
  TYPE_PROD: string,
  Img: string
}

type ApiResponse1 = {
  message: string;
  data: category[];
};

type ApiResponse2 = {
  message: string;
  product: Product_get[];
};

const cx = classNames.bind(styles);

function UpdateProductForm({ idProduct }: { idProduct: number }) {
  const [product, setProduct] = useState<Product_get[]>([]);
  const [imagees, setImagees] = useState<ImageFile[]>([])
  const [newImages, setNewImages] = useState<File[]>([]);

  const [catelog, setCatelog] =useState<category[]>([])

  useEffect(() => {
    async function fetchData1() {
      const response = await axios.get<ApiResponse1>('http://localhost:4132/v1/api/consumer/category')
      setCatelog(response.data.data);
    }
    fetchData1();
    async function fetchData2() {
      const response = await axios.get<ApiResponse2>(`http://localhost:4132/v1/api/consumer/product/${idProduct}`)
      setProduct(response.data.product);
    }
    fetchData2();
    
    if (newImages.length > 0) {
      setProduct((prev) => ({
        ...prev,
        URL: [...prev[0].URL, { img: newImages }],
      }));
      setNewImages([]);
    }
  }, [newImages]);

  const handleImportImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => ({
        file,
        imageUrl: URL.createObjectURL(file),
      }));
      setImagees((prevImages) => [...prevImages, ...newImages]);
      setProduct((prev) => ({
        ...prev,
        URL: [...prev[0].URL, { img: newImages }],
      }));
    }
  }

  const handleLabelClick = () => {
    (document.getElementById('file-input') as HTMLInputElement).click();
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };
       

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      newImages.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("name", product[0].NAME);
      if (product[0].INFOR_PRODUCTS) {
        formData.append("desc", product[0].INFOR_PRODUCTS);
      }
      formData.append("quantity", product[0].QUANTITY.toString());
      formData.append("price", product[0].PRICE.toString());
      formData.append("type", product[0].TYPE_PROD);
  
      const response = await axios.put(
        `http://localhost:4132/v1/api/admin/postProduct/${product[0].ID_PRODUCTS}`,
        formData,
      );
      console.log(response.data);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className={cx('product_update_form')}>
      <div className={cx('product_update_form-wrapper')}>
        <div className={cx('product_update_form-image')}>
          <label
              className={cx('product_update_form-image__label')}
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
            className={cx('product_update_form-image__input')}
            placeholder='a'
          />
          <div className={cx('product_update_form-image__show')}>
            {product[0].URL.length > 0 && (
              <>
                <div className={cx('product_update_form-larger_image')}>
                  {product[0].URL.slice(0, 1).map((_url, index) => (
                    <img
                      key={index}
                      src={_url.img}
                      alt=""
                      className={cx('product_update_form-larger_image-img')}
                    />
                  ))}
                </div>
                <div className={cx('product_update_form-small_image')}>
                  {product[0].URL.slice(1, 4).map((_url) => (
                    <>
                      <img
                        key={_url.id}
                        src={_url.img}
                        alt=""
                        className={cx('product_update_form-small_image-child')}
                      />
                    </>
                  ))}
                  {product[0].URL.length > 0 &&
                    product[0].URL.length < 4 &&
                    Array.from({ length: 4 - product[0].URL.length }).map((_, index) => (
                      <>
                        <div key={index} className={cx('product_update_form-small__image')}>
                          <Image
                            src={DefaultImage}
                            alt="image default"
                            className={cx('product_update_form-small_image-child')}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </>
            )}
            {product[0].URL.length === 0 && (
              <>
                <div className={cx('product_update_form-larger_image')}>
                  <Image
                    src={DefaultImage}
                    alt="image default"
                    className={cx('product_update_form-larger_image-img')}
                  />
                </div>
                <div className={cx('product_update_form-small_image')}>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <>
                      <div key={index} className={cx('product_update_form-small__image')}>
                        <Image
                          src={DefaultImage}
                          alt="image default"
                          className={cx('product_update_form-small_image-child')}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
        </div>
      </div>
        <div className={cx('product_update_form-info')}>
          <label className={cx('product_update_form-name')}>
            Tên sản phẩm:
            <input
              type="text"
              name="NAME"
              value={product[0].NAME}
              onChange={handleInputChange}
              className={cx('product_update_form-name__input')}
            />
          </label>
          <label className={cx('product_update_form-type')}>
            Loại sản phẩm:
            <input
              type="text"
              name="TYPE_PROD"
              value={product[0].TYPE_PROD}
              onChange={handleInputChange}
              className={cx('product_update_form-type__input')}
            />
          </label>
          <label className={cx('product_update_form-description')}>
            Giới thiệu sản phẩm:
            <textarea
              name="INFOR_PRODUCTS"
              value={product[0].INFOR_PRODUCTS||""}
              onChange={handleInputChange}
              className={cx('product_update_form-description__input')}
            />
          </label>
          <label className={cx('product_inport_form-price')}>
            Giá:
            <input
              type="number"
              name="PRICE"
              value={product[0].PRICE}
              onChange={handleInputChange}
              className={cx('product_inport_form-price__input')}
              min="0"
            />
          </label>
          <label className={cx('product_update_form-quantity')}>
            Số lượng:
            <input
              type="number"
              name="QUANTITY"
              value={product[0].QUANTITY}
              onChange={handleInputChange}
              className={cx('product_update_form-quantity__input')}
              min="0"
            />
          </label>
          <button className={cx("product_update_form-btn")} onClick={handleSubmit}>
          <FontAwesomeIcon className={cx('btn__icon')} icon={faCircleCheck} size="2x"/>
            Cập nhật sản phẩm
          </button> 
        </div>     
      </div>
    </div>
  );
}

export default UpdateProductForm;