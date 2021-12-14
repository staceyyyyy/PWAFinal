import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addReview } from '@core_modules/product/services/graphql';

const AddReviewDialog = ({
    open = false, setOpen = () => {}, t, data, ViewDialog,
}) => {
    const validationSchema = Yup.object().shape({
        nickname: Yup.string().required(t('product:validate:nickname')),
        title: Yup.string().required(t('product:validate:title')),
        detail: Yup.string().required(t('product:validate:detail')),
        rating: Yup.string().required(t('product:validate:rating')).nullable(),
    });

    const [addProductReview] = addReview();

    const Formik = useFormik({
        initialValues: {
            nickname: '',
            rating: null,
            title: '',
            detail: '',
            pkValue: data.id,
        },
        validationSchema,
        onSubmit: (value, { resetForm }) => {
            resetForm({});
            addProductReview({
                variables: {
                    ...value,
                },
            }).then(() => {
                setOpen({
                    variant: 'success',
                });
                window.toastMessage({
                    open: true,
                    text: t('product:addRateSuccess'),
                    variant: 'success',
                });
            }).catch((e) => {
                setOpen({
                    message: e.message.split(':')[1] || t('product:addRateFailed'),
                    variant: 'error',
                });
                window.toastMessage({
                    open: true,
                    text: t('product:addRateFailed'),
                    variant: 'error',
                });
            });
        },
    });
    return (
        <ViewDialog Formik={Formik} open={open} setOpen={setOpen} t={t} />
    );
};

export default AddReviewDialog;
