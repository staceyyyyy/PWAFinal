/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
// Library
import AddressFormDialog from '@plugin_addressform';
import Button from '@common_button';
import Add from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import Layout from '@layout_customer';
import TableAddress from '@core_modules/customer/pages/address/components/table';
import useStyles from '@core_modules/customer/pages/address/components/style';
import { SkeletonMobile, SkeletonTable } from '@core_modules/customer/pages/address/components/skeleton';
import ItemMobile from '@core_modules/customer/pages/address/components/ItemMobile';

// Main Render Page
const Content = (props) => {
    // style
    const styles = useStyles();
    const {
        loading, address, selectedAddressId,
        handleOpenNew, handleAddress, loadingAddress,
        success, openNew, t, handleChange, removeAddress,
    } = props;
    return (
        <Layout {...props}>
            <div className={styles.container}>
                <div className={styles.tableOuterContainer}>
                    <div className="hidden-desktop">
                        {
                            loading
                                ? (<SkeletonMobile />)
                                : address.length > 0 ? (
                                    <>
                                        {address.map((item, index) => (
                                            <ItemMobile
                                                {...item}
                                                first={index === 0}
                                                handleAddress={handleAddress}
                                                checked={item.id == selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                            />
                                        ))}
                                    </>
                                ) : (<Alert severity="warning">{t('customer:address:emptyMessage')}</Alert>)
                        }
                    </div>
                    <TableContainer component={Paper} className={[styles.tableContainer, 'hidden-mobile'].join(' ')}>
                        <Table className={styles.table} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow className={styles.tableRowHead}>
                                    <TableCell align="left">Default</TableCell>
                                    <TableCell align="left">{t('customer:address:firstname')}</TableCell>
                                    <TableCell align="left">{t('customer:address:lastname')}</TableCell>
                                    <TableCell align="left">{t('customer:address:street')}</TableCell>
                                    <TableCell align="left">{t('customer:address:phone')}</TableCell>
                                    <TableCell align="left"> </TableCell>
                                    <TableCell align="left"> </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    <SkeletonTable />
                                ) : address.length > 0 ? (
                                    <>
                                        {address.map((item) => (
                                            <TableAddress
                                                {...item}
                                                handleAddress={handleAddress}
                                                removeAddress={removeAddress}
                                                checked={item.id == selectedAddressId}
                                                key={item.id}
                                                addressId={item.id}
                                                firstname={item.firstname}
                                                lastname={item.lastname}
                                                telephone={item.telephone}
                                                postcode={item.postcode}
                                                region={item.region.region}
                                                city={item.city}
                                                country={{
                                                    id: item.country.code,
                                                    full_name_locale: item.country.label,
                                                }}
                                                street={item.street.join(' ')}
                                                value={item.id}
                                                defaultBilling={item.default_billing}
                                                defaultShipping={item.default_shipping}
                                                loadingAddress={loadingAddress}
                                                success={success}
                                                handleChange={handleChange}
                                                selectedAddressId={selectedAddressId}
                                                t={t}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9}>
                                            <Alert severity="warning">{t('customer:address:emptyMessage')}</Alert>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={[styles.address_action].join(' ')}>
                    <Button className={styles.btn_action} variant="outlined" size="small" onClick={() => handleOpenNew()}>
                        <span style={{ marginRight: '15px' }}>{t('customer:address:addTitle')}</span>
                        <Add />
                    </Button>
                </div>
                <AddressFormDialog
                    {...props}
                    onSubmitAddress={(data, type) => {
                        handleAddress(data, type);
                    }}
                    loading={loadingAddress}
                    success={success}
                    open={openNew}
                    setOpen={() => handleOpenNew(!openNew)}
                />
            </div>
        </Layout>
    );
};

export default Content;
