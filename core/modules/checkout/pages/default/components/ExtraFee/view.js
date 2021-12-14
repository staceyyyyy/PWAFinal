/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import Typography from '@common_typography';
import Radio from '@common_radio';
import Select from '@common_select';
import Checkbox from '@common_checkbox';
import { formatPrice } from '@helper_currency';
import Skeleton from '@material-ui/lab/Skeleton';

import useStyles from '@core_modules/checkout/pages/default/components/ExtraFee/style';

const ExtraFeeView = ({
    cart, globalCurrency, t, state, handleChange, loading,
}) => {
    const styles = useStyles();
    const Loader = () => (
        <div className={styles.container}>
            <Skeleton variant="text" width="40%" height={35} />
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="80%" height={30} />
        </div>
    );
    if (loading.all || loading.extraFee) {
        return <Loader />;
    }
    return (
        <>
            <div className={styles.container} id="checkoutExtraFee">
                {/* <Typography variant="title" type="bold" className={classanames(styles.title)}>{t('common:title:extraFee')}</Typography> */}
                {
                    cart.addtional_fees.data.map((item, key) => {
                        const data = item.options.map((option) => ({
                            ...option,
                            originalLabel: option.label,
                            label: `${option.label} (${formatPrice(option.price, globalCurrency)})`,
                            value: JSON.stringify(option),
                        }));
                        if (item.frontend_type === 'checkbox' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Typography variant="span" type="bold" className="clear-margin-padding">
                                        {item.fee_name}
                                    </Typography>
                                    <Checkbox
                                        label=""
                                        key={key}
                                        flex="column"
                                        data={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : []}
                                        classCheckbox={styles.checkbox}
                                        classContainer={styles.checkboxContainer}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'radio' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Typography variant="span" type="bold" className="clear-margin-padding">
                                        {item.fee_name}
                                    </Typography>
                                    <Radio
                                        flex="column"
                                        valueData={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                        classContainer={styles.radio}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'dropdown' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Select
                                        options={data}
                                        label={item.fee_name}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        className={styles.select}
                                        onChange={(event) => handleChange(item.id_fee, event.target.value)}
                                        helperText={t('common:form:select')}
                                    />
                                </div>
                            );
                        }
                    })
                }
            </div>
        </>
    );
};

export default ExtraFeeView;
