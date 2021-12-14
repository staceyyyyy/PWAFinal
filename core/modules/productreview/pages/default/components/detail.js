/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import IconButton from '@material-ui/core/IconButton';
import Typography from '@common_typography';
import Image from '@common_image';
import classNames from 'classnames';
import RatingStar from '@common_ratingstar';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import formatDate from '@helper_date';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Link from 'next/link';
import React from 'react';
import useStyles from '@core_modules/productreview/pages/default/components/style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));
const ProductReview = (props) => {
    const styles = useStyles();
    const {
        open, setOpen, reviewItem, t,
    } = props;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    if (reviewItem) {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={setOpen}
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
            >
                <div>
                    <DialogContent dividers>
                        <div className={classNames('col-md-12', styles.container)}>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    right: 5,
                                    top: 0,
                                }}
                                edge="start"
                                onClick={setOpen}
                                aria-label="close"
                            >
                                <CloseIcon />
                            </IconButton>
                            <div className="row">
                                <div className="col-md-5">
                                    <Image
                                        src={reviewItem.product.image.url}
                                        lazy
                                        height={300}
                                        width={300}
                                    />
                                </div>
                                <div className="col-md-5 col">
                                    <Typography variant="h1" align="left" style={{ textTransform: 'uppercase' }}>
                                        {reviewItem.product.name}
                                    </Typography>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 15,
                                    }}
                                    >
                                        <Typography variant="p" align="left">
                                            <RatingStar value={
                                                reviewItem.ratings_breakdown.length > 0
                                                    ? reviewItem.ratings_breakdown[0].value : 0
                                            }
                                            />
                                        </Typography>
                                        <Typography variant="p" align="left">
                                            1 &nbsp;
                                            <Link href={`/${reviewItem.product.url_key}`}>
                                                {t('productreview:review')}
                                            </Link>
                                        </Typography>
                                        <Typography variant="p" align="left">
                                            <Link href={`/${reviewItem.product.url_key}`}>
                                                {t('productreview:addYourReview')}
                                            </Link>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <Typography
                                variant="h6"
                                align="left"
                                style={{
                                    marginTop: 40,
                                    marginLeft: 0,
                                }}
                            >
                                {t('productreview:yourReview')}
                            </Typography>
                            <Divider />
                            <div style={{
                                display: 'flex',
                                marginTop: 20,
                            }}
                            >
                                <div style={{
                                    flex: 0.2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                                >
                                    <Typography variant="label" align="left">
                                        {t('productreview:rating')}
                                    </Typography>
                                    <RatingStar value={
                                        reviewItem.ratings_breakdown.length > 0
                                            ? reviewItem.ratings_breakdown[0].value : 0
                                    }
                                    />
                                </div>
                            </div>
                            <Typography
                                variant="label"
                                align="left"
                                style={{
                                    fontWeight: 'bold',
                                    marginTop: 15,
                                }}
                            >
                                {reviewItem.summary}
                            </Typography>
                            <Typography variant="label" align="left" style={{ marginTop: 15 }}>
                                {reviewItem.text}
                            </Typography>
                            <Typography
                                variant="label"
                                align="left"
                                style={{
                                    marginTop: 15,
                                    color: 'grey',
                                }}
                            >
                                {t('productreview:submittedOn')}
                                {' '}
                                {
                                    formatDate(reviewItem.created_at, 'MMM DD, YYYY')
                                }
                            </Typography>
                        </div>
                    </DialogContent>
                </div>
            </Dialog>
        );
    }
    return null;
};

const DetailProductReview = (props) => (
    <ProductReview
        {...props}
    />
);

export default DetailProductReview;
