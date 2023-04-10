import classNames from 'classnames/bind';
import Image from 'next/image'
import styles from "./page.module.css"
import logo from "@/assets/images/omrp_logo_transparent.png"


const cx = classNames.bind(styles);

export default function Login_Register_Nav() {
    return  (<div className={cx('login-register-nav')}>
        <div className={cx('nav-wrapper')}>
            <Image src={logo}  alt='logo' className={cx('nav__logo')}/>
            <div className={cx('nav__labels')}> 
                <div className={cx("nav__label")} >
                    Đăng nhập
                </div>
                <div className={cx("nav__label")} >
                    Đăng ký
                </div>
            </div>
        </div>
    </div>) ;
}