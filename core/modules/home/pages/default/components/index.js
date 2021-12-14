/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */

import { modules } from '@config';
import dynamic from 'next/dynamic';
import useStyles from '@core_modules/home/pages/default/components/style';
import classNames from 'classnames';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'));
const FeaturedProducts = dynamic(() => import('@core_modules/home/pages/default/components/FeaturedProducts'));
const CategoryList = dynamic(() => import('@core_modules/home/pages/default/components/CategoryList'));

const Content = (props) => {
    const styles = useStyles();
    const {
        BannerSliderSkeleton, BannerView, FeaturedSkeleton, FeaturedView, CategoryListSkeleton, CategoryListView, CmsPage, ...other
    } = props;
    const { useCmsPage } = modules.home;
    const logoUrl = `${props.storeConfig.secure_base_media_url}logo/${props.storeConfig.header_logo_src}`;

    let content = (
        <>
            <BannerSlider BannerSliderSkeleton={BannerSliderSkeleton} BannerView={BannerView} {...other} />
            <FeaturedProducts FeaturedView={FeaturedView} FeaturedSkeleton={FeaturedSkeleton} {...other} />
            <CategoryList CategoryListSkeleton={CategoryListSkeleton} CategoryListView={CategoryListView} {...other} />
        </>
    );

    if (useCmsPage.enable) {
        content = (
            <>
                <CmsPage onlyCms slug={[useCmsPage.identifier]} withLayoutHeader={false} withLayoutFooter={false} withCmsTitle={false} {...other} />
            </>
        );
    }

    return (
        <div className={styles.container}>
            <div className={classNames(styles.header)}>
                <div className={classNames(styles.logo, 'hidden-desktop')}>
                    <img src={logoUrl} alt="logo" className={styles.imgLogo} />
                </div>
            </div>
            {content}
        </div>
    );
};

export default Content;
