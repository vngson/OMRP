/* eslint-disable react/jsx-key */
"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
// import LoginRegister from '@/components/login_register/login_register'
import { arrow_img, arrow_left_product, arrow_right_product, banner_home_customer, partner_img_1_square, product_img_1, product_img_2 } from '@/assets/images'
import ProductItem from '@/components/items/ProductItem/ProductItem'
import PartnerLargeItem from '@/components/items/partner/PartnerLargeItem/PartnerLargeItem'
import { useSelector } from 'react-redux'
import UserAPI from '../api/userAPI'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function BusinessListPage() {
    const user=useSelector((state:any)=> state.auth.login.currentUser)
  const cusID=user.user.userId
  const a= [1,2,3,4,5,6,]
  const b= [1,2,3,4,5,6,1,2,3,4,5,6,]

  //consumerPartner
  //AllPartners
  const [curr_allpartners, setCurr_allpartners]=useState([])
  const [next_allpartners, setNext_allpartners]=useState([])
  const [prev_allpartners, setPrev_allpartners]=useState([])
  const [curr_consumerPartners, setCurr_consumerPartners]=useState([])
  const [next_consumerPartners, setNext_consumerPartners]=useState([])
  const [prev_consumerPartners, setPrev_consumerPartners]=useState([])

  const [pagi_idx, setPagi_idx] = useState(1)
  const [numpages, setNumPages] = useState(0)
  const [isIncreasing, setIsIncreasing]=useState(false)
  const [pagi_idx1, setPagi_idx1] = useState(1)
  const [numpages1, setNumPages1] = useState(0)
  const [isIncreasing1, setIsIncreasing1]=useState(false)

  const [partnerListTab, setpartnerListTab] = useState(1) // 1 : all 2: cos the doi
  const partnerListTabName = ["Tất cả doanh nghiệp", "Danh sách các doanh nghiệp có thể đổi quà"]
  const itemPerpage =10;
  const fetchPartnerList = async () => {
  
    const res = await UserAPI.getALLPartners(pagi_idx.toString(),itemPerpage.toString());
    setCurr_allpartners(res.data.partners)
    console.log(res.data)
    setNumPages(res.data.totalItems/itemPerpage);
    console.log("num pages", res.data.totalItems/itemPerpage)
    
  }
  // 1: all product list
  const fetchNextPartnerList = async (page_idx: number) => {
    
    const res = await UserAPI.getALLPartners(page_idx.toString(), itemPerpage.toString())
    setNext_allpartners(res.data.partners) 
    console.log("next: ",res.data)
  }
  const fetchPrevPartnerList = async (page_idx: number) => {
    
    const res = await UserAPI.getALLPartners(page_idx.toString(), itemPerpage.toString())
    setPrev_allpartners(res.data.partners) 
    console.log("prev",res.data)
  }
   // 2: productExchangePoint- đủ điểm đổi
   const fetchconsumerPartners = async () => {
  
    const res = await UserAPI.getExchangePartners(cusID, pagi_idx1.toString(),itemPerpage.toString());
    setCurr_consumerPartners(res.data.partners)
    console.log(res.data)
    setNumPages1(res.data.totalItems/itemPerpage);
    console.log("num pages", res.data.totalItems/itemPerpage)
    
  }
  const fetchNextconsumerPartners = async (page_idx: number) => {
  
    const res = await UserAPI.getExchangePartners(cusID, pagi_idx.toString(),itemPerpage.toString());
    setNext_consumerPartners(res.data.partners) 
    console.log("next: ",res.data)
  }
  const fetchPrevconsumerPartners = async (page_idx: number) => {
  
    const res = await UserAPI.getExchangePartners(cusID, pagi_idx.toString(),itemPerpage.toString());
    setPrev_consumerPartners(res.data.partners) 
    console.log("prev",res.data)
  }
  useEffect(()=> {
    // get product list

    fetchPartnerList();
    fetchNextPartnerList(pagi_idx+1);
    fetchconsumerPartners();
    fetchNextconsumerPartners(pagi_idx1+1);


    // console.log(productlist)

  },[])
  useEffect(()=> {
    // get product list
    if (partnerListTab===1) {
      if (isIncreasing===true){
        setPrev_allpartners(curr_allpartners)
        setCurr_allpartners(next_allpartners);
        fetchNextPartnerList(pagi_idx+1);
      } else{
        setNext_allpartners(curr_allpartners)
        setCurr_allpartners(prev_allpartners);
        fetchPrevPartnerList(pagi_idx-1);
      }
    }
   else if (partnerListTab===2){
    if (isIncreasing1===true){
      setPrev_consumerPartners(curr_consumerPartners)
      setCurr_consumerPartners(next_consumerPartners);
      fetchNextconsumerPartners(pagi_idx1+1);
    } else{
        setNext_consumerPartners(curr_consumerPartners)
        setCurr_consumerPartners(prev_consumerPartners);
        fetchPrevconsumerPartners(pagi_idx1-1);
    }

   }
 
    // console.log(productlist)
  },[pagi_idx])
  return (
    <main  className={styles.main} >
      <div className={styles.banner}><Image src={banner_home_customer} className={styles.banner_img} alt=""/></div>
      
      <div className={styles.partner_list}>
        <div className={styles.partner_list__navbar}>
            {
                partnerListTabName.map((e, index) =>(
                <div className={`${index+1===partnerListTab? styles.partner_list__navbar_title_current: styles.partner_list__navbar_title}`}
                onClick={()=>{setpartnerListTab(index+1);
                    }}
                >{e}</div>))
            }
         
          

        </div>
        <div className={styles.partner_list__grid}>
            {partnerListTab===1?(<>
                {curr_allpartners.map((partner:any)=>(
           
           // eslint-disable-next-line react/jsx-key
           <PartnerLargeItem img={partner.url} name={partner.Name} point={null} id={partner.ID_Partners}/>
         ))}
            </>):(<>
                {curr_consumerPartners.map((partner:any)=>(
           
           // eslint-disable-next-line react/jsx-key
           <PartnerLargeItem img={partner.IMG} name={partner.Name} point={partner.POINTS} id={partner.ID_Partners}/>
         ))}
            </>)}
        
        </div>

        {partnerListTab===1?(<>
          {numpages<=1?(<></>):(
          <div className={styles.pagination}>
          {pagi_idx -1<=0?(<></>):(<>
          <Image onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num} src={arrow_left_product} alt=""/><p onClick={() =>{setPagi_idx(pagi_idx-1); setIsIncreasing(false);}} className={styles.pagination_num}>{pagi_idx-1}</p></>)}
          <p className={styles.pagination_num} style={{color: `var(--primary-color-1)`}}>{pagi_idx}</p>
          {pagi_idx >numpages?(<></>):(<>
          <p onClick={() =>{setPagi_idx(pagi_idx+1); setIsIncreasing(true);}} className={styles.pagination_num}>{pagi_idx+1}</p><Image onClick={() =>{setPagi_idx(pagi_idx+1);setIsIncreasing(true);}} className={styles.pagination_num} src={arrow_right_product} alt=""/></>)}
          
        </div>
        )}
            </>):(<>
              {numpages1<=1?(<></>):(
          <div className={styles.pagination}>
          {pagi_idx1 -1<=0?(<></>):(<>
          <Image onClick={() =>{setPagi_idx1(pagi_idx1-1); setIsIncreasing1(false);}} className={styles.pagination_num} src={arrow_left_product} alt=""/><p onClick={() =>{setPagi_idx1(pagi_idx1-1); setIsIncreasing1(false);}} className={styles.pagination_num}>{pagi_idx1-1}</p></>)}
          <p className={styles.pagination_num} style={{color: `var(--primary-color-1)`}}>{pagi_idx1}</p>
          {pagi_idx1 >numpages1?(<></>):(<>
          <p onClick={() =>{setPagi_idx1(pagi_idx1+1); setIsIncreasing1(true);}} className={styles.pagination_num}>{pagi_idx1+1}</p><Image onClick={() =>{setPagi_idx1(pagi_idx1+1);setIsIncreasing1(true);}} className={styles.pagination_num} src={arrow_right_product} alt=""/></>)}
          
        </div>
        )}
            </>)}
        
      </div>

    </main>
  )
}

