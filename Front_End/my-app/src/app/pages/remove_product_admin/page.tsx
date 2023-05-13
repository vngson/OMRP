import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Product from '@/app/components/product_in_list_column/page';

const cx = classNames.bind(styles);
function RemoveProduct() {
    return ( <div className={cx('remove_product')}>
        <div className={cx('remove_product-wrapper')}>
        <Header name_view='Admin' className={cx('header')}/>
        <div className={cx('remove_product-middle')}>
            <div className={cx('remove_product-middle__wrapper')}>
                <Sidebar page_path='/remove_product'/>
                <div className={cx('remove_product-content')}>
                    <Product admin = {true} business = {false} red_title='Gỡ sản phẩm' green_title='Cập nhật sản phẩm'/>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default RemoveProduct;
