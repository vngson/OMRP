/* eslint-disable react/jsx-no-undef */
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
import { partner_img_1, send, tick } from '@/assets/images';
import Image from 'next/image';
import PartnerAPI from '@/app/api/partnerAPI';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

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
 
    const dispatch=useDispatch()
    const router=useRouter();
    const [contract, setContract] = useState<any>(null);
    const [tax, settax]=useState("")
    const [deputy, setdeputy]= useState("")
    const [effectiveTime, setexpireddate]= useState();
    const [amountToPoints, setamountToPoints]= useState("")
      
    const cusID = user?.userInfo?.ID_Partners;
    const permiss = user?.user?.permission;
    const pms : number = Number(permiss);
    const [modalOpen, setModalOpen]= useState(false)
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get<ApiResponse>(
                `${baseURL_user}/partner/${userid}/contract`
            );
            console.log("contract",response.data)

            setContract(response.data.contracts[0]);
        }
        fetchData();
        }, []);
        
        // if (!contract) {
        //   return <div>Loading...</div>;
        // } 
        // else 
        
 
   
  
        console.log("cons", contract)
        const [noti, setNoti] =useState("")
        const handleSendbtn= async ()=>{
            const newContract = {
                tax: tax,
                deputy: deputy,
                effectiveTime: effectiveTime,
                amountToPoints: amountToPoints,
                commission: "30"
            }

            const res = await PartnerAPI.createContract(userid, newContract);
            console.log("noti", res)
            setNoti(res.data.message)
            setModalOpen(true)
        }
  
     if(pms === 2){
      


    return(
        <>
         <div className={cx('contract-container')}>
            {true?(<>
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
                                {contract?.TAX} 
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
                                {contract?.STATUS} 
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
                                     {contract?.TAX}  
                                 </label>
                                 <label 
                                     htmlFor="info-title__contract_name" 
                                     className={cx("contract__label")}
                                 >
                                     {contract?.DEPUTY}  
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
                                    {contract?.DATE_contract?.slice(0,10)|| contract?.DATE_CONTRACT?.slice(0,10)} 
                                 </label> 
                                 <label 
                                     htmlFor="info-title__date_contract" 
                                     className={cx("contract__label")}
                                 >
                                    {contract?.EFFECTIVE_TIME?.slice(0,10)} 
                                 </label> 
                                 <label 
                                     htmlFor="info-title__contract_term" 
                                     className={cx("contract__label")}
                                 >
                                     {/* {new Date(contract["Ngày hết HĐ"]).toLocaleDateString()} */}
                                     {contract?.AMOUNTTOPOINTS}  
                                 </label> 
                                 <label 
                                     htmlFor="info-title__conversion_rate" 
                                     className={cx("contract__label")}
                                 >
                                     {contract?.COMMISSION}  
                                     </label> 
                                 
                             </div>
                    </div>
            </>):(<>
                <div className={cx('contract-title')}>
                        <label 
                                htmlFor="contract-title" 
                                className={cx("contract-title__label")}
                            >
                                HỢP ĐỒNG 
                        </label>
                    </div>
                   
                   
                    <div className={cx('contract-content')}>
                        <div className={cx('contract-topic')}>
                           
                            <label 
                                htmlFor="info-title__Tax_code" 
                                className={cx("contract__label1")}
                            >
                                Mã số thuế 
                            </label> 
                            <label 
                                htmlFor="info-title__Phone_number" 
                                className={cx("contract__label1")}
                            >
                                Người đại diện 
                            </label> 
                           
                           
                            <label 
                                htmlFor="info-title__contract_term" 
                                className={cx("contract__label1")}
                            >
                                Ngày hết hạn hợp đồng 
                            </label> 
                            <label 
                                htmlFor="info-title__conversion_rate" 
                                className={cx("contract__label1")}
                            >
                                Tỉ lệ quy đổi điểm 
                            </label> 
                            <label 
                                htmlFor="info-title__commission" 
                                className={cx("contract__label1")}
                            >
                                Phí hoa hồng 
                            </label>   
                        </div>
                        <div className={cx('contract-info')}>
                             
                        <input 
                                     className={cx("contract__input")}
                                     id="tax" placeholder=''onChange={(e)=>settax(e.target.value)}
                                 >
                             
                                 </input>
                                 <input 
                                     className={cx("contract__input")}
                                     id="deputy" placeholder=''onChange={(e)=>setdeputy(e.target.value)}
                                 >
                                  
                                 </input>
                                
                                
                               
                                 <input 
                                     className={cx("contract__input")}
                                     id="expireddate" placeholder=''onChange={(e)=>setexpireddate(e.target.value)}
                                 >
                                 
                                 </input> 
                                 <input 
                                     className={cx("contract__input")}
                                     id="amountToPoints" placeholder=''onChange={(e)=>setamountToPoints(e.target.value)}
                                 >
                                  
                                 </input> 
                                 <label 
                                     className={cx("contract__label3")}
                        
                                 >
                                    30
                                     </label> 
                                <div className={styles.footer}>
                                <button onClick={()=>handleSendbtn()}>
                                <Image src={send} alt="" height={15} width={15}/>

                                    <p> Gửi</p>
                                     </button>
                                     </div>
                             </div>
                             <div className={cx("modal_container")} >
        <Modal className={cx("modal")}  toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} >
        <div className={cx(" modal-header")}>
          <h5 className={cx(" modal-title")} id="exampleModalLabel">
            {noti}
          </h5>
  
        </div>
        <ModalBody>
            <Image src={tick} alt="" width={100} height={100}/>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
            className={cx("button_")}
          >
            Close
          </Button>
          {/* <Button color="primary" type="button"
            className={cx("button_")}>
        
            Save changes
          </Button> */}
        </ModalFooter>
      </Modal></div>
                    </div></>)}
                    
        
                </div>
        </>
    )
        }
        else (router.push("/404"))
}