/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import Typography from '@common_typography';
import Button from '@common_button';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/wishlist/components/style';
import Item from '@core_modules/customer/pages/wishlist/components/item';
import ShareWishlistComponent from '@core_modules/customer/pages/wishlist/components/sharewishlist';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const {
        t, wishlist, refetch, handleRemove, handleToCart, handleAddAlltoBag, loading,
        handleShareWishlist, shareLoading,
    } = props;
    const [openShare, setOpenShare] = React.useState(false);
    const handleOpenShare = () => {
        setOpenShare(true);
    };
    return (
        <Layout {...props}>
            <div className={styles.root}>
                {
                    openShare && (
                        <ShareWishlistComponent
                            open={openShare}
                            setOpen={() => setOpenShare(false)}
                            handleShareWishlist={handleShareWishlist}
                            shareLoading={shareLoading}
                            t={t}
                        />
                    )
                }
                {wishlist.length === 0 && (
                    <Alert className="m-15" severity="warning">
                        {t('customer:wishlist:notFound')}
                    </Alert>
                )}
                <div className={[styles.content, styles.wishlistItems, 'row'].join(' ')}>
                    {wishlist.map((item, index) => (
                        <div className="col-md-3 col-xs-12">
                            <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <div>
                        <Button
                            onClick={handleOpenShare}
                            disabled={loading || wishlist.length === 0}
                            className={styles.btnWishlist}
                        >
                            <Typography variant="span" type="bold" letter="uppercase" color="white">
                                {t('customer:wishlist:shareWishlist')}
                            </Typography>
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={handleAddAlltoBag}
                            disabled={loading || wishlist.length === 0}
                            className={styles.btnWishlist}
                        >
                            <Typography variant="span" type="bold" letter="uppercase" color="white">
                                {t('customer:wishlist:addAllToBag')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Content;
