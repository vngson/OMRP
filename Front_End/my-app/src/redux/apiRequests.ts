import axios, { AxiosInstance } from "axios";
import UserAPI from "@/app/api/userAPI";

import {useRouter} from "next/router"
import navigate from "next/navigation"
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
  // @ts-ignore
// import { cookies } from 'next/headers';

import { Dispatch, AnyAction } from "redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { NavigateFunction } from "react-router";
import jwt_decode from "jwt-decode";
//npm install axios

export const loginUser = async (user: any, dispatch: (arg0: { payload: any; type: "auth/loginStart" | "auth/loginSuccess" | "auth/loginFailed"; }) => void,router: string[] | AppRouterInstance) => {

  dispatch(loginStart());
  try {

    // cookies().set('nameeee', 'lee');
    // const name = cookies().get('nameeee');
    // console.log("naem", name)
    //const res = await axios.post("https://project-ec-tuankhanh.onrender.com/auth/login", user);

    const res=await UserAPI.login(user);
    console.log("token: ", res.data)
    dispatch(loginSuccess(jwt_decode(res.data.token)));

    // console.log("res.data", res.data);

    router.push("/")
    return 1
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user: any, dispatch: (arg0: { payload: undefined; type: "auth/registerStart" | "auth/registerSuccess" | "auth/registerFailed"; }) => void, router: string[] |  AppRouterInstance) => {
  dispatch(registerStart());
  try {
    await UserAPI.register(user)
    //await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    router.push("/")
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const getAllUsers = async (token: any, dispatch: (arg0: { payload: any; type: "user/getUsersStart" | "user/getUsersSuccess" | "user/getUsersFailed"; }) => void, axiosJWT: { get: (arg0: string, arg1: { headers: { token: string; }; }) => any; }) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (token: any, dispatch: (arg0: { payload: any; type: "user/deleteUserStart" | "user/deleteUsersSuccess" | "user/deleteUserFailed"; }) => void, id: string, axiosJWT: { delete: (arg0: string, arg1: { headers: { token: string; }; }) => any; }) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err));
  }
};

// export const logOut = async (dispatch: (arg0: { payload: undefined; type: "auth/logOutStart" | "auth/logOutSuccess" | "auth/logOutFailed"; }) => void, id: any, token: any, axiosJWT: { post: (arg0: string, arg1: any, arg2: { headers: { token: string; }; }) => any; }) => {
//   dispatch(logOutStart());
//   try {
    
//     const res=await UserAPI.logout(id,token);
//     console.log(res)
//     dispatch(logOutSuccess());
//     // navigate("/login");
//   } catch (err) {
//     dispatch(logOutFailed());
//   }
// };
export const logOut = async (dispatch: Dispatch<AnyAction>) => {
  dispatch(logOutStart());
  try {
   
    dispatch(logOutSuccess());
    // navigate("/login");
  } catch (err) {
    dispatch(logOutFailed());
  }
};

