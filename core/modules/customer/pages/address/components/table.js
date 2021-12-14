import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@common_typography';
import AddressFormDialog from '@plugin_addressform';
import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableCell from '@material-ui/core/TableCell';
import ConfirmationDelete from '@common_confirmdialog';
import useStyles from '@core_modules/customer/pages/address/components/style';

const TableAddress = (props) => {
    const {
        firstname = '',
        lastname = '',
        street = '',
        postcode = '',
        country = '',
        region = '',
        city = '',
        telephone = '',
        value = '',
        checked = false,
        handleAddress,
        loadingAddress,
        success,
        t,
        selectedAddressId,
        handleChange,
        removeAddress,
        addressId,
        // eslint-disable-next-line no-unused-vars
    } = props;
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    React.useEffect(() => {
        if (open && success) {
            setOpen(false);
        }
    }, [loadingAddress]);
    const styles = useStyles();
    const handleRemoveAddress = () => {
        removeAddress(addressId);
        setOpenDelete(true);
    };
    return (
        <>
            <ConfirmationDelete
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleRemoveAddress}
                message={t('customer:address:warningDelete')}
            />
            <AddressFormDialog
                {...props}
                open={open}
                onSubmitAddress={handleAddress}
                loading={loadingAddress}
                success={success}
                setOpen={() => setOpen(!open)}
                pageTitle={t('customer:address:editTitle')}
            />
            <TableRow className={styles.tableRowResponsive}>
                <TableCell
                    className={[styles.tableCellResponsive, styles.ok].join(' ')}
                    align="left"
                >
                    <RadioGroup row aria-label="position" onChange={handleChange} name="position" value={selectedAddressId}>
                        <FormControlLabel
                            className={[styles.address_shipping].join(' ')}
                            value={value}
                            checked={checked}
                            control={<Radio color="primary" size="small" />}
                            label=""
                            labelPlacement="end"
                        />
                    </RadioGroup>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:firstname')}</b>
                        </div>
                        <div className={styles.value}>{firstname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:lastname')}</b>
                        </div>
                        <div className={styles.value}>{lastname}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:street')}</b>
                        </div>
                        <div className={styles.value}>
                            {street}
                            ,
                            {' '}
                            {' '}
                            <br />
                            {city}
                            ,
                            {' '}
                            {' '}
                            {region}
                            ,
                            {' '}
                            {' '}
                            <br />
                            {country.full_name_locale || ''}
                            ,
                            {' '}
                            {' '}
                            {postcode}
                        </div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.mobLabel}>
                            <b>{t('customer:address:phone')}</b>
                        </div>
                        <div className={styles.value}>{telephone}</div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    <div className={styles.displayFlexRow}>
                        <div className={styles.value}>
                            <Typography className={[styles.address_edit].join(' ')} variant="span" onClick={() => setOpen(!open)}>
                                {t('customer:address:editTitle')}
                            </Typography>
                        </div>
                    </div>
                </TableCell>
                <TableCell
                    className={styles.tableCellResponsive}
                    align="left"
                >
                    {
                        selectedAddressId !== addressId
                            ? (
                                <div className={styles.displayFlexRow}>
                                    <div className={styles.value}>
                                        <Typography className={[styles.address_remove].join(' ')} variant="span" onClick={() => setOpenDelete(true)}>
                                            {t('customer:address:removeTitle')}
                                        </Typography>
                                    </div>
                                </div>
                            ) : null
                    }
                </TableCell>
            </TableRow>
        </>
    );
};

export default TableAddress;
