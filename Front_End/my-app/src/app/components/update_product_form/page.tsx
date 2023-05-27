'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from './page.module.css';
import DefaultImage from  "@/assets/images/image_default.jpg"


const cx = classNames.bind(styles);

interface Product {
  name: string;
  type: string;
  description: string;
  quantity: number;
  images: File[];
}

function UpdateProductForm() {
  const [product, setProduct] = useState<Product>({
    name: '',
    type: '',
    description: '',
    quantity: 0,
    images: [],
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      setNewImages(files);
    }
  };

  const handleLabelClick = () => {
    (document.getElementById('file-input') as HTMLInputElement).click();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
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
            onChange={handleFileChange}
            className={cx('product_update_form-image__input')}
            placeholder='a'
          />
          <div className={cx('product_update_form-image__show')}>
            {product.images.length > 0 && (
              <>
                <div className={cx('product_update_form-larger_image')}>
                  {product.images.slice(0, 1).map((image) => (
                    <img
                      key={image.name}
                      src={URL.createObjectURL(image)}
                      alt=""
                      className={cx('product_update_form-larger_image-img')}
                    />
                  ))}
                </div>
                <div className={cx('product_update_form-small_image')}>
                  {product.images.slice(1, 4).map((image) => (
                    <>
                      <img
                        key={image.name}
                        src={URL.createObjectURL(image)}
                        alt=""
                        className={cx('product_update_form-small_image-child')}
                      />
                    </>
                  ))}
                  {product.images.length > 0 &&
                    product.images.length < 4 &&
                    Array.from({ length: 4 - product.images.length }).map((_, index) => (
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
            {product.images.length === 0 && (
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
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className={cx('product_update_form-name__input')}
            />
          </label>
          <label className={cx('product_update_form-type')}>
            Loại sản phẩm:
            <input
              type="text"
              name="type"
              value={product.type}
              onChange={handleInputChange}
              className={cx('product_update_form-type__input')}
            />
          </label>
          <label className={cx('product_update_form-description')}>
            Giới thiệu sản phẩm:
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              className={cx('product_update_form-description__input')}
            />
          </label>
          <label className={cx('product_update_form-quantity')}>
            Số lượng:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              className={cx('product_update_form-quantity__input')}
              min="0"
            />
          </label>
          <button className={cx("product_update_form-btn")}>
          <FontAwesomeIcon className={cx('btn__icon')} icon={faCircleCheck} />
            Cập nhật sản phẩm
          </button> 
        </div>     
      </div>
    </div>
  );
}

export default UpdateProductForm;