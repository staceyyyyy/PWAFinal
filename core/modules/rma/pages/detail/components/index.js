/* eslint-disable react/no-danger */
import classNames from 'classnames';
import React from 'react';
import ConfirmModal from '@common_confirmdialog';
import Layout from '@layout_customer';
import { updateRma, cancelRma } from '@core_modules/rma/services/graphql';
import ItemField from '@core_modules/rma/pages/detail/components/ItemField';
import useStyles from '@core_modules/rma/pages/detail/components/styles';

const DetailContent = (props) => {
    const {
        t, data: { detail_rma, form_data }, customerData, storeConfig,
        refetch, ItemProduct, ListMessage, FormComment, Footer, loading, loadCustomerData, WarningInfo, error,
        Detail, ...other
    } = props;
    const styles = useStyles();
    const currency = storeConfig ? storeConfig.base_currency_code : 'IDR';
    const requestFieldValue = detail_rma.custom_fields.map(({ field, value }) => ({
        field: field.id,
        value: value.id,
        valueLabel: value.frontend_labels[0].value,
    }));

    const [formData, setFormData] = React.useState({
        order_number: detail_rma.order_number,
        customer_name: customerData.firstname,
        customer_email: customerData.email,
        custom_fields: [],
        order_items: [],
        message: '',
        attachments: [],
    });

    const [state, setState] = React.useState({
        openDialog: false,
        messageDialog: '',
        handleYes: () => {},
        dropValue: [],
    });

    if (error) {
        return (
            <Layout {...props} title={t('customer:menu:return')} activeMenu="/rma/customer">
                <WarningInfo variant="error" text={t('rma:error:fetch')} />
            </Layout>
        );
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
    const requestFormField = form_data.custom_fields.filter((item) => item.refers === 'request');

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

    let fileAccept = '';
    if (form_data.allowed_file_extensions.length > 0) {
        // eslint-disable-next-line array-callback-return
        form_data.allowed_file_extensions.map((ext) => {
            fileAccept += `.${ext},`;
        });
    }

    const [postUpdateRma] = updateRma();
    const [postCancelRma] = cancelRma();

    const handleCancelRma = () => {
        setState({ ...state, openDialog: false });
        window.backdropLoader(true);
        postCancelRma({
            variables: {
                email: formData.customer_email,
                increment_id: detail_rma.increment_id,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('rma:view:successCancel'),
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('rma:view:failedCancel'),
            });
        });
    };

    const handleUpdate = (update_status = false) => {
        window.backdropLoader(true);
        const variables = {
            customer_email: formData.customer_email,
            customer_name: formData.customer_name,
            increment_id: detail_rma.increment_id,
            update_status,
        };
        if (formData.custom_fields.length > 0) variables.custom_fields = formData.custom_fields;
        if (formData.message !== '') variables.thread_message = { text: formData.message, attachments: [] };
        variables.thread_message = { text: formData.message, attachments: formData.attachments };
        postUpdateRma({
            variables: {
                ...variables,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('rma:form:updateSuccess'),
            });
            setFormData({
                order_number: detail_rma.order_number,
                customer_name: customerData.firstname,
                customer_email: customerData.email,
                custom_fields: [],
                order_items: [],
                message: '',
                attachments: [],
            });
            setState({
                ...state, dropValue: [],
            });
            refetch();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('rma:form:updateFailed'),
            });
        });
    };

    const actionUpdateStatus = async () => {
        const handleYes = () => {
            setState({ ...state, openDialog: false });
            handleUpdate(true);
        };
        setState({
            ...state,
            openDialog: true,
            messageDialog: <div dangerouslySetInnerHTML={{ __html: t('rma:view:confrimShipping') }} />,
            handleYes,
        });
    };

    const confirmCancel = () => {
        setState({
            ...state,
            openDialog: true,
            messageDialog: t('rma:view:cancelRequest'),
            handleYes: handleCancelRma,
        });
    };

    const statusCancelRequired = ['Pending Approval', 'pending approval', 'Approved', 'approved'];
    const statusUpdateNoRequired = ['Closed', 'closed', 'Canceled', 'canceled'];
    let cancelButton = false;
    let updateButton = false;
    let updateStatusButton = false;

    if (statusCancelRequired.find((status) => status === detail_rma.status.name || status === detail_rma.status.name.toLowerCase())) {
        cancelButton = true;
    }
    if (!statusUpdateNoRequired.find((status) => status === detail_rma.status.name)
    || !statusUpdateNoRequired.find((status) => status === detail_rma.status.name.toLowerCase())) {
        updateButton = true;
    }
    if (detail_rma.confirm_shipping.status) {
        updateStatusButton = true;
    }

    const handleChangeComment = (event) => {
        setFormData({ ...formData, message: event.target.value });
    };

    return (
        <Layout {...props} title={t('customer:menu:return')} activeMenu="/rma/customer">
            <ConfirmModal
                open={state.openDialog}
                handleCancel={() => setState({ ...state, openDialog: false })}
                handleYes={state.handleYes}
                message={state.messageDialog}
            />
            <div className="column">
                {
                    detail_rma.confirm_shipping.status
                        ? (<div className={styles.block} dangerouslySetInnerHTML={{ __html: detail_rma.confirm_shipping.step }} />)
                        : null
                }
                <div className={classNames(styles.detail)}>
                    <Detail
                        detail_rma={detail_rma}
                        t={t}
                        {...other}
                    />
                    {
                        requestFormField.length > 0 && requestFormField.map((item, index) => {
                            const name = item.name.split(' ').join('_').toLowerCase();
                            const options = item.options.map((op) => ({
                                label: op.frontend_labels[0].value,
                                value: op.id,
                            }));
                            const fieldValue = requestFieldValue.filter(({ field }) => field === item.id);
                            return (
                                <ItemField
                                    key={index}
                                    options={options}
                                    name={name}
                                    fieldValue={fieldValue}
                                    item={item}
                                    onSelect={changeOptionCustomField}
                                    t={t}
                                    {...other}
                                />
                            );
                        })
                    }
                </div>
                <div className={styles.block}>
                    {
                        detail_rma.items.map((item, index) => (
                            <ItemProduct key={index} {...item} currency={currency} />
                        ))
                    }
                </div>
                {
                    (detail_rma.status.name !== 'Canceled' || detail_rma.status.name.toLowerCase() !== 'canceled') && (
                        <>
                            <FormComment
                                formData={formData}
                                setFormData={setFormData}
                                state={state}
                                t={t}
                                setState={setState}
                                handleGetBase64={handleGetBase64}
                                fileAccept={fileAccept}
                                commentValue={formData.message}
                                handleChangeComment={handleChangeComment}
                                dropValue={state.dropValue}
                                handleDrop={(dropValue) => setState({ ...state, dropValue })}
                                {...other}
                            />
                            <Footer
                                cancelButton={cancelButton}
                                updateButton={updateButton}
                                updateStatusButton={updateStatusButton}
                                detail_rma={detail_rma}
                                t={t}
                                confirmCancel={confirmCancel}
                                handleUpdate={handleUpdate}
                                actionUpdateStatus={actionUpdateStatus}
                                {...other}
                            />
                        </>
                    )
                }
                <ListMessage data={detail_rma.thread_message} t={t} {...other} />
            </div>
        </Layout>
    );
};

const DetailReturn = (props) => {
    const {
        data, Loader, loading, loadCustomerData, customerData,
    } = props;
    if (loading || !data || (data && !data.detail_rma) || loadCustomerData.loading
    || !customerData) return <Layout {...props}><Loader /></Layout>;
    return <DetailContent {...props} />;
};

export default DetailReturn;
