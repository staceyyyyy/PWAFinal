/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import TextField from '@common_textfield';
import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Button from '@common_button';
import Divider from '@material-ui/core/Divider';
import DropFile from '@common_dropfile';
import CheckBox from '@common_checkbox';
import Router from 'next/router';
import { requestRma } from '@core_modules/rma/services/graphql';
import useStyles from './styles';
import ItemProduct from './ItemProduct';
import ItemField from './ItemField/index';

const NewContent = (props) => {
    const {
        t, data: { custom_fields, items, allowed_file_extensions }, storeConfig, customerData,
        order_number, ItemProductView, ItemFieldView, OtherRmaLink, error, loadCustomerData, WarningInfo,
    } = props;

    if (error || loadCustomerData.error) {
        return (
            <Layout {...props} title={t('customer:menu:return')} activeMenu="/rma/customer">
                <WarningInfo variant="error" text={t('rma:error:fetch')} />
            </Layout>
        );
    }
    const styles = useStyles();
    const [formData, setFormData] = React.useState({
        order_number,
        customer_name: customerData.firstname,
        customer_email: customerData.email,
        custom_fields: [],
        order_items: [],
        message: '',
        attachments: [],
    });
    const [selectItem, setSelectItem] = React.useState([]);
    const [state, setState] = React.useState({
        loading: false,
        openMessage: false,
        textMessage: '',
        variantMessage: 'success',
        errorForm: false,
    });

    let products = [];
    const currency = storeConfig ? storeConfig.base_currency_code : 'IDR';
    const [postRma] = requestRma();

    const handleSelectProduct = (val) => {
        setSelectItem(val);
    };

    const selectAll = () => {
        const selected = [];
        items.map(({ item_id, is_returnable }) => is_returnable && selected.push(item_id));
        setSelectItem(selected);
    };

    const deselectAll = () => setSelectItem([]);
    if (items.length > 0) {
        const itemsChild = items.filter((item) => {
            if (item.parent_item_id !== null) {
                return item;
            }
        });
        const simpleData = items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
        products = [...itemsChild, ...simpleData];
        products = products.map((product) => ({
            label: product.name,
            value: product.item_id,
            form: custom_fields,
            disabled: !product.is_returnable,
            currency,
            formData,
            setFormData,
            t,
            errorForm: state.errorForm,
            ItemProductView,
            ItemFieldView,
            OtherRmaLink,
            ...product,
        }));
    }

    const changeOptionCustomField = (value) => {
        let allField = formData.custom_fields;
        const findField = formData.custom_fields.find((item) => value.field_id === item.field_id);
        if (findField) {
            allField = formData.custom_fields.filter((item) => item.field_id !== value.field_id);
            allField.push(value);
        } else {
            allField.push(value);
        }
        setFormData({
            ...formData,
            custom_fields: allField,
        });
    };

    const handleGetBase64 = (files) => {
        const attachments = files.map((file) => ({
            file_content_base64: file.baseCode,
            file_name: file.file.name,
            name: file.file.name,
        }));
        setFormData({
            ...formData,
            attachments,
        });
    };

    const handleSubmit = () => {
        const fieldRequets = custom_fields.filter((field) => field.refers === 'request');
        const fieldItem = custom_fields.filter((field) => field.refers === 'item');
        const stateData = state;
        stateData.errorForm = false;
        if (formData.custom_fields.length < fieldRequets.length) stateData.errorForm = true;
        if (selectItem.length > 0) {
            formData.order_items.map((item) => {
                if (item.custom_fields.length < fieldItem.length) stateData.errorForm = true;
            });
        } else {
            stateData.errorForm = true;
            stateData.textMessage = t('rma:form:itemNull');
            stateData.openMessage = true;
            stateData.variantMessage = 'error';
        }

        if (stateData.errorForm === false) {
            window.backdropLoader(true);
            postRma({
                variables: {
                    order_number: formData.order_number,
                    customer_name: formData.customer_name,
                    customer_email: formData.customer_email,
                    custom_fields: formData.custom_fields,
                    order_items: formData.order_items,
                    thread_message: {
                        text: formData.message,
                        attachments: formData.attachments,
                    },
                },
            }).then(async (res) => {
                if (res.data) {
                    window.backdropLoader(false);
                    await window.toastMessage({
                        open: true,
                        text: t('rma:form:addSuccess'),
                        variant: 'success',
                    });
                    setTimeout(() => {
                        Router.push(
                            '/rma/customer/view/id/[id]',
                            `/rma/customer/view/id/${res.data.createRequestAwRma.detail_rma.increment_id}`,
                        );
                    }, 1500);
                }
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message.split(':')[1] || t('rma:form:addFailed'),
                    variant: 'error',
                });
            });
        } else {
            setState({ ...stateData });
        }
    };

    let fileAccept = '';
    if (allowed_file_extensions.length > 0) {
        allowed_file_extensions.map((ext) => {
            fileAccept += `.${ext},`;
        });
    }

    return (
        <Layout {...props} title={t('customer:menu:return')} activeMenu="/rma/customer">
            <div className="column">
                <div className={classNames(styles.block)}>
                    {
                        custom_fields && custom_fields.length > 0 && custom_fields.map((item, index) => {
                            if (item.refers === 'request') {
                                const name = item.name.split(' ').join('_').toLowerCase();
                                const options = item.options.map((op) => ({
                                    label: op.frontend_labels[0].value,
                                    value: op.id,
                                }));
                                return (
                                    <ItemField
                                        key={index}
                                        options={options}
                                        name={name}
                                        propsValue={{
                                            field_id: item.id,
                                        }}
                                        errorForm={state.errorForm}
                                        onSelect={changeOptionCustomField}
                                        label={item.frontend_labels[0].value}
                                        required={item.is_required}
                                        t={t}
                                        ItemFieldView={ItemFieldView}
                                    />
                                );
                            } return null;
                        })
                    }
                </div>
                <div className={styles.labelProduct}>
                    <Typography variant="title">{t('rma:product')}</Typography>
                </div>
                <div className={styles.selectProductContainer}>
                    <span onClick={selectAll}>
                        <Typography variant="label">{t('rma:selectAll')}</Typography>
                    </span>
                    <Divider orientation="vertical" flexItem />
                    <span onClick={deselectAll}>
                        <Typography variant="label">{t('rma:deselectAll')}</Typography>
                    </span>
                </div>
                <div className={styles.block}>
                    {products.length > 0
                            && (
                                <CheckBox
                                    data={products}
                                    label=""
                                    value={selectItem}
                                    onChange={handleSelectProduct}
                                    flex="column"
                                    CustomItem={ItemProduct}
                                />
                            )}
                </div>
                <div className={styles.block}>
                    <TextField
                        name="message"
                        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                        value={formData.message}
                        placeholder={t('rma:form:placeholder:message')}
                        label={t('rma:form:label:message')}
                        multiline
                        rows={4}
                    />
                </div>
                <div className={styles.block}>
                    <DropFile label={t('rma:form:placeholder:uploadFile')} getBase64={handleGetBase64} acceptedFile={fileAccept} />
                </div>
                <div className={styles.block}>
                    <Button fullWidth onClick={handleSubmit}>
                        <Typography letter="uppercase" type="bold" variant="span" color="white">{t('rma:form:submit')}</Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

const NewReturnRma = (props) => {
    const {
        data, loadCustomerData, loading, Loader,
    } = props;

    if (loading || !data || loadCustomerData.loading) {
        return <Loader />;
    }

    return <NewContent {...props} />;
};

export default NewReturnRma;
