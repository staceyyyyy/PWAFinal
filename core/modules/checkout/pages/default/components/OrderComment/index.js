import { modules } from '@config';

const OrderComment = (props) => {
    const {
        formik,
        OrderCommentView,
    } = props;

    if (modules.checkout.orderComment.enabled) {
        return (
            <OrderCommentView formik={formik} />
        );
    }

    return null;
};

export default OrderComment;
