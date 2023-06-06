'use client';
// Import the ErrorBoundary component
import React, { useState, useEffect , ChangeEvent }from 'react';

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

type Product1 = {
  ID_PRODUCTS: number;
  NAME: string;
  INFOR_PRODUCTS: string | null;
  QUANTITY: number,
  PRICE: number,
  URL: string,
  TYPE_PROD: string
}
// type ImageFile = {
//   file: File;
//   imageUrl: string;
// };

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

function UpdateProduct1({ idProduct }: UpdateProductFormProps) {

  const [product2, setProduct2] = useState<ProductData>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData2() {
      axios
      .get<ApiResponse2>(`https://project-ec-tuankhanh.onrender.com/v1/api/consumer/product/${idProduct}`)
      .then((response) =>{
        const productData = response.data.product;
            setProduct2(productData);
      })
      .catch((error) => setError(error.message));
    }
    fetchData2();
  },[]);
  

  return (
      <div className={cx('product_update_form')}>
        <div className={cx('product_update_form__title')}>
          <h1>{product2?.NAME}</h1>
        </div>
      </div>
  );
}

export default UpdateProduct1;










// import React from "react";
// import { Grid } from "@mui/material";
// import DefaultImage from  "@/assets/images/image_default.jpg"

// type ImageGridProps = {
//   images: Array<ImageFile>;
// };

// type ImageFile = {
//   file: File;
//   imageUrl: string;
// };

// const ImageGrid = (props: ImageGridProps) => {
//   const { images } = props;

//   const displayImages = new Array(4);

  
//   for (let i = 0; i < images.length; i++) {
//     displayImages[i] = images[i];
//   }

  
//   for (let i = images.length; i < 4; i++) {
//     displayImages[i] = { file: new File([], ""), imageUrl: DefaultImage };
//   }

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12} md={6}>
//         <img
//           src={displayImages[0].imageUrl}
//           alt="Large image"
//           style={{ width: "100%", height: "auto" }}
//         />
//       </Grid>
//       <Grid item xs={12} md={6} container spacing={2}>
//         {displayImages.slice(1).map((image, index) => (
//           <Grid item xs={6} key={index}>
//             <img
//               src={image.imageUrl}
//               alt={`Small image ${index + 1}`}
//               style={{ width: "100%", height: "auto" }}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Grid>
//   );
// };

// export default ImageGrid;
