/* eslint-disable camelcase */
import Typography from '@common_typography';
import formatDate from '@helper_date';
import RatingStar from '@common_ratingstar';
import Avatar from '@core_modules/product/pages/default/components/CustomerReview/avatar';
import useStyles from '@core_modules/product/pages/default/components/CustomerReview/style';

const CustomerReview = (props) => {
    const styles = useStyles();
    const {
        nickname, created_at, detail, ratings,
    } = props;
    const date = created_at || Date.now();
    const valueRate = ratings && ratings.length > 0 && ratings[0].value ? ratings[0].value : 0;
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.customerContainer}>
                    <div className={styles.imgContainer}>
                        <Avatar
                            name={nickname || 'A'}
                            className={styles.imgContainer}
                            size={43}
                            round
                        />
                    </div>
                    <div className={styles.customerProfile}>
                        <Typography
                            variant="span"
                            type="bold"
                            letter="uppercase"
                            className="clear-margin-padding"
                        >
                            {nickname || 'Anonymouse' }
                        </Typography>
                        <Typography
                            type="regular"
                            variant="p"
                            letter="capitalize"
                            className="clear-margin-padding"
                        >
                            {formatDate(date)}
                        </Typography>
                    </div>
                </div>

                <div>
                    <RatingStar value={valueRate} />
                </div>
            </div>
            <div className={styles.content}>
                <Typography variant="p" type="regular" align="left">
                    { detail || '-' }
                </Typography>
            </div>
        </div>
    );
};

export default CustomerReview;
