import BrowseModal from '@common_searchmodal';
import ShoppingBagIcon from '@plugin_shoppingbag';
import { withApollo } from '@lib_apollo';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import Router from 'next/router';
import { useState } from 'react';
import useStyles from '@core_modules/theme/components/bottom-navigation/mobile/style';

const Navigation = ({ active }) => {
    const styles = useStyles();
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (val) => {
        setOpenModal(val);
    };
    if (active) {
        return (
            <>
                <BrowseModal open={openModal} setOpenModal={handleOpenModal} />
                <BottomNavigation
                    className={styles.navigation}
                    value={active}
                    showLabels={false}
                    onChange={(event, newValue) => {
                        switch (newValue) {
                        case 'home':
                            Router.push('/');
                            return;
                        case 'browse':
                            handleOpenModal(true);
                            return;
                        case 'cart':
                            Router.push('/checkout/cart');
                            return;
                        case 'account':
                            Router.push('/customer/account');
                            break;
                        default:
                        }
                    }}
                >
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Search"
                        value="browse"
                        icon={<SearchIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Cart"
                        value="cart"
                        icon={<ShoppingBagIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                    <BottomNavigationAction
                        label="Account"
                        value="account"
                        icon={<PersonIcon />}
                        classes={{
                            label: 'hide',
                            root: styles.navAction,
                        }}
                    />
                </BottomNavigation>
            </>
        );
    }
    return null;
};

export default withApollo({ ssr: false })(Navigation);
