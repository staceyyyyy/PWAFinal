/* eslint-disable no-param-reassign */
import Typography from '@common_typography';
import GridList from '@common_gridlist';
import Link from 'next/link';
import useStyles from '@core_modules/brands/pages/default/components/style';

const Item = (props) => {
    const styles = useStyles();
    const { group, children } = props;
    return (
        <div className={styles.allContainer}>
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
            >
                {group}
                <ul>
                    {children.map((val, idx) => (
                        <li key={idx} className={styles.listBrand}>
                            {val.category_url ? (
                                <Link href="/[...slug]" as={`/${val.category_url.replace('.html', '')}`}>
                                    <a>{val.name}</a>
                                </Link>
                            ) : val.name}

                        </li>
                    ))}
                </ul>
            </Typography>
        </div>
    );
};

const AllBrands = (props) => {
    const { all, t } = props;
    const styles = useStyles();
    return (
        <>
            <Typography
                align="center"
                letter="uppercase"
                type="bold"
                variant="span"
                className={styles.title}
            >
                {t('brands:allBrands')}
            </Typography>
            <GridList
                data={all}
                ItemComponent={Item}
                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
            />
        </>
    );
};

export default AllBrands;
