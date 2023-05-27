import { apiV1, get, put, delele, patch,post } from "./generic";

const productAPI = {
    getAllProducts: function(page: number, perPage: number) {
        const url=`${apiV1}/consumer/product?page=${page}&perPage=${perPage}`;
        return get(url, "");
    },
    getAllCatagories: function (){
        const url =`${apiV1}/consumer/category`
        return get(url, "")
    },
}



export default productAPI;