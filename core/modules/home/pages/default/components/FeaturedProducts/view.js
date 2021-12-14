/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { modules } from '@config';
import Carousel from '@common_slick/Caraousel';
import ProductItem from '@plugin_productitem';
import { breakPointsUp } from '@helper_theme';
import Typography from '@common_typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { setResolver, getResolver } from '@helper_localstorage';
import Link from 'next/link';
import useStyles from '@core_modules/home/pages/default/components/style';
import Image from '@core_modules/home/pages/default/components/FeaturedProducts/Image';

const MobileView = ({
    products, url_path, category_image, name, right = false, t, id, ...other
}) => {
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const { categoryList } = modules.home;
    const width = desktop ? categoryList.imageSize.desktop.width : categoryList.imageSize.mobile.width;
    const height = desktop ? categoryList.imageSize.desktop.height : categoryList.imageSize.mobile.height;
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
    };
    return (
        <div className={classNames('col-xs-12 row', styles.features)}>
            <div className={classNames('col-xs-12')}>
                <div className={styles.labelCategory}>
                    <Link href="/[...slug]" as={`/${url_path}`}>
                        <a onClick={() => handleClick(`/${url_path}`)}>
                            <Typography letter="capitalize" type="bold" variant="h1" align="center">
                                {name || ''}
                            </Typography>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={classNames('col-xs-12 row between-lg', styles.featuresBox, right ? 'reverse' : '')}>
                <div
                    className={classNames(
                        category_image ? 'col-xs-12 col-sm-12 col-lg-4' : 'hidden-mobile hidden-desktop',
                        styles.imgFeaturedContainer,
                    )}
                >
                    {category_image ? (
                        <div className={styles.imgFeaturedItem}>
                            <Link href="/[...slug]" as={`/${url_path}`}>
                                <a onClick={() => handleClick(`/${url_path}`)} style={{ width: '100%' }}>
                                    <Image name={name} src={category_image} width={width} height={height} />
                                </a>
                            </Link>
                        </div>
                    ) : null}
                </div>
                <div className={classNames('col-xs-12 col-sm-12', category_image ? 'col-lg-8' : '')}>
                    <div className={classNames('row center-xs', styles.contentFeatured)}>
                        <div className={classNames('col-xs-12', styles.contentMobileFeatured)}>
                            <Carousel
                                data={products}
                                showArrow={desktop}
                                slideLg={category_image ? 4 : 6}
                                Item={ProductItem}
                                enableAddToCart={false}
                                enableQuickView={false}
                                {...other}
                            />
                        </div>
                        <div className={classNames('col-xs-12')}>
                            <div className={styles.footerFeatured}>
                                <Button variant="outlined" onClick={() => handleClick(`/${url_path}`)} className={styles.buttonViewAllHome}>
                                    <Link href="/[...slug]" as={`/${url_path}`}>
                                        <a>
                                            <Typography type="bold" variant="span" letter="uppercase">
                                                {t('common:button:viewAll')}
                                            </Typography>
                                        </a>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedView = ({ data = [], t, ...other }) => {
    const styles = useStyles();
    return (
        <div className={classNames('row center-xs', styles.contentContainer, 'hide')} id="home-featured">
            {data.map((category, i) => {
                const products = category.products.items.map((product) => ({
                    ...product,
                    name: product.name,
                    url: product.url_key,
                    imageSrc: product.small_image.url,
                    price: product.price_range.minimum_price.regular_price.value,
                }));
                return (
                    <MobileView
                        key={i}
                        url_path={category.url_path}
                        products={products}
                        category_image={category.image_path}
                        name={category.name}
                        id={category.id}
                        right={(i + 1) % 2 === 0}
                        t={t}
                        {...other}
                    />
                );
            })}
        </div>
    );
};

export default FeaturedView;
