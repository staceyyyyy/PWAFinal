import React from 'react';
import Typography from '@common_typography';
import useStyles from '@core_modules/rma/pages/new/components/styles';
import ItemField from '@core_modules/rma/pages/new/components/ItemField';

const ItemProduct = (props) => {
    const {
        qty_returnable, dataValues, value, onChange, formData,
        ItemProductView, setFormData, t, form, disabled,
        image_url, name, other_rma_request, price, currency = 'USD',
        errorForm, ItemFieldView, OtherRmaLink, ...other
    } = props;
    const styles = useStyles();
    const checked = dataValues.indexOf(value) !== -1;
    const [selectedData, setSelectedData] = React.useState({
        item_id: '',
        qty: 1,
        custom_fields: [],
    });
    const changeSelectedItem = (param) => {
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => param.item_id === item.item_id);
        if (findField) {
            allField = formData.order_items.filter((item) => item.item_id !== param.item_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setFormData({
            ...formData,
            order_items: allField,
        });
    };
    const handleChange = () => {
        onChange(value);
        let allField = formData.order_items;
        const findField = formData.order_items.find((item) => value === item.item_id);
        if (findField) {
            allField = allField.filter((item) => item.item_id !== value);
            setFormData({
                ...formData,
                order_items: allField,
            });
        } else {
            setSelectedData({
                ...selectedData,
                item_id: value,
            });
            changeSelectedItem({
                ...selectedData,
                item_id: value,
            });
        }
    };
    const optionQty = [];
    if (qty_returnable > 0) {
        for (let index = 1; index <= qty_returnable; index += 1) {
            optionQty.push({
                label: index,
                value: index,
            });
        }
    }
    const handleQty = (param) => {
        setSelectedData({
            ...selectedData,
            qty: param.value,
        });
        changeSelectedItem({
            ...selectedData,
            qty: param.value,
        });
    };

    const changeOptionCustomField = (param) => {
        let allField = selectedData.custom_fields;
        const findField = selectedData.custom_fields.find((item) => param.field_id === item.field_id);
        if (findField) {
            allField = selectedData.custom_fields.filter((item) => item.field_id !== param.field_id);
            allField.push(param);
        } else {
            allField.push(param);
        }
        setSelectedData({
            ...selectedData,
            custom_fields: allField,
        });
        changeSelectedItem({
            ...selectedData,
            custom_fields: allField,
        });
    };

    return (
        <div className="column">
            <ItemProductView
                checked={checked}
                disabled={disabled}
                handleChange={handleChange}
                name={name}
                image_url={image_url}
                price={price}
                currency={currency}
                {...other}
            />

            <div className={styles.selectItemBox}>
                {disabled ? <Typography color="red">{t('rma:noItemReturn')}</Typography> : null}
                {other_rma_request && other_rma_request.length > 0 ? (
                    <OtherRmaLink
                        t={t}
                        other_rma_request={other_rma_request}
                        {...other}
                    />
                ) : null}
                {checked && qty_returnable > 0 && (
                    <ItemField
                        options={optionQty}
                        name="Qty"
                        label="Qty"
                        onSelect={handleQty}
                        t={t}
                        ItemFieldView={ItemFieldView}
                    />
                )}
                {checked
                    ? form
                      && form.length > 0
                      && form.map((item, index) => {
                          if (item.refers === 'item') {
                              const names = item.name.split(' ').join('_').toLowerCase();
                              const options = item.options.map((op) => ({
                                  label: op.frontend_labels[0].value,
                                  value: op.id,
                              }));
                              return (
                                  <ItemField
                                      key={index}
                                      options={options}
                                      name={names}
                                      label={item.frontend_labels[0].value}
                                      propsValue={{
                                          field_id: item.id,
                                      }}
                                      errorForm={errorForm}
                                      onSelect={changeOptionCustomField}
                                      required={item.is_required}
                                      t={t}
                                      ItemFieldView={ItemFieldView}
                                      {...other}
                                  />
                              );
                          }
                          return null;
                      })
                    : !disabled && <Typography align="center">{t('rma:form:label:tickSelect')}</Typography>}
            </div>
        </div>
    );
};

export default ItemProduct;
