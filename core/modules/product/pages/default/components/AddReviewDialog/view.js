import Button from '@common_button';
import TextField from '@common_textfield';
import Typography from '@common_typography';
import Dialog from '@material-ui/core/Dialog';
import Rating from '@material-ui/lab/Rating';
import Header from '@common_headermobile';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { breakPointsUp } from '@helper_theme';

import useStyles from '@core_modules/product/pages/default/components/AddReviewDialog/style';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const CustomHeader = ({ onClose }) => (
    <Header
        pageConfig={{
            header: 'absolute',
        }}
        LeftComponent={(
            <IconButton onClick={onClose}>
                <Close fontSize="large" />
            </IconButton>
        )}
    />
);

const ReviewDialogView = (props) => {
    const styles = useStyles();
    const {
        Formik, open, setOpen, t,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <Dialog fullScreen={!desktop} open={open} onClose={setOpen} TransitionComponent={Transition}>
            <CustomHeader onClose={setOpen} />
            <div className={styles.root}>
                <form onSubmit={Formik.handleSubmit} className={styles.container}>
                    <Typography variant="title" type="semiBold" align="center" letter="capitalize">
                        {t('product:writeReview')}
                    </Typography>
                    <TextField
                        name="nickname"
                        onChange={Formik.handleChange}
                        value={Formik.values.nickname}
                        placeholder={t('product:nickname')}
                        label={t('product:nickname')}
                        className={styles.textField}
                        error={!!(Formik.touched.nickname && Formik.errors.nickname)}
                        errorMessage={(Formik.touched.nickname && Formik.errors.nickname) || null}

                    />
                    <TextField
                        name="title"
                        onChange={Formik.handleChange}
                        value={Formik.values.title}
                        label={t('product:title')}
                        className={styles.textField}
                        error={!!(Formik.touched.title && Formik.errors.title)}
                        errorMessage={(Formik.touched.title && Formik.errors.title) || null}
                    />
                    <TextField
                        name="detail"
                        onChange={Formik.handleChange}
                        value={Formik.values.detail}
                        placeholder={t('product:review')}
                        label={t('product:review')}
                        className={styles.textField}
                        multiline
                        row="4"
                        error={!!(Formik.touched.detail && Formik.errors.detail)}
                        errorMessage={(Formik.touched.detail && Formik.errors.detail) || null}
                    />
                    <div className={styles.ratingContainer}>
                        <Typography variant="p" type="semiBold">
                            {t('product:rate')}
                        </Typography>
                        <Rating
                            name="rating"
                            value={Formik.rating}
                            onChange={(event, newValue) => {
                                Formik.setFieldValue('rating', newValue);
                            }}
                        />
                        {Formik.touched.rating && Formik.errors.rating && (
                            <Typography variant="p" color="red">
                                {(Formik.touched.rating && Formik.errors.rating) ? Formik.errors.rating : ''}
                            </Typography>
                        )}
                    </div>
                    <Button type="submit" color="primary">
                        <Typography variant="span" color="white" letter="uppercase" type="bold">
                            {t('product:submitReview')}
                        </Typography>
                    </Button>
                </form>
            </div>
        </Dialog>
    );
};

export default ReviewDialogView;
