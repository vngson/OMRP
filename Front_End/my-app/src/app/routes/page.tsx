import Login_Register_Nav from '../pages/login_register_nav/page';
import AddProduct from '../pages/add_product_admin/page';
import ListAccount from '../pages/list_account_admin/page';
import ListProduct from '../pages/list_product_admin/page';
import ManagePartner from '../pages/manage_partner_staff/page';
import ManageContract from '../pages/manage_contract_staff/page';

//Public routes: những route không cần login vẫn xem được
const publicRoutes = [
    { path: '/', component: Login_Register_Nav },
];
//Private routes: những route cần login mới xem được
const privateRoutes = [
    { path: '/list_account', component: ListAccount },
    { path: '/add_product', component: AddProduct },
    { path: '/list_product', component: ListProduct},
    { path: '/manage_partner', component: ManagePartner},
    { path: '/manage_contract', component: ManageContract},
];