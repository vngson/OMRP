import classNames from 'classnames/bind';
import styles from "./register.module.css"
import {useRouter} from "next/navigation"

const cx = classNames.bind(styles);

export default function RegisterForm() {

    const router=useRouter();
    return  (<div className={cx('register')}>
        <div className={cx('register-wrapper')}>
            <label 
                htmlFor="form__register-email-input" 
                className={cx("form__input-label")}
            >
                Email
            </label>
            <input 
                type="email" 
                className={cx("form__input" )}
                id={cx("form__register-email-input")}
                placeholder="Email"  
            />
            <label 
                htmlFor="form__register-name-input" 
                className={cx("form__input-label")}
            >
                Họ và Tên
            </label>
            <input 
                type="text" 
                className={cx("form__input" )}
                id={cx("form__register-email-input")}
                placeholder="Họ và Tên"  
            />
            <label 
                htmlFor="form__register-password-input" 
                className={cx("form__input-label")}
            >
                Mật khẩu
            </label>
            <input 
                type="password" 
                className={cx("form__input" )}
                id={cx("form__register-password-input")}
                placeholder="Mật khẩu"  
            />
            <label 
            htmlFor="form__register-re-password-input" 
            className={cx("form__input-label" )}
            >
                Xác nhận mật khẩu
            </label>
            <input 
                type="password" 
                className={cx("form__input"  )}
                id={cx("form__register-re-password-input")}
                placeholder="Xác nhận mật khẩu" 
            />
            <div className={cx("form__message" )}></div>
            <div className={cx("form__type-wrapper" )}>
                <div className={cx("form__input-wrapper-label" )}>
                    Bạn là:
                </div>
                <div className={cx("form__input-wrapper-body" )}>
                    <div className={cx("form__input-radio-wrapper" )}>
                        <input defaultChecked={true} value="normal_user" type="radio" id={cx("form__input-radio--buyer" )} className={cx("form__input-radio" )} name="user_type"/>
                        <label 
                            htmlFor="form__input-radio--buyer" 
                            className={cx("form__input-label" )}
                        >
                            Khách hàng
                        </label>
                    </div>
                    <div className={cx("form__input-radio-wrapper" )}>
                        <input value="seller" type="radio" id={cx("form__input-radio--seller" )} className={cx("form__input-radio" )} name="user_type"/>
                        <label 
                            className={cx("form__input-label" )}
                            htmlFor="form__input-radio--seller"
                        >
                            Doanh Nghiệp
                        </label>
                    </div>
                </div>
            </div>
            <button onClick={()=>{console.log('đăng ký')}} className={cx('form__register-btn')}>Đăng ký</button>
        </div>
    </div>) ;
}