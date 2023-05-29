

export type categoryApi ={
    Img: string,
    TYPE_PROD: string
}


export type productApi= {
    NAME: string,
    ID_PRODUCTS: number,
    PRICE: number,
    QUANTITY: number,
    TYPE_PROD: string,
    URL: [id:number, img: string],
    INFOR_PRODUCTS: string,
    partners: [
        {ID_Partners: string,
        Name: string,
        url: string,
        GiaDoiThuong: number}
    ]

}
export type userApi ={
    userInfo: {
        NAME: string
    }
}
export type partnerApi = {
    ID_Partners: string,
    Name: string,
    Email: string,
    Address: string,
    url: string
}