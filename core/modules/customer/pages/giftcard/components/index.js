import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@common_button';
import TextField from '@common_textfield';
import { formatPrice } from '@helper_currency';
import { debuging } from '@config';
import Layout from '@layout_customer';
import ModalDetail from '@core_modules/customer/pages/giftcard/components/detail';
import DetailView from '@core_modules/customer/pages/giftcard/components/detail/view';
import useStyles from '@core_modules/customer/pages/giftcard/components/style';
import Loader from '@core_modules/customer/pages/giftcard/components/skeleton';

const GiftCard = (props) => {
    const {
        t, storeConfig, openDetail, handleCloseDetail, selectedCode, handleOpenDetail, data, search, handleTextSearch, handleSearch,
        error, loading,
    } = props;
    const styles = useStyles();

    if (error) {
        return (
            <Alert className="m-15" severity="error">
                {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
            </Alert>
        );
    }

    if (loading || !data) return <Layout {...props}><Loader /></Layout>;

    return (
        <Layout {...props}>
            <div>
                <ModalDetail
                    t={t}
                    storeConfig={storeConfig}
                    open={openDetail}
                    close={handleCloseDetail}
                    code={selectedCode}
                    DetailView={DetailView}
                />
                {data && data.customer.gift_card.length === 0 && (
                    <Alert className="m-15" severity="warning">
                        {t('customer:giftCard:notFound')}
                    </Alert>
                )}
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <List>
                            {data
                                && data.customer.gift_card.map((item, index) => (
                                    <ListItem key={index} onClick={() => handleOpenDetail(item.giftcard_code)}>
                                        <ListItemText primary={item.giftcard_code} />
                                        <ListItemSecondaryAction>
                                            <Typography variant="span" type="bold">
                                                {formatPrice(item.giftcard_balance, storeConfig.base_currency_code)}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                        </List>
                        <Divider />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-xs-12">
                        <div className={styles.searchBox}>
                            <TextField
                                label={t('customer:giftCard:inputSearch')}
                                value={search.value}
                                onChange={handleTextSearch}
                                error={!((search.error === '' || search.error === null))}
                                errorMessage={search.error || ''}
                            />
                            <Button onClick={handleSearch}>
                                <Typography letter="capitalize" color="white" type="bold">
                                    {t('customer:giftCard:buttonSearch')}
                                </Typography>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default GiftCard;
