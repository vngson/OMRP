/* eslint-disable react/jsx-key */
"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'

import { arrow_img, arrow_left_product, arrow_right_product, banner_home_customer, partner_img_1, product_img_1, product_img_2 } from '@/assets/images'
import PartnerSmallItem from '@/components/items/PartnerSmallItem/com'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerSmallItem_1 from '@/components/items/PartnerSmallItem_1/com'
import productAPI from '@/app/api/productAPI'
import { partnerApi, productApi } from '@/app/api/apiReponseType'
import PartnerAPI from '@/app/api/partnerAPI'
import { Metadata } from 'next'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })
type Props = {
  params: {slug:string[]},
  searchParams : string
}
export default function BuninessPage({ params }:Props) {
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]
  const [curr_productlist, setCurr_Productlist]=useState([])
  const [next_productlist, setNext_Productlist]=useState([])
  const [prev_productlist, setPrev_Productlist]=useState([])
  const [pagi_idx, setPagi_idx] = useState(1)
  const [numpages, setNumPages] = useState(0)
  const [isIncreasing, setIsIncreasing]=useState(false)
  const [partner, setPartner] = useState<partnerApi>()
  const itemPerpage =10;
  const [change, setChange] = useState(0)
  const idPartners = params.slug[1]

  const fetchProductList = async () => {
  
    const res = await productAPI.getAllProductOfPartner(idPartners,pagi_idx.toString(),itemPerpage.toString());
    setCurr_Productlist(res.data.producs)
    console.log(res.data)
    setNumPages(res.data.producs.length/itemPerpage);
    // console.log("num pages", res.data.producs.length)
    
  }
  // 1: all product list
  const fetchNextProductList = async (page_idx: number) => {
    
    const res = await productAPI.getAllProductOfPartner(idPartners,pagi_idx.toString(),itemPerpage.toString());
    setNext_Productlist(res.data.producs) 
    // console.log("next: ",res.data)
  }
  const fetchPrevProductList = async (page_idx: number) => {
    if(page_idx< 0){
      return;
    }
    const res = await productAPI.getAllProductOfPartner(idPartners,pagi_idx.toString(),itemPerpage.toString());
    setPrev_Productlist(res.data.producs) 
    // console.log("prev",res.data)
  }
  const fetchPartner = async () => {
    const res= await PartnerAPI.getPartners(idPartners)
    setPartner(res.data.partner)

  }
  useEffect(()=> {
    // get product list
    fetchPartner();
    fetchProductList();
    fetchNextProductList(pagi_idx+1);


    // console.log(productlist)

  },[change])

  useEffect(()=> {
    // get product list

    if (isIncreasing===true){
      setPrev_Productlist(curr_productlist)
      setCurr_Productlist(next_productlist);
      fetchNextProductList(pagi_idx+1);
    } else{
      setNext_Productlist(curr_productlist)
      setCurr_Productlist(prev_productlist);
      fetchPrevProductList(pagi_idx-1);
    }
    // console.log(productlist)
  },[pagi_idx])

  
  return (
   <div className={styles.container}> 
   <PartnerSmallItem_1 logo={partner?.url} name={partner?.Name}/>
   <div className={styles.title}>Danh sách các sản phẩm của doanh nghiệp</div>
   <div className={styles.product_list__grid}>
        {curr_productlist?.map((prod:productApi)=>(
           
            <ProductItem img={prod?.IMG} name={prod?.NAME} price={prod?.PRICE}/>
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
   </div>
  )
}

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: 'Next.js',
  };
}
export async function generateStaticParams(){
  const res = await PartnerAPI.getAllPartners();

  const partners = res.data.partners;

  return partners.map((partner: partnerApi)=> ({
    slug:[  partner.Name, partner.ID_Partners]

  }))
}