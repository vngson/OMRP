/* eslint-disable react/jsx-key */
"use client"
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from "./header_cus.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faUser,
    faMagnifyingGlass,
    faEraser,
    faListUl,
} from '@fortawesome/free-solid-svg-icons';
import logo from "@/assets/images/omrp_logo_transparent.png"
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SearchComp from '../search/search';
import { userApi } from '@/app/api/apiReponseType';
import { Divider } from '@nextui-org/react';
import PartnerSmallItem from '../items/partner/PartnerSmallItem/com';
import UserAPI from '@/app/api/userAPI';
import { loginSuccess } from '@/redux/authSlice';

const cx = classNames.bind(styles);

export default function Header() {

    const user = useSelector((state: any)=> state.auth.login.currentUser)
    const [poinst, setPoints]=useState([])
    useEffect(()=>{
        const fetch= async () =>{
            const res = await UserAPI.getInfoUser(user?.user?.userId);
           setPoints(res.data.data.Points)
           loginSuccess(res.data)
        }
        fetch()
    },[])
    const [sticky, setSticky] = useState(false);

    // on render, set listener
    useEffect(() => {
  
      window.addEventListener("scroll", isSticky);
      return () => {
        window.removeEventListener("scroll", isSticky);
      };
    }, []);
    const isSticky = () => {
      /* Method that will fix header after a specific scrollable */
      const scrollTop = window.scrollY;
      scrollTop >= 100 ? setSticky(true) : setSticky(false);
      setSticky(true)
    };
    const [hoverAcc, setHoverAcc]=useState(false)
    return (
        <div className={`${sticky? styles.header_sticky: styles.header}`}>       
         <div className={cx('header-wrapper')} >
            <Link href="/" className={cx('header-logo')}><Image src={logo} width={80} height={60} alt='logo' /></Link>
       
            <SearchComp/>
           
            <div className={cx('header-right')}>
                {user!==null? ( <label
                    htmlFor="header__name-view" 
                    className={cx("header-label")}
                >
                    Chào, {user?.userInfo?.NAME|| user?.userInfo?.Name} 
                </label>):( <Link href={"/login"}
                    className={cx("header-label")}
                >
                    Đăng nhập
                </Link>)}
                <Link href="/business"> 

                <div className={cx('header-icon__wrapper')}>
                <FontAwesomeIcon className={cx('header-list_business')} size="2x" icon={faListUl} />
                </div>
                </Link>
            <Link href="/account/cart"> 
            <div className={cx('header-icon__wrapper')}>
                <FontAwesomeIcon className={cx('header-cart')} size="2x" icon={faCartShopping} />
                </div>
                </Link>
            <Link href="/account/history-exchange">
                <div onMouseEnter={()=>setHoverAcc(true)} onMouseLeave={()=>setHoverAcc(false)} className={cx('header-icon__wrapper')}><FontAwesomeIcon className={cx('header-profile')} size="2x" icon={faUser} /></div>
                </Link>
        </div>
        
            {hoverAcc?(
                <div className={styles.customer_infor}>
                <h1>{user?.userInfo?.NAME}</h1>
                <p className={styles.email}>{user?.userInfo?.Email}</p>
                <div className={styles.points}>
                    {poinst.map ((part:any)=>
                    <div className={styles.row}>
                        <PartnerSmallItem logo={part.IMG} name={part.Name}/>
                        <p className={styles.point}>{part.POINTS} point </p>
                    </div>
                    )}
                </div>
            </div>
            ):(<></>)}
                </div>
        
    </div>
    )
};