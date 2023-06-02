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
import { type } from 'os';


const cx = classNames.bind(styles);

type ImageFile = {
  file: File
  imageUrl: string
}

type url = {
  img: File,
}

type Product = {
  name: string;
  desc: string | null;
  quantity: number,
  price: number,
  images: url[],
  type: string
}

type category = {
  TYPE_PROD: string,
  Img: string
}

type ApiResponse = {
  message: string;
  data: category[];
};


function ProductForm() {
  const [product, setProduct] = useState<Product>({
    name: "",
    desc: "",
    quantity: 0,
    price: 0,
    images: [],
    type: ""
  });
  const [newImages, setNewImages] = useState<File[]>([]);
  const [imagees, setImagees] = useState<ImageFile[]>([])
  const [catelog, setCatelog] =useState<category[]>([])
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get<ApiResponse>('http://localhost:4132/v1/api/consumer/category')
      setCatelog(response.data.data);
    }
    fetchData();

    if (newImages.length > 0) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [
          ...prevProduct.images,
          ...newImages.map((newImage) => ({ img: newImage })),
        ],
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
  
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [
          ...prevProduct.images,
          ...files.map((file) => ({ img: file })),
        ],
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
    console.log(product)
  };
       

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      product.images.forEach((image) => {
        formData.append("images", image.img);
      });
      formData.append("name", product.name);
      if (product.desc) {
        formData.append("desc", product.desc);
      }
      formData.append("quantity", product.quantity.toString());
      formData.append("price", product.price.toString());
      formData.append("type", product.type);
  
      const response = await axios.post(
        "http://localhost:4132/v1/api/admin/postProduct/",
        formData,
      );
      console.log(response.data);
      setMessage('Thêm sản phẩm thành công!');
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
  

  return (
    <div className={cx('product_inport_form')}>
      <div className={cx('product_inport_form-wrapper')}>
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
          {product.images.length > 0 && (
              <>
                <div className={cx('product_inport_form-larger_image')}>
                  {imagees.slice(0, 1).map((_url, index) => (
                    <img
                      key={index}
                      src={_url.imageUrl}
                      alt=""
                      className={cx('product_inport_form-larger_image-img')}
                      width={300}
                      height={300}
                    />
                  ))}
                </div>
                <div className={cx('product_inport_form-small_image')}>
                  {imagees.slice(1, 4).map((_url,index) => (
                    <>
                      <img
                        key={index}
                        src={_url.imageUrl}
                        alt=""
                        className={cx('product_inport_form-small_image-child')}
                        width={90}
                        height={90}
                      />
                    </>
                  ))}
                  {product.images.length > 0 &&
                    product.images.length < 4 &&
                    Array.from({ length: 4 - product.images.length }).map((_, index) => (
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
            {product.images.length === 0 && (
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
              value={product.name}
              onChange={handleInputChange}
              className={cx('product_inport_form-name__input')}
            />
          </label>
          <label className={cx('product_inport_form-type')}>
            Loại sản phẩm:
            <select 
            onChange={handleInputChange}
            className={cx('product_inport_form-type__input')}
            name="type"
            value={product.type}
            >
              {catelog.map((cate,index) => (

                <option key={index} value={cate.TYPE_PROD}>
                  {cate.TYPE_PROD}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              name="type"
              value={product.type}
              onChange={handleInputChange}
              className={cx('product_inport_form-type__input')}
            /> */}
          </label>
          <label className={cx('product_inport_form-description')}>
            Giới thiệu sản phẩm:
            <textarea
              name="desc"
              value={product.desc||""}
              onChange={handleInputChange}
              className={cx('product_inport_form-description__input')}
            />
          </label>
          <label className={cx('product_inport_form-price')}>
            Giá:
            <input
              type="number"
              name="price"
              value={product.price}
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
              value={product.quantity}
              onChange={handleInputChange}
              className={cx('product_inport_form-quantity__input')}
              min="0"
            />
          </label>
          <button className={cx("product_inport_form-btn")} onClick={handleSubmit}>
          <FontAwesomeIcon className={cx('btn__icon')} icon={faCircleCheck} size="2x"/>
            Thêm sản phẩm
          </button> 
        </div>     
      </div>
    </div>
  );
}

export default ProductForm;