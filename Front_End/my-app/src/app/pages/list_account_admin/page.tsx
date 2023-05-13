import classNames from 'classnames/bind';
import styles from "./page.module.css"
import Header from '@/app/components/header/page';
import Footer from '@/app/components/footer/page';
import Sidebar from '@/app/components/sidebar/page';
import Account from '@/app/components/account_in_list_column/page';

const cx = classNames.bind(styles);
function ListAccount() {
    return ( <div className={cx('list_account')}>
        <div className={cx('list_account-wrapper')}>
        <Header name_view='Admin' className={cx('header')}/>
        <div className={cx('list_account-middle')}>
            <div className={cx('list_account-middle__wrapper')}>
                <Sidebar page_path='/list_account'/>
                <div className={cx('list_account-content')}>
                    <Account/>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    </div> );
}

export default ListAccount;
