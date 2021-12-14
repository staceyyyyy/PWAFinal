/* eslint-disable no-mixed-operators */
import PriceFormat from '@common_priceformat';
import Skeleton from '@common_skeleton';
import Typography from '@common_typography';
import useStyles from '@core_modules/product/pages/default/components/Loader/style';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('@common_slick/BannerThumbnail'), { ssr: false });

const SkeletonLoader = (props) => {
    const { name, price, banner } = props;
    const styles = useStyles();

    return (
        <div className="column row">
            <div className="col-sm-12 col-lg-12 hidden-mobile">
                <div className="row col-md-3" style={{ marginBottom: 20, justifyContent: 'space-between' }}>
                    <Skeleton width={75} />
                    <Skeleton width={75} />
                    <Skeleton width={75} />
                    <Skeleton width={75} />
                </div>
            </div>
            {!banner || banner.length === 0 && (
                <div className="col-lg-1 hidden-mobile">
                    <Skeleton
                        marginbottom={27}
                        variant="rect"
                        animation="wave"
                        mdStyle={{
                            width: '100%',
                            paddingBottom: '100%',
                            marginBottom: '10px',
                        }}
                        lgStyle={{
                            width: '100%',
                            paddingBottom: '100%',
                            marginBottom: '10px',
                        }}
                    />
                    <Skeleton
                        marginbottom={27}
                        variant="rect"
                        animation="wave"
                        mdStyle={{
                            width: '100%',
                            paddingBottom: '100%',
                            marginBottom: '10px',
                        }}
                        lgStyle={{
                            width: '100%',
                            paddingBottom: '100%',
                            marginBottom: '10px',
                        }}
                    />
                </div>
            )}
            <div className="col-sm-12 col-xs-12 col-lg-6">
                {banner && banner.length > 0 ? (
                    <Banner
                        data={banner}
                        noLink
                        thumbnail
                        showArrow={false}
                        contentWidth="auto"
                        autoPlay={false}
                        width={960}
                        height={1120}
                        customProduct={styles.bannerProduct}
                    />
                ) : (
                    <Skeleton
                        marginbottom={27}
                        variant="rect"
                        animation="wave"
                        xsStyle={{
                            width: '100%',
                            paddingBottom: '110%',
                        }}
                        mdStyle={{
                            width: '100%',
                            paddingBottom: '140%',
                        }}
                        lgStyle={{
                            width: '100%',
                            height: '100%',
                            paddingBottom: '140%',
                        }}
                    />
                )}
            </div>
            <div className={classNames(
                'col-sm-12 col-xs-12', {
                    'col-lg-6': banner && banner.length > 0,
                    'col-lg-5': !banner || banner.length === 0,
                },
            )}
            >
                <div className={styles.container}>
                    <div className={styles.titleContainer}>
                        <div className={styles.titlePriceContainer}>
                            {name ? (
                                <Typography
                                    variant="title"
                                    type="bold"
                                    letter="capitalize"
                                    className={classNames(styles.title, 'clear-margin-padding')}
                                >
                                    {name}
                                </Typography>
                            ) : (
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={225}
                                    height={53}
                                    mdStyle={{
                                        marginTop: '8px',
                                    }}
                                />
                            )}
                            {price ? (
                                <PriceFormat {...price} additionalPrice={0} />
                            ) : (
                                <Skeleton
                                    animation="wave"
                                    variant="text"
                                    width={225}
                                    height={53}
                                    mdStyle={{
                                        marginTop: '-17px',
                                    }}
                                />
                            )}
                            <Skeleton
                                animation="wave"
                                variant="text"
                                width={225}
                                height={53}
                                mdStyle={{
                                    marginTop: '-12px',
                                }}
                            />

                            <Skeleton
                                animation="wave"
                                variant="text"
                                width={75}
                                height={20}
                                mdStyle={{
                                    marginTop: '3px',
                                }}
                            />
                        </div>
                        <div className={styles.shareContainer} />
                    </div>
                    <div className="hidden-desktop">
                        <hr />
                        <Skeleton animation="wave" variant="text" width="100%" height={32} />
                        <hr />
                        <Skeleton animation="wave" variant="text" width="100%" height={32} />
                        <hr />
                    </div>
                    <div className="hidden-mobile">
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={25}
                            mdStyle={{
                                marginTop: '-1px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '20px',
                                marginTop: '7px',
                                marginLeft: '10px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginTop: '7px',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                marginTop: '7px',
                                display: 'inline-block',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={100}
                            height={25}
                            mdStyle={{
                                marginTop: '12px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '20px',
                                marginTop: '7px',
                                marginLeft: '10px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginTop: '7px',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                marginTop: '7px',
                                display: 'inline-block',
                                marginRight: '20px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={70}
                            height={20}
                            mdStyle={{
                                marginTop: '21px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={123}
                            height={50}
                            mdStyle={{
                                marginTop: '-9px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={316}
                            height={60}
                            mdStyle={{
                                marginTop: '-9px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="text"
                            width={316}
                            height={15}
                            mdStyle={{
                                marginTop: '12px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={30}
                            height={30}
                            mdStyle={{
                                display: 'inline-block',
                                marginRight: '5px',
                                marginTop: '6px',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                className="hidden-mobile"
                style={{
                    width: '100%',
                    height: 340,
                }}
            >
                <Skeleton animation="wave" variant="text" width="100%" height={340} />
            </div>
            {/* <CarouselSkeleton /> */}
        </div>
    );
};

export default SkeletonLoader;
