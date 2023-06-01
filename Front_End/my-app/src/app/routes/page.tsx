import Login_Register_Nav from '../pages/login_register_nav/page';
import AddProduct from '../pages/add_product/page';
import ListAccount from '../pages/list_account/page';
import ListProduct from '../pages/list_product/page';
import DeleteProduct from '../pages/delete_product/page';
import UpdateProduct from '../pages/update_product/page';
import ManagePartner from '../pages/manage_partner/page';
import ManageContract from '../pages/manage_contract/page';
import ContractDetail from '../pages/contract_detail/page';

//Public routes: những route không cần login vẫn xem được
const publicRoutes = [
    { path: '/', component: Login_Register_Nav },
];
//Private routes: những route cần login mới xem được
const privateRoutes = [
    { path: '/list_account', component: ListAccount },
    { path: '/add_product', component: AddProduct },
    { path: '/list_product', component: ListProduct},
    // { path: '/remove_product', component: DeleteProduct},
    // { path: '/update_product', component: UpdateProduct},
    { path: '/manage_partner', component: ManagePartner},
    { path: '/manage_contract', component: ManageContract},
    // { path: '/contract_detail', component: ContractDetail},
];

export { publicRoutes, privateRoutes };