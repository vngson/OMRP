import classNames from 'classnames/bind';
import styles from "./login.module.css"
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/apiRequests';
import { useRouter } from 'next/navigation';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


const cx = classNames.bind(styles);

export default function LoginForm() {
    const [username, setUsername]=useState("")
    const [pwd, setPwd] = useState("")
    const [ modalOpen, setModalOpen]= useState(false)

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
        setModalOpen(true)
        const a =loginUser(newUser, dispatch, router)
       
        router.push("/")
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
      <div className={cx("modal_container")} >
        <Modal className={cx("modal")}  toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen} >
        <div className={cx(" modal-header")}>
          <h5 className={cx(" modal-title")} id="exampleModalLabel">
            Đăng nhập thành công!
          </h5>
  
        </div>
        <ModalBody>...</ModalBody>
        {/* <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
            className={cx("button_")}
          >
            Close
          </Button>
          <Button color="primary" type="button"
            className={cx("button_")}>
        
            Save changes
          </Button>
        </ModalFooter> */}
      </Modal></div>
        </form> 
        
    </div>

    ) ;
}