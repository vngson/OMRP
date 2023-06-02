import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./search.module.css"


import Link from "next/link";
import productAPI from "@/app/api/productAPI";
import { searchicon } from "@/assets/images";
export default function SearchComp() {
      const [searchInput, setSearchInput]=useState("");
      const [products, setproducts]=useState([])
      const [isHoverBar, setIsHoverBar]=useState(false)
      const [isHoverList, setIsHoverList]=useState(false)
      const HandleSearch = function (e: { target: { value: string }; }) {
        const fetchSearchprod= async(query: string) => {
          const res = await productAPI.search(query)
          setproducts(res.data.products);
          console.log("search", res.data)
        }
        setSearchInput(e.target.value);
  
        fetchSearchprod(searchInput);
      }
      useEffect(()=>{
      })
     
    return (
      <div className={`${styles.searchbar}`} onMouseEnter={()=>setIsHoverBar(true)} onMouseLeave={()=> {setIsHoverBar(false)}} >
        <div className={styles.searchbar_header}>
          <Image src ={searchicon} className={styles.searchIcon} width={15} height={15} alt=''></Image>
          <input className={styles.input} id="search_input" onChange={(e)=>HandleSearch(e)} placeholder="Bình giữ nhiệt . . ."></input>
        </div>
        {isHoverBar||isHoverList?(
          <ul className={styles.search_list_isHover}  onMouseOver={()=>setIsHoverList(true)} onMouseLeave={()=> {setIsHoverList(false)}}>
            {products.map((prod:any)=> {
                return(
                  <div className={styles.search_item} key={prod} >
                    <Image className={styles.img} src={prod.URL} width={25} height={25} alt=""/>
                    {prod.NAME}
                  </div>
                )
                })
              } 
            </ul>
        ):(
          <ul className={styles.search_list}  onMouseEnter={()=>setIsHoverList(true)} onMouseLeave={()=> {setIsHoverList(false)}}>
            {products.map((prod:any)=> {
              return(
                <div className={styles.search_item} key={prod} >
                  <Image className={styles.img} src={prod.URL} width={25} height={25} alt=""/>
                  {prod.NAME}
                </div>
              )
              })
            } 
           </ul>
        )}
      </div>
    );
}