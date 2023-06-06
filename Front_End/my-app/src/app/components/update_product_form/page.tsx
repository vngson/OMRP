'use client';
// Import the ErrorBoundary component
import React, { useState, useEffect , ChangeEvent }from 'react';
import { baseURL } from '@/app/api/bareURL';
import axios from 'axios';
import Image from 'next/image';
import classNames from 'classnames/bind';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from './page.module.css';
import DefaultImage from  "@/assets/images/image_default.jpg"

type ImgURL = {
  id: number,
  img: string
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
// Define the types for the product and image objects
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

// Define the props type for the UpdateProductForm component
type UpdateProductFormProps = {
  idProduct: number;
};

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
  product: ProductData;
};

const cx = classNames.bind(styles);

async function convertImgURLToImageFile(imgURLs: ImgURL[]) { }

function UpdateProductForm({ idProduct }: UpdateProductFormProps) {
  const [product, setProduct] = useState<Product>({
    name: "",
    desc: "",
    quantity: 0,
    price: 0,
    images: [],
    type: ""
  });
  const [product2, setProduct2] = useState<ProductData>();
  const [images, setImages] = useState<ImgURL[]>([]);
  const [catelog, setCatelog] =useState<category[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true)
  
  async function fetchData1() {
      const response = await axios.get<ApiResponse1>(`${baseURL}/consumer/category`)
      setCatelog(response.data.data);
  }
  fetchData1();

  useEffect(() => {
  
  async function fetchData2() {
    axios
    .get<ApiResponse2>(`${baseURL}/consumer/product/${idProduct}`)
    .then((response) =>{
      const productData = response.data.product;
      setProduct2(productData)
      setProduct((prev) => ({
        ...prev,
        name: product2?.NAME || '',
        price: product2?.PRICE||0,
        desc: product2?.INFOR_PRODUCTS || '',
        quantity: product2?.QUANTITY||0,
        type: product2?.TYPE_PROD || '',
      }));
      setImages(product2?.URL||[]);
      setIsFirstRender(false); // thêm dòng này
    })
    .catch((error) => console.log(error.message));
  }
  fetchData2();
  }, [isFirstRender]);

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
      formData.append("name", product.name);
      product.images.forEach((image) => {
        formData.append("images", image.img);
      });
      formData.append("type", product.type);
      if (product.desc) {
        formData.append("desc", product.desc);
      }
      formData.append("quantity", product.quantity.toString());
      formData.append("price", product.price.toString());
      
      const response = await axios.put(
        `${baseURL}/admin/postProduct/${product2?.ID_PRODUCTS}`,
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
            >
              Ảnh sản phẩm
            </label>
            <div className={cx('product_update_form-image__show')}>
            <div className={cx('product_update_form-image__show')}>
             {images.length > 0 && (
              <>
                <div className={cx('product_update_form-larger_image')}>
                  {images.slice(0, 1).map((_url, index) => (
                    <img
                      key={index}
                      src={_url.img}
                      alt=""
                      className={cx('product_update_form-larger_image-img')}
                    />
                  ))}
                </div>
                <div className={cx('product_update_form-small_image')}>
                  {images.slice(1, 4).map((_url,index) => (
                    <>
                      <img
                        key={index}
                        src={_url.img}
                        alt=""
                        className={cx('product_update_form-small_image-child')}
                      />
                    </>
                  ))}
                  {images.length > 0 &&
                    images.length < 4 &&
                    Array.from({ length: 4 - images.length }).map((_, index) => (
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
            {images.length === 0 && (
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
              <select 
              onChange={handleInputChange}
              className={cx('product_update_form-type__input')}
              name="type"
              value={product.type}
              >
                {catelog.map((cate,index) => (

                  <option key={index} value={cate.TYPE_PROD}>
                    {cate.TYPE_PROD}
                  </option>
                ))}
              </select>
            </label>
            <label className={cx('product_update_form-description')}>
              Giới thiệu sản phẩm:
              <textarea
                name="desc"
                value={product.desc||""}
                onChange={handleInputChange}
                className={cx('product_update_form-description__input')}
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
            <button className={cx('product_update_form-btn')} onClick={handleSubmit}>
              Cập nhật sản phẩm
            </button> 
          </div> 
        </div>
      </div>
  );
}

export default UpdateProductForm;