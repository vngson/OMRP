import { apiV1, get, put, delele, patch,post } from "./generic";

const productAPI = {
    getAllProductsFull: function() {
        const url=`${apiV1}/consumer/product`;
        return get(url, "");
    },
    getAllProducts: function(page: number, perPage: number) {
        const url=`${apiV1}/consumer/product?page=${page}&perPage=${perPage}`;
        return get(url, "");
    },
      // get all product to type
      getAllProductsOfTypeFull: function(type: string) {
        const url=`${apiV1}/consumer/product?type=${type}`;
        return get(url, "");
    },
    // get all product to type
    getAllProductsOfType: function(page: number, perPage: number, type: string) {
        const url=`${apiV1}/consumer/product?page=${page}&perPage=${perPage}&type=${type}`;
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
    },
    getProduct: function (id: string) {
        const url=`${apiV1}/consumer/product/${id}`
        return get(url,"")
    },
    
    getAllProductOfPartner: function(id_partner:string, page:string, perPage: string){
        const url=`${apiV1}/employee/partnerProducts/${id_partner}?page=${page}&perPage=${perPage}`
        return get(url, "")
    },
    search: function (query: string){
        const url=`${apiV1}/consumer/product?keyword=${query}&page=1&perPage=10`
        return get(url,"")
    }
}


///v1/api/consumer/product
export default productAPI;