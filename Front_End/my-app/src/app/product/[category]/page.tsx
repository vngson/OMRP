/* eslint-disable react/jsx-key */
"use client"
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_left_product, arrow_right_product, partner_img_1, product_img_2 } from '@/assets/images'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import TypeItem from '@/components/items/TypeItem/com'
import { Metadata, ResolvingMetadata } from 'next'
import productAPI from '@/app/api/productAPI'
import { categoryApi, productApi } from '@/app/api/apiReponseType'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'



type Props = {
  params: { category: string, img: string};
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function Layout({ params, searchParams }: Props) {

  const type=params.category
  console.log("type", type)
  const [type_name,setTypename]=useState("")
  const [curr_productlist, setCurr_Productlist]=useState([])
  const [next_productlist, setNext_Productlist]=useState([])
  const [prev_productlist, setPrev_Productlist]=useState([])
  const [cateImg, setCateImg]= useState("")
  const [catelist, setCatelist]  = useState([])
  const [pagi_idx, setPagi_idx] = useState(1)
  const [numpages, setNumPages] = useState(0)
  const itemPerpage =10;
  const [isIncreasing, setIsIncreasing]=useState(false)


  const fetchAllProductsOfType = async () => {
    const res = await productAPI.getAllProductsOfType(1, 10, type);
    setCurr_Productlist(res.data.products)
    setTypename(res.data.products[0].TYPE_PROD)
    console.log(res.data)
    setNumPages(res.data.totalItems/itemPerpage);

  }
  const fetchNextProductList = async (page_idx: number) => {
  
    
    const res = await productAPI.getAllProductsOfType(page_idx,itemPerpage, type);
    setNext_Productlist(res.data.products) 
    console.log("next: ",res.data)
  }
  const fetchPrevProductList = async (page_idx: number) => {
    if (page_idx<=0){
      return;
    }
    
    const res = await productAPI.getAllProductsOfType(page_idx,itemPerpage, type);
    setPrev_Productlist(res.data.products) 
    console.log("prev",res.data)
  }
  const fetchCategoryList= async() => {
    const res=await productAPI.getAllCatagories();
    const list = res.data.data
    console.log("list:",list)
    setCatelist(list)
    console.log("lists:",list.length)
    for (let i=0;i<list.length;i++){
     console.log("lít", list[i])
     console.log(list[i].TYPE_PROD===type_name)
     console.log("name: ",type_name)
      if (list[i].TYPE_PROD===type_name){
        setCateImg(list[i].Img)
        console.log("IMG", cateImg)
        break;
      }
    }

    
  }

  useEffect(()=>{
    fetchAllProductsOfType();
    if (numpages>1){
      fetchNextProductList(pagi_idx+1);
    }

  
  },)
  useEffect(()=>{
    fetchCategoryList();
  },[type_name])
  useEffect(()=>{
    if (isIncreasing===true){
      setPrev_Productlist(curr_productlist)
      setCurr_Productlist(next_productlist);
      fetchNextProductList(pagi_idx+1);
    } 
    if (isIncreasing===false){
      setNext_Productlist(curr_productlist)
      setCurr_Productlist(prev_productlist);
      fetchPrevProductList(pagi_idx-1);
    }

  },[pagi_idx])
  return (
   <main className={styles.container}> 

   <TypeItem logo={cateImg} name={type_name}/>
   {/* <div className={styles.title}>Danh sách các sản phẩm của doanh nghiệp</div> */}
   <div className={styles.product_list__grid}>
        {curr_productlist.map((prod:productApi)=>(
           
            <ProductItem img={prod.URL} name={prod.NAME} price={100}/>
          ))}
    </div>
    {numpages<1?(<></>):(
          <div className={styles.pagination}>
          {pagi_idx -1<=0?(<></>):(<>
            <Image onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num} src={arrow_left_product} alt=""/><p onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num}>{pagi_idx-1}</p></>)}
          <p className={styles.pagination_num} style={{color: `var(--primary-color-1)`}}>{pagi_idx}</p>
          {pagi_idx >numpages?(<></>):(<>
          <p onClick={() =>{setPagi_idx(pagi_idx+1); setIsIncreasing(true);}} className={styles.pagination_num}>{pagi_idx+1}</p><Image onClick={() =>{setPagi_idx(pagi_idx+1);setIsIncreasing(true);}} className={styles.pagination_num} src={arrow_right_product} alt=""/></>)}
          
        </div>
        )}
       
   </main>

  )
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: 'Next.js',
  };
}
export async function generateStaticParams(){
  const res = await productAPI.getAllCatagories();
  const types = res.data.data

  return types.map((type:categoryApi)=> {
    category: type.TYPE_PROD
  })
}