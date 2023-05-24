import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import ProductForm from '@/app/components/import_product_form/page';

const cx = classNames.bind(styles);
function AddProduct() {
    return ( <div className={cx('add_product')}>
        <div className={cx('add_product-wrapper')}>
        <Header name_view='Admin' className={cx('header')}/>
        <div className={cx('add_product-middle')}>
            <div className={cx('add_product-middle__wrapper')}>
                <Sidebar page_path='/add_product'/>
                <div className={cx('add_product-content')}>
                    <ProductForm />
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default AddProduct;
