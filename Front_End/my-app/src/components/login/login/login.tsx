import classNames from 'classnames/bind';
import styles from "./login.module.css"
import react, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/apiRequests';
import { useRouter } from 'next/navigation';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';


const cx = classNames.bind(styles);

export default function  LoginForm() {
    const [username, setUsername]=useState("")
    const [pwd, setPwd] = useState("")
    const [ modalOpen, setModalOpen]= useState(false)
    const [noti, setNoti] = useState("")
    const dispatch=useDispatch()
    const router=useRouter();
    const handleSubmitLogin = async (e:{preventDefault: () => void }) => {
        e.preventDefault()
        const newUser ={
            phone: username,
            password: pwd
        }
        console.log("newuser sent: ",newUser)
      
        const a = await loginUser(newUser, dispatch, router)
        if(a==1){
          setNoti("Login Successfully!")
        } else      setNoti(a);
        // console.log("noti", a)
   
        setModalOpen(true)

    }
    // 0975087855{
    // "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IjA5NzUwODc4NTUiLCJ1c2VyIjp7InVzZXJJZCI6MSwicGVybWlzc2lvbiI6IjMifSwidXNlckluZm8iOnsiSURfQ3VzdG9tZXJzIjoiMSAgICAiLCJOQU1FIjoiQ8O0bmcgRHV5IiwiQmlydGhkYXkiOiIxOTk5LTAxLTI3VDE3OjAwOjAwLjAwMFoiLCJBZGRyZXNzIjoiOTIvNDUvMzEgeMO0IHZp4bq_dCBuZ2jhu4cgdMSpbmgiLCJFbWFpbCI6Imx1dXR1YW5raGFuaGEzZHRAZ21haWwuY29tIiwiUGhvbmUiOiIwOTc1MDg3ODU1IiwiSU1HIjpudWxsLCJQb2ludHMiOlt7IklEX1BhcnRuZXJzIjoiMiAgICAiLCJOYW1lIjoiQsOhY2ggaMOzYSB4YW5oIiwiSU1HIjoiaHR0cHM6Ly9wcm9qZWN0LWVjLXR1YW5raGFuaC5vbnJlbmRlci5jb20vaW1hZ2VzL0JBQ0hIT0FYQU5ILnBuZyIsIlBPSU5UUyI6MTEwMH0seyJJRF9QYXJ0bmVycyI6IjEzICAgIiwiTmFtZSI6IlJpTyBNYXJ0IiwiSU1HIjoiaHR0cHM6Ly9wcm9qZWN0LWVjLXR1YW5raGFuaC5vbnJlbmRlci5jb20vaW1hZ2VzL3Jpb01hcnQucG5nIiwiUE9JTlRTIjo5MjA4Nn0seyJJRF9QYXJ0bmVycyI6IjggICAgIiwiTmFtZSI6IjYwUyIsIklNRyI6Imh0dHBzOi8vcHJvamVjdC1lYy10dWFua2hhbmgub25yZW5kZXIuY29tL2ltYWdlcy82MFMucG5nIiwiUE9JTlRTIjo3NTg0NX1dfSwiaWF0IjoxNjg2MDI5NzAwLCJleHAiOjE2ODYwMzMzMDB9.WV8Em6usiZRU1iGRJ3_4zyVeu_jne8FD9X_u48wkSXI",
//     "userId": 1
// }

    return  (
    <div className={`${!modalOpen? styles.login:styles.login_blur}`}>
    
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
            {noti}
          </h5>
  
        </div>
        <ModalBody></ModalBody>
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
        </form> 
        
    </div>

    ) ;
}