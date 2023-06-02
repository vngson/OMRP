import Login_Register_Nav from '@/app/pages/login_register_nav/page';
import AddProduct from '@/app/add_product/page';
import ListAccount from '@/app/list_account/page';
import ListProduct from '@/app/list_product/page';
import DeleteProduct from '@/app/delete_product/page';
import UpdateProduct from '@/app/update_product/page';
import ManagePartner from '@/app/manage_partner/page';
import ManageContract from '@/app/manage_contract/page';
import ContractDetail from '@/app/contract_detail/page';


//Public routes: những route không cần login vẫn xem được
const publicRoutes = [
    // { path: '/', component: Login_Register_Nav },
    { path: '/list_account', component: ListAccount },
    { path: '/add_product', component: AddProduct },
    { path: '/list_product', component: ListProduct},
    { path: '/manage_partner', component: ManagePartner},
    { path: '/manage_contract', component: ManageContract},
    { path: '/delete_product/:id', component: DeleteProduct},
    { path: "/update_product/:id", component: UpdateProduct},
    { path: '/contract_detail/:id', component: ContractDetail},
];
//Private routes: những route cần login mới xem được
const privateRoutes = [
];

export { publicRoutes};