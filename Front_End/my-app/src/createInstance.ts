import { ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Dispatch, AnyAction } from "redux";

const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user: { token: string; }, dispatch: Dispatch<AnyAction>, stateSuccess: ActionCreatorWithoutPayload<"auth/logOutSuccess">) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.token);
      //if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          token: data.token,
        };
        //dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.token;
      //}
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
