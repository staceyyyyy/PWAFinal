/* eslint-disable no-nested-ternary */
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormCom = (props) => {
    const {
        setOrderField, t, email, FormView, data, loading, error, SkeletonResult, DetailView, ResultView, getTrackOrder,
        ...other
    } = props;
    const [openResult, setOpenResult] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [modalType, setModalType] = React.useState('');
    const [modalData, setModalData] = React.useState('');

    const TrackingSchema = Yup.object().shape({
        email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        order_id: Yup.string().required(`${t('trackingorder:orderId')} ${t('validate:required')}`),
    });
    const formik = useFormik({
        initialValues: {
            email: email || '',
            order_id: '',
        },
        validationSchema: TrackingSchema,
        onSubmit: async (values, { resetForm, setValues }) => {
            await setOrderField(values);
            getTrackOrder();
            setOpenResult(true);
            resetForm();
            setValues(values);
        },
    });

    const handleOpenResult = (val) => {
        setOpenResult(val);
    };

    const handleOpenModal = (type, datas) => {
        setOpenModal(true);
        setModalType(type);
        setModalData(datas);
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <FormView {...props} formik={formik} handleOpenResult={handleOpenResult} openResult={openResult} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    {openResult ? (
                        loading || !data ? (
                            <SkeletonResult />
                        ) : (
                            <>
                                {data.ordersFilter && <ResultView {...other} t={t} orders={data.ordersFilter} openModal={handleOpenModal} />}
                                <DetailView
                                    {...props}
                                    modalType={modalType}
                                    modalData={modalData}
                                    open={openModal}
                                    setOpen={setOpenModal}
                                    orders={data.ordersFilter}
                                />
                            </>
                        )
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default FormCom;
