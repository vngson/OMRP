import axios, { AxiosInstance } from "axios";
import UserAPI from "@/app/api/userAPI";

import {useRouter} from "next/router"
import navigate from "next/navigation"

import {
  saveFailed,
  saveStart,
  saveSuccess,
  deleteFailed,
  deleteStart,
  deleteSuccess,

} from "./selectedProductsSlice";
import { cookies } from 'next/headers';

import { Dispatch, AnyAction } from "redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NavigateFunction } from "react-router";
import jwt_decode from "jwt-decode";
//npm install axios


export const saveSelectedProducts = (products:any, dispatch: (arg0: { payload: any; type: "selectedProducts/saveStart" | "selectedProducts/saveSuccess" | "selectedProducts/saveFailed"; }) => void,router: string[] | AppRouterInstance) => {

  dispatch(saveStart());
  try {
    //const res = await axios.post("https://project-ec-tuankhanh.onrender.com/auth/login", user);


    dispatch(saveSuccess(products));

    // console.log("res.data", res.data);

    // router.push("/order/slug")
    return 1
  } catch (err) {
    dispatch(saveFailed(products));
    // router.push("/order/slug")
  }
};
export const deleteSelectedProducts = (dispatch: (arg0: { payload: any; type: "selectedProducts/deleteStart" | "selectedProducts/deleteSuccess" | "selectedProducts/deleteFailed"; }) => void,router: string[] | AppRouterInstance) => {

  dispatch(deleteStart());
  try {
    //const res = await axios.post("https://project-ec-tuankhanh.onrender.com/auth/login", user);


    dispatch(deleteSuccess());

    // console.log("res.data", res.data);

    router.push("/order/slug")
    return 1
  } catch (err) {
    dispatch(deleteFailed());
    router.push("/order/slug")
  }
};