'use client';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleXmark,
    faCircleCheck,
} from'@fortawesome/free-regular-svg-icons';
import styles from "./page.module.css"
import DefaultImage from  "@/assets/images/image_default.jpg"

type Account = {
    ID_Login: number;
    Username: string;
    Permission: string;
    Status: string;
    Name: string;
    Email: string;
    Address: string;
    Phone: string;
    Img: string;
};

type MyComponentProps = {
    account: Account[]
};

const cx = classNames.bind(styles);

function Account({account}: MyComponentProps) {
    const status = account[0].Status;
    const handleStatus = () =>{

    }
    return  (<div className={cx('account')}>
        <div className={cx('account-wrapper')}>
            <div className={cx("account-name")} >
                <label 
                    htmlFor="account-name" 
                    className={cx("account-name__text")}
                >
                    {account[0].Username}
                </label>
            </div>
            <div className={cx("account__line-top")}></div>
            <div className={cx("account-info")}>
                {account[0].Img ? (<img
                        src= {account[0].Img}
                        alt={'Avatar'}
                        className={cx('account-info__avt')}
                        width={ 80}
                        height={80}                 
                    />):(
                    <Image
                        src= {DefaultImage}
                        alt={'Avatar'}
                        className={cx('account-info__avt')}
                        width={ 80}
                        height={80}                 
                    />)}
                <label 
                    htmlFor="account-info__username" 
                    className={cx("account-info__username")}
                >
                    Tên người dùng : {account[0].Name}
                </label>
                <label 
                    htmlFor="account-info__accounttype" 
                    className={cx("account-info__accounttype")}
                >
                    Loại tài khoản : {account[0].Permission} 
                </label>
            </div>
            <div className={cx("account__line-bottom")}></div>
            {status === 'locked' && (
            <button className={cx("account-btn__activated")} onClick={handleStatus}>
                <FontAwesomeIcon className={cx('activated__icon')} icon={faCircleCheck} size="2x"/>
                Mở khóa tài khoản
            </button>)}
            {status === 'unlocked' && (<button className={cx("account-btn__banned")}>
            <FontAwesomeIcon className={cx('banned__icon')} icon={faCircleXmark} onClick={handleStatus} size="2x"/>
                Khóa tài khoản
            </button>) }
        </div>
    </div>) ;
}

export default Account;