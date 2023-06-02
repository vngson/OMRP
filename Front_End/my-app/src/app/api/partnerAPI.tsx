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
 
};

export default PartnerAPI;
