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
} from '@fortawesome/free-solid-svg-icons';
import logo from "@/assets/images/omrp_logo_transparent.png"
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SearchComp from '../search/search';
import { userApi } from '@/app/api/apiReponseType';
import { Divider } from '@nextui-org/react';
import PartnerSmallItem from '../items/partner/PartnerSmallItem/com';
import UserAPI from '@/app/api/userAPI';

const cx = classNames.bind(styles);

export default function Header() {

    const user = useSelector((state: any)=> state.auth.login.currentUser)
    const [poinst, setPoints]=useState([])
    useEffect(()=>{
        const fetch= async () =>{
            const res = await UserAPI.getInfoUser(user?.user?.userId);
           setPoints(res.data.data.Points)
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
      // setSticky(true)
    };
    const [hoverAcc, setHoverAcc]=useState(false)
    return (
        <div className={`${sticky? styles.header_sticky: styles.header}`}>        <div className={cx('header-wrapper')} >
            <Link href="/" className={cx('header-logo')}><Image src={logo} width={80} height={60} alt='logo' /></Link>
            
            {/* <div className={cx('header-search')}>
                <FontAwesomeIcon className={cx('header-search__icon')} icon={faMagnifyingGlass} />
                <input 
                type="text" 
                className={cx("header-search__input" )}
                id={cx("header-search-input")}
                placeholder="Tìm kiếm"  
                />
            </div> */}
            <SearchComp/>
            {user!==null? ( <label
                htmlFor="header__name-view" 
                className={cx("header-label")}
            >
                Chào, {user?.userInfo?.NAME}
            </label>):( <Link href={"/login"}
                className={cx("header-label")}
            >
                Đăng nhập
            </Link>)}
           <Link href="/account/cart"> 
           <div className={cx('header-icon__wrapper')}><FontAwesomeIcon className={cx('header-cart')} size="2x" icon={faCartShopping} /></div></Link>
         {/* <Link href="/account/cart"></Link> */}
            <div onMouseEnter={()=>setHoverAcc(true)} onMouseLeave={()=>setHoverAcc(false)} className={cx('header-icon__wrapper')}><FontAwesomeIcon className={cx('header-profile')} size="2x" icon={faUser} /></div>
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
    )
};