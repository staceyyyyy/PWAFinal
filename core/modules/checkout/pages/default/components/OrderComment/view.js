import classNames from 'classnames';
import TextField from '@common_textfield';
import useStyles from '@core_modules/checkout/pages/default/components/OrderComment/style';

const OrderCommentView = (props) => {
    const styles = useStyles();
    const {
        formik,
    } = props;
    return (
        <>
            <div className={classNames(styles.block, styles.rmBorder)}>
                <div className={styles.orderCommentContainer}>
                    <TextField
                        name="orderComment"
                        onChange={formik.handleChange}
                        value={formik.values.orderComment}
                        placeholder="Order Coment"
                        label="Order Coment"
                        className={styles.textField}
                        multiline
                        row="4"
                        error={!!(formik.touched.orderComment && formik.errors.orderComment)}
                        errorMessage={(formik.touched.orderComment && formik.errors.orderComment) || null}
                    />
                </div>
            </div>
        </>
    );
};

export default OrderCommentView;
