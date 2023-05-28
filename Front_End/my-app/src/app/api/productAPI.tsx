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
    getProductPointList: function(cusID: string,page:number, perPage: number){
        const url =`${apiV1}/consumer/productPoint/${cusID}?page=${page}&perPage=${perPage}`
        return get(url, "");
    },
    getProductExchangePointList: function(cusID: string,page:number, perPage: number){
        const url =`${apiV1}/consumer/productExchangePoint/${cusID}?page=${page}&perPage=${perPage}`
        return get(url, "");
    }
}



export default productAPI;