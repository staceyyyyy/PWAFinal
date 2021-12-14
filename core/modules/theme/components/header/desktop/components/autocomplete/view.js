/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import { formatPrice } from '@helper_currency';
import useStyles from '@core_modules/theme/components/header/desktop/components/autocomplete/style';

const OptionsItem = (props) => {
    const styles = useStyles();
    const {
        name, type, position, small_image, price_range, breadcrumbs,
    } = props;
    let breadcrumbsText = '';
    if (breadcrumbs) {
        for (let i = 0; i < breadcrumbs.length; i++) {
            const element = breadcrumbs[i];
            breadcrumbsText += `${element.category_name} > `;
        }
    }
    return (
        <>
            {type === 'product' ? (
                <div className={position === 0 ? classNames(styles.listContainer, styles.firstListContainer) : styles.listContainer}>
                    {position === 0
                        ? (
                            <div className={styles.topTitle}>
                                Product
                            </div>
                        )
                        : null}

                    <div className={styles.imageContainer}>
                        <img
                            className={styles.img}
                            src={small_image.url}
                        />
                    </div>
                    <div className={styles.title}>
                        {name}
                    </div>
                    <div className={styles.price}>
                        {formatPrice(price_range.minimum_price.final_price.value, price_range.minimum_price.final_price.currency)}
                    </div>
                </div>
            ) : null}
            {type === 'category' ? (
                <div className={styles.listContainerCategory}>
                    {position === 0
                        ? (
                            <div className={classNames(styles.topTitle, styles.topTitleCategory)}>
                                Categories
                            </div>
                        )
                        : null}

                    <div className={styles.breadcrumbs}>
                        {breadcrumbsText}
                    </div>
                    <div className={styles.titleCategory}>
                        {name}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default OptionsItem;
