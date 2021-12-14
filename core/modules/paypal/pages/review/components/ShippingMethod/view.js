/* eslint-disable no-nested-ternary */
import React from 'react';
import Typography from '@common_typography';
import { SkeletonShippingMethod } from '@core_modules/paypal/pages/review/components/Skeleton';
import Select from '@material-ui/core/Select';
import useStyles from '@core_modules/paypal/pages/review/components/ShippingMethod/style';

const ShippingMethodView = (props) => {
    const {
        t, checkout, data = [], onChange,
    } = props;
    const styles = useStyles();
    return (
        <div className="row">
            <div className="col-xs-12">
                <Typography variant="span" letter="capitalize" type="bold">
                    {t('checkout:shippingMethod')}
                </Typography>
            </div>
            <div className="col-xs-12">
                {
                    checkout.loading.all
                        ? (<SkeletonShippingMethod />)
                        : data.length > 0
                            ? (
                                <div className="col-xs-12">
                                    <Select
                                        native
                                        defaultValue={checkout.selectedShippingMethod}
                                        value={checkout.selectedShippingMethod}
                                        id="grouped-select"
                                        className={styles.selectBox}
                                        onChange={onChange}
                                    >
                                        {
                                            checkout.selectedShippingMethod === null && (
                                                <option
                                                    value=""
                                                >
                                                    {t('checkout:paypal:noShippingMethod')}
                                                </option>
                                            )
                                        }
                                        {
                                            data.map((item, key) => (
                                                <optgroup
                                                    key={key}
                                                    label={t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)
                                                            === `shippingGrouping.${item.group.replace('sg-', '')}`
                                                        ? item.group.replace('pg-', '')
                                                        : t(`checkout:shippingGrouping:${item.group.replace('sg-', '')}`)}
                                                >
                                                    {
                                                        item.data && item.data.length > 0
                                                            && item.data.map((list, idx) => (
                                                                <option
                                                                    key={idx}
                                                                    value={list.value}
                                                                >
                                                                    {list.label}
                                                                </option>
                                                            ))
                                                    }
                                                </optgroup>
                                            ))
                                        }
                                    </Select>
                                </div>
                            )
                            : (<Typography variant="p">{t('checkout:noShipping')}</Typography>)
                }
            </div>
        </div>
    );
};

export default ShippingMethodView;
