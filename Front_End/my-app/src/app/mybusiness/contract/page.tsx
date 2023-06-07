'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiV1, baseURL, baseURL_user } from '@/app/api/bareURL';
import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import avatar from "@/assets/images/omrp_logo_white.png"
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { partner_img_1 } from '@/assets/images';

type ContractData = {
    ID_CONTRACT: string;
    "Mã số thuế": string;
    "Ngày lập HĐ": string;
    "Ngày hết HĐ": string;
    "Đơn vị đổi": number;
    "% giao dịch": number;
    "Tên doanh nghiệp": string;
    "Số điện thoại": string;
    Email: string;
    Image: string;
  };
  type ApiResponse = {
    message: string;
    contract: ContractData;
  };
 const cx = classNames.bind(styles);

export default function ContractMyBusinessPage(props:any){
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    const userid=user?.userInfo?.ID_Partners;
    // const [userpoints,setuserpoints]=useState<any>([])
    const dispatch=useDispatch()
    const router=useRouter();
    const [contract, setContract] = useState<any>();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get<ApiResponse>(
                `${baseURL_user}/partner/${userid}/contract`
            );
            console.log("contract",response.data.contracts?.[0])
            // let newcontract = {
            //     ID_CONTRACT: "id",
            //     masothue: "mã só thuê",
            //     ngaylap: "ngày lập", 
            //     ngayhethan: "ngày hết hđ",
            //     donvidoi: "đơn vị đỏi",
            //     giaodich: "$ giao di",
            //     tendoanhnghiep: 'backs',
            //     sdt: "ád",
            //     Email: "mail",
            //     Image: partner_img_1,
            // }
            setContract(response.data.contracts[0]);
        }
        fetchData();
        }, []);
        
        if (!contract) {
          return <div>Loading...</div>;
        } 
        else 
        
 
   
  
 
   

    // if(cart.length===0){
    //     return(<div className={styles.notexist}><p className="">Không có sản phẩm nào trong giỏ hàng!</p> 
    //     <Image alt =" "src={notexist} className={styles.gif} width={100} height={100}/></div>)
    // }else
    return(
        <>
         <div className={cx('contract-container')}>
                    <div className={cx('contract-title')}>
                        <label 
                                htmlFor="contract-title" 
                                className={cx("contract-title__label")}
                            >
                                HỢP ĐỒNG 
                        </label>
                    </div>
                    <div className={cx('contract-ID')}>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label1")}
                            >
                                Mã hợp đồng 
                        </label>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label2")}
                            >
                                {contract.TAX} 
                        </label>
                    </div>
                    <div className={cx('contract-status')}>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label1")}
                            >
                                Tình trạng 
                        </label>
                        <label 
                                htmlFor="info-title__contract_ID" 
                                className={cx("contract__label2")}
                            >
                                {contract.STATUS} 
                        </label>
                    </div>
                    <div className={cx('contract-content')}>
                        <div className={cx('contract-topic')}>
                            <label 
                                htmlFor="info-title__contract_name" 
                                className={cx("contract__label")}
                            >
                                Tên doanh nghiệp 
                            </label>
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label")}
                            >
                                Mã số thuế 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                Người đại diện 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label")}
                            >
                                Số điện thoại 
                            </label>  
                            <label 
                                htmlFor="info-title__email" 
                                className={cx("contract__label")}
                            >
                                Email 
                            </label> 
                            <label 
                                htmlFor="info-title__date_contract" 
                                className={cx("contract__label")}
                            >
                                Ngày lập hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label")}
                            >
                                Ngày hết hạn hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label")}
                            >
                                Tỉ lệ quy đổi điểm 
                            </label> 
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label")}
                            >
                                Phí hoa hồng 
                            </label>   
                        </div>
                        {contract===null?(
                             <div className={cx('contract-info')}>
                             <input 
                                     className={cx("contract__input")}
                                     id="name" placeholder=''onChange={(e)=>setname(e.target.value)}
                                 >
                                     {user?.userInfo?.Name}  
                                 </input>
                             <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                     {contract.TAX}  
                                 </input>
                                 <input 
                                     className={cx("contract__label")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                     {contract.DEPUTY}  
                                 </input>
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                               {user?.userInfo?.Phone} 
                                 </input> 
                                
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                               {user?.userInfo?.Email} 
                                 </input> 
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                    {contract.DATE_CONTRACT.slice(0,10)} 
                                 </input> 
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                    {contract.EFFECTIVE_TIME.slice(0,10)} 
                                 </input> 
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                     {/* {new Date(contract["Ngày hết HĐ"]).toLocaleDateString()} */}
                                     {contract.AMOUNTTOPOINTS}  
                                 </input> 
                                 <input 
                                     className={cx("contract__input")}
                                     id="" placeholder=''onChange={(e)=>set(e.target.value)}
                                 >
                                     {contract.COMMISSION}  
                                     </input> 
                                  
                             </div>
                        ):(
                             <div className={cx('contract-info')}>
                             <label 
                                     htmlFor="info-title__contract_name" 
                                     className={cx("contract__label")}
                                 >
                                     {user?.userInfo?.Name}  
                                 </label>
                             <label 
                                     htmlFor="info-title__contract_name" 
                                     className={cx("contract__label")}
                                 >
                                     {contract.TAX}  
                                 </label>
                                 <label 
                                     htmlFor="info-title__contract_name" 
                                     className={cx("contract__label")}
                                 >
                                     {contract.DEPUTY}  
                                 </label>
                                 <label 
                                     htmlFor="info-title__Tax_code" 
                                     className={cx("contract__label")}
                                 >
                               {user?.userInfo?.Phone} 
                                 </label> 
                                
                                 <label 
                                     htmlFor="info-title__email"  
                                     className={cx("contract__label")}
                                 >
                               {user?.userInfo?.Email} 
                                 </label> 
                                 <label 
                                     htmlFor="info-title__date_contract" 
                                     className={cx("contract__label")}
                                 >
                                    {contract.DATE_CONTRACT.slice(0,10)} 
                                 </label> 
                                 <label 
                                     htmlFor="info-title__date_contract" 
                                     className={cx("contract__label")}
                                 >
                                    {contract.EFFECTIVE_TIME.slice(0,10)} 
                                 </label> 
                                 <label 
                                     htmlFor="info-title__contract_term" 
                                     className={cx("contract__label")}
                                 >
                                     {/* {new Date(contract["Ngày hết HĐ"]).toLocaleDateString()} */}
                                     {contract.AMOUNTTOPOINTS}  
                                 </label> 
                                 <label 
                                     htmlFor="info-title__conversion_rate" 
                                     className={cx("contract__label")}
                                 >
                                     {contract.COMMISSION}  
                                     </label> 
                                 
                             </div>
                        )}
                       
                    </div>
                </div>
        </>
    )
}