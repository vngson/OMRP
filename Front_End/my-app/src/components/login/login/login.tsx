import classNames from 'classnames/bind';
import styles from "./login.module.css"
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/apiRequests';
import { useRouter } from 'next/navigation';


const cx = classNames.bind(styles);

export default function LoginForm() {
    const [username, setUsername]=useState("")
    const [pwd, setPwd] = useState("")
    console.log("ssr: ",username, pwd)
    const dispatch=useDispatch()
    const router=useRouter();
    const handleSubmitLogin = (e:{preventDefault: () => void }) => {
        e.preventDefault()
        const newUser ={
            phone: username,
            password: pwd
        }
        // console.log("newuser sent: ",newUser)
        loginUser(newUser, dispatch, router)
    }

    return  (
    <div className={cx('login')}>
        <form onSubmit={handleSubmitLogin} className={cx('login-wrapper')}>
        <label 
                htmlFor="form__login-taikhoan-input" 
                className={cx("form__input-label")}
            >
                Tài khoản
            </label>
            <input 
                className={cx("form__input" )}
                id={cx("form__login-taikhoan-input")}
                placeholder="Tài khoản"  
                onChange={(e)=>setUsername(e.target.value)}
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
                onChange={(e)=>setPwd(e.target.value)}
            />
            <label 
                htmlFor="form__login-forgot" 
                className={cx("form__forgot-label")}
            >
                Quên mật khẩu ?
            </label>
            <button  className={cx('form__login-btn')}>Đăng nhập</button>
        </form>
    </div>) ;
}