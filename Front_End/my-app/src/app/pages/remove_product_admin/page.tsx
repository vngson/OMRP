import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Product from '@/app/components/product_in_list_column/page';
import image_product from "@/assets/images/ly_giu_nhiet.png"

const actions = [
    {
        title: 'Danh sách tài khoản',
        to: '/list_account',
    },
    {
        title: 'Thêm sản phẩm',
        to: '/add_product',
    },
    {
        title: 'Danh sách sản phẩm',
        to: '/list_product',
    },
]

const Information = {
    src: image_product,
    name: 'Bình giữ nhiệt',
    category: "Cốc, ly, bình",
    description: "Ly giữ nhiệt 600ml chính hãng tặng kèm ống hút inox 304 cao cấp thiết kế nhám mờ hạn chế trầy xước cách nhiệt chân không",
    price: 30,
    quantity: 1,
}

const INFO = [Information]
const cx = classNames.bind(styles);
function RemoveProduct() {
    return ( <div className={cx('remove_product')}>
        <div className={cx('remove_product-wrapper')}>
        <Header name_view='Admin' className={cx('header')}/>
        <div className={cx('remove_product-middle')}>
            <div className={cx('remove_product-middle__wrapper')}>
                <Sidebar page_path='/remove_product' LIST_ACTION={actions}/>
                <div className={cx('remove_product-content')}>
                    <Product info={INFO} view='choose_product_business'/>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default RemoveProduct;
