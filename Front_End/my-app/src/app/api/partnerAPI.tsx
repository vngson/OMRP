import { apiV1, apiV1_user, get, post, put, patch, delele} from "./generic";

const PartnerAPI = {
  
  getAllPartners: function () {
    const url = `${apiV1}/employee/partner`;
    return get(url, "");
  },
  getPartners: function (id: string) {
    const url = `${apiV1}/employee/partner/${id}`;
    return get(url, "");
  },
  createContract: function (id: string, data: any) {
    const url = `${apiV1}/partner/${id}/registerContract`;
    return post(url,data, "");
  },
  addProduct: function (id: string, prodId: string, data: any){
    const url = `${apiV1}/partner/${id}/postProduct/${prodId}`;
    return post(url,data, "");
   
  },
  deleteProduct: function (id: string, prodId: string){
    const url = `${apiV1}/partner/${id}/deleteProduct/${prodId}`;
    return delele(url, "");
  },
  getProducts: function (id: string){
    const url = `${apiV1}/partner/${id}/product`;
    return get(url, "");
  },
  getRemainProducts: function (id: string){
    const url = `${apiV1}/partner/${id}/productRemain`;
    return get(url, "");
  },
 
};

export default PartnerAPI;
