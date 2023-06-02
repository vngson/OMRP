import { apiV1, apiV1_user, get, post, put, patch, delele} from "./generic";

const UserAPI = {
  
  getNewU: function () {
    const url = `${apiV1}/`;
    return get(url, "");
  },
  login: function(user: any){
    const url= `${apiV1_user}/auth/login`
    return post(url, user,"");
  },
  logout: function(user:any, token:any){
    const url= `${apiV1_user}/users/logout`;
    return post(url, user, token);
  },
  register: function (user:any){
    const url=  `${apiV1_user}/auth/signup`
    return put(url, user,"")
  },
  add2Cart: function(id: string, listproduct: any) {
    const url= `${apiV1}/consumer/addToCart/${id}`;
    return put(url, listproduct,"");
  },
  getCart: function(id: string){
    const url= `${apiV1}/consumer/getCart/${id}`;
    return get(url,"");
  },
  deleteCart: function(id: string, partnerId: string, productId:string){
    const url= `${apiV1}/consumer/deleteCart/${id}?partnerId=${partnerId}&productId=${productId}`;
    return delele(url,"");
  } ,
  order: function (id: string, data: any, iscart: string){
    const url= `${apiV1}/consumer/order/${id}?orderFC=${iscart}`;
    return post(url,data,"");
  },
  getExchangePartners: function (idcus: string, page: string, perPage: string){
    const url = `${apiV1}/consumer/partnersConsumer/${idcus}?page=${page}&perPage=${perPage}`;
    return get(url, "");
  },
  getALLPartners: function (page: string, perPage:string){
    const url = `${apiV1}/employee/partner?page=${page}&perPage=${perPage}`;
    return get(url, "");
  },
  getHistoryExchange: function (idcus: string, page: string, perPage: string){
    const url = `${apiV1}/consumer/getHistory/${idcus}?page=${page}&perPage=${perPage}`;
    return get(url, "");
  },
  ///v1/api/employee/partner?page=1&perPage=5
  ///v1/api/consumer/getHistory/1?page=1&perPage=1 (Nếu không có query thì mặc định là page = 1 và perPage = 3)
  // patchResource: function (data: any, id: string, token: string) {
  //   const url = `${apiV1}/groups/resources?${id}`;
  //   return patch(url, data, token);
  // },
 
  // postClass: function (data: any, token: string) {
  //   const url = `${apiV1}/groups/class/create`;
  //   return post(url, data, token);
  // },
 
  // deleteResource: function (id: string, token: string) {
  //   const url = `${apiV1}/groups/resources?${id}`;
  //   return delele(url, token);
  // },
  
  // getRole: function (classId: string, token: string) {
  //   const url = `${apiV1}/groups/enrollment/me?classId__eq=${classId}`;
  //   return get(url, token);
  // },
  // patchClass: function (data: any, id: string, token: string) {
  //   const url = `${apiV1}/groups/class?${id}`;
  //   return patch(url, data, token);
  // },
  // deleteClass: function (id: string, token: string) {
  //   const url = `${apiV1}/groups/class?${id}`;
  //   return delele(url, token);
  // },
  // getMembers: function (classId: any, token: string) {
  //   const url = `${apiV1}/groups/enrollment?classId__eq=${classId}`;
  //   return get(url, token);
  // },
  // patchRole: function (data: any, id: string, token: string) {
  //   const url = `${apiV1}/groups/enrollment/${id}`;
  //   return patch(url, data, token);
  // },
  // deleteMember: function (id: string, token: string) {
  //   const url = `${apiV1}/groups/enrollment/${id}`;
  //   return delele(url, token);
  // },
};

export default UserAPI;
