/* eslint-disable no-nested-ternary */
import Link from 'next/link';
import useStyles from '@plugin_rewardpointinfo/views/style';

const InfoTemplate = ({
    t, data, loading, error,
}) => {
    const styles = useStyles();
    return (
        <Link href="/aw_rewardpoints/info">
            <a>
                <div className={styles.account_point}>
                    <p className={styles.account_point_title}>{t('customer:menu:myPoint')}</p>
                    <h3 className={styles.account_point_summary}>
                        {loading || !data ? 'Loading ...' : error ? 0 : data.customerRewardPoints.balance}
                    </h3>
                </div>
            </a>
        </Link>
    );
};

export default InfoTemplate;
