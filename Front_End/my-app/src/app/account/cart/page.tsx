/* eslint-disable react/jsx-key */
"use client"
import PartnerSmallItem from "@/components/items/partner/PartnerSmallItem/com"
import styles from "./page.module.css"
import { arrow_left_product, arrow_right_product, delete_icon, partner_img_1, product_img_1 } from "@/assets/images"
import Image from "next/image"
import { count } from "console"
import { useDispatch, useSelector } from "react-redux"
import UserAPI from "@/app/api/userAPI"
import { use, useEffect, useState } from "react"
import { productApi } from "@/app/api/apiReponseType"
import Link from "next/link"
import {useRouter} from "next/navigation"
import { saveSelectedProducts } from "@/redux/SelectedProductapiRequests";
import { useMutation, useQuery } from "react-query"
export default function CartPage(props:any){
    const user=useSelector((state:any)=> state.auth.login.currentUser)
    const userid=user?.user?.userId;
    const [userpoints,setuserpoints]=useState<any>([])
    const [change, setChange]=useState(false)
    const [index, setIndex]=useState(0)
    const [indexproc, setIndexprod]=useState(0)
    const [count, setcount]=useState(-1)
    // const userpoints = user?.userInfo.Points
    // const userid="1"
    const dispatch=useDispatch()
    const router=useRouter();
    const [selectedPartnercheckout, setSelectedPartnercheckout]=useState({})
    const [cart, setCart]= useState<any[]>([])

    const [total,setTotal]= useState(0)

    const fetchCart = async function (){
        const res1 = await UserAPI.getInfoUser(userid);
        setuserpoints(res1.data.data.Points)
        const tempuserpoints=res1.data.data.Points
        console.log("points", res1.data.data.Points)
        const res = await UserAPI.getCart(userid);
        // console.log("cart", res.data)
        // setCart( res.data.data)
        let tempcart= res.data.data
        // console.log("ctart", tempcart)
        let temptotal=0
        for (let i=0;i<tempcart.length;i++){
          for ( let j=0;j<tempcart[i].products.length;j++){
                // temptotal=temptotal+tempcart[i].products[j].Total_Point;
                tempcart[i].products[j]={...tempcart[i].products[j],userpoint:0, maxitem: 2, maxover:1, changed: false}
                
                for (let k=0;k<tempuserpoints?.length;k++){
                    if(tempcart[i].products[j].POINT_TYPE===tempuserpoints?.[k]?.ID_Partners)
                    tempcart[i].products[j]={...tempcart[i].products[j],userpoint:tempuserpoints?.[k]?.POINTS, maxitem: Math.floor(tempuserpoints?.[k]?.POINTS/tempcart[i].products[j].PRICE), maxover: 1, changed:false}
                }
                
            }
        }
        console.log("cart aftern", tempcart)
        // setTotal(temptotal)
        setCart(tempcart)

    }
    const fetchUserPoint = async function () {
        const res1 = await UserAPI.getInfoUser(userid);
        setuserpoints(res1.data.data.Points)
    }
    let sum=0;
 
    const [cc, setcc] =useState(0)
    useEffect(()=>{
        fetchUserPoint();
        console.log("points", )
        fetchCart();
   

        for (let i=0;i<cart.length;i++){
            // console.log("len 1", cart[i].products.length)
            for (let j=0;j<cart[i].products.length;j++){
                // console.log("car[",cart[i].products?.[j])
                // console.log("sum:", cart[i].products?.[j]?.QUANTITY * cart[i].products?.[j]?.PRICE)
                sum=sum+ cart[i].products?.[j]?.TOTAL_PRICE;
                // console.log("cart af", sum)
            }
           }
        setTotal(sum)
        console.log("sum total", sum)
        console.log("sum totalff", total)

    },[])

  
 
    const handleCheckoutButton = function (){
        console.log("parter produc", selectedPartnercheckout)
        saveSelectedProducts(selectedPartnercheckout, dispatch, router)
        router.push("/order/fromcart")
    }
    const handlePartnerBtn = function (partner: {}){
        setSelectedPartnercheckout(partner);

    }
    const [noti, setNoti] = useState("")
    // const [changedItem, setChangeItem] = useState([]);
    let changedItem: { idProducts: any; idPartner: any; quantity: any }[]=[]
    const handleUpdateBtn=async () =>{
        
      for (let i =0;i<cart.length;i++){
        for(let j=0;j<cart[i]?.products.length;j++)
        if (cart[i]?.products?.[j]?.changed===true){
            console.log("hihi")
            changedItem.push({
                idProducts: cart[i]?.products?.[j]?.ID_PRODUCTS.toString(),
                idPartner: cart[i]?.ID_DoanhNghiep,
                quantity: cart[i]?.products?.[j]?.QUANTITY.toString()
            })
        }
      }
      console.log("chaa", changedItem)

      const data = {cartProducts: changedItem}
      console.log("cdata", data)
      const res =await UserAPI.updateCart(userid, data)
      setNoti(res.data.message)
        setTimeout(() => {
            setNoti("")
        }, 5000);
      console.log("not",res.data.message)

    }
   
    useEffect(()=>{
        if(count< 0){
            return;
        }else
        if (count===0){
            // console.log("parterid 2", cart[index].ID_DoanhNghiep)//

            UserAPI.deleteCart(userid, cart[index].ID_DoanhNghiep, cart[index]?.products[indexproc]?.ID_PRODUCTS)
            let tempcart=cart
            tempcart[index].products.splice(indexproc,1);
            setCart (tempcart)
        }
        else if(count<cart?.[index]?.products?.[indexproc]?.maxitem){
            // console.log("count 2", count)
            // console.log("max tiem", cart[index].products[indexproc].maxitem)
            let tempcart=cart
            tempcart[index].products[indexproc].QUANTITY=count;
            tempcart[index].products[indexproc].changed=true;
            setCart (tempcart)
            console.log("cart after count", tempcart)
    

        }
        else if (count=== cart?.[index]?.products?.[indexproc]?.maxitem){
            let tempcart=cart
            tempcart[index].products[indexproc].changed=true;
            tempcart[index].products[indexproc].QUANTITY=count;
            setCart (tempcart)
        } else{
            let tempcart=cart
            tempcart[index].products[indexproc].maxover=3;
            setCart (tempcart)
            return;
        }
    },[count])

    const handleChangeCount=(index:any, indexproc:any, count:any)=>{

        console.log("count", count)
        // console.log("index", index)
        // console.log("idxproc", indexproc)//cart[index].ID_Partners
        // console.log("parterid", cart[index].ID_DoanhNghiep)
        setcount(count)
        setIndex(index)
        setIndexprod(indexproc)
     
    }   
    
    return(
        <>
        <div className={styles.container}>
           {noti===""?<></>: <div className={styles.noti}>{noti}</div>}
            <div className={styles.header}>
                {/* <button onClick={()=> handleinsert()}> insert</button> */}
                <div className={styles.p}>Sản phẩm</div>
                <div className={styles.p}>Giá (điểm)</div>
                <div className={styles.p}>Số lượng</div>
                <div className={styles.p}>Tổng diểm</div>
            </div>
            {cart.map((ele:any, index)=>(
                <div className={styles.partner}>
                    {ele===selectedPartnercheckout ?(
                        <button className={styles.radiobtn_click} onClick={()=> {handlePartnerBtn(ele)}}></button>
                    ):(
                        <button className={styles.radiobtn} onClick={()=> {handlePartnerBtn(ele)}}></button>
                    )}
                    
                    <PartnerSmallItem name={ele.TenDoanhNghiep} logo={ele.Img}/>
                    <div className={styles.partner_table}>
                        {ele.products.map((prod:any, indexproc:any) => (
                            <div className={styles.row}>
                                <Image src={prod.URL} width={80} height={80} className={styles.img} alt=""/>
                                <p className={styles.row_element}>{prod.NAME_PRODUCTS}</p>
                                <p className={styles.row_element}>{prod.PRICE}</p>
                                <div className={styles.counter}>
                                    <Image src={arrow_left_product} className={styles.arrow} alt=""
                                    onClick={()=>handleChangeCount(index,indexproc, prod.QUANTITY-1)} 
                                    />
                                    <input type="number" value={prod.QUANTITY} onChange={(e)=>handleChangeCount(index,indexproc, e.target.value)} />
                                    <Image src={arrow_right_product} className={styles.arrow} alt=""
                                    onClick={()=>handleChangeCount(index,indexproc, prod.QUANTITY+1)} 

                                    />
                                </div>
                                <p className={styles.row_element}>{prod.PRICE*prod.QUANTITY}</p>
                            </div>
                          
                        ))}
                    </div>
                    {/* <button className={styles.updatebtn} onClick={()=> handleUpdateBtn()}>Cập nhật giỏ hàng</button> */}
                </div>
            ))}
            <div className={styles.total}>Tổng cộng
                <p className={styles.total_value}>{total}</p></div>
            <div className={styles.buttons}>
      
      
                <button> <Image className={styles.delete_icon} src={delete_icon} alt=""/> Xóa</button>
                <button onClick={()=>handleUpdateBtn()} > <Image className={styles.delete_icon} src={delete_icon} alt=""/> 
                Cập nhật giỏ hàng</button>
      
                <button className={styles.checkout}> <Image className={styles.checkout_icon}  src={delete_icon} onClick={()=>handleCheckoutButton()} alt=""/>
                Thanh toán
                </button>
            </div>
        </div>
        </>
    )
}