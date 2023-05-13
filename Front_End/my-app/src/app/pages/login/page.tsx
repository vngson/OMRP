import classNames from 'classnames/bind';
import styles from "./page.module.css"


const cx = classNames.bind(styles);

export default function LoginForm() {
    return  (<div className={cx('login')}>
        <div className={cx('login-wrapper')}>
        <label 
                htmlFor="form__login-taikhoan-input" 
                className={cx("form__input-label")}
            >
                Tài khoản
            </label>
            <input 
                type="email" 
                className={cx("form__input" )}
                id={cx("form__login-taikhoan-input")}
                placeholder="Tài khoản"  
            />
            <label 
                htmlFor="form__login-password-input" 
                className={cx("form__input-label")}
            >
                Mật khẩu
            </label>
            <input 
                type="password" 
                className={cx("form__input" )}
                id={cx("form__login-password-input")}
                placeholder="Mật khẩu"  
            />
            <label 
                htmlFor="form__login-forgot" 
                className={cx("form__forgot-label")}
            >
                Quên mật khẩu ?
            </label>
            <button onClick={()=>{console.log('đăng nhập')}} className={cx('form__login-btn')}>Đăng nhập</button>
        </div>
    </div>) ;
}