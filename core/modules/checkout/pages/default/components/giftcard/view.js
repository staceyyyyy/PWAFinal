import Typography from '@common_typography';
import Chip from '@material-ui/core/Chip';
import useStyles from '@core_modules/checkout/pages/default/components/style';
import FieldPoint from '@core_modules/checkout/components/fieldcode';

const GiftCardView = (props) => {
    const styles = useStyles();
    const {
        handleApplyGift, handleRemoveGift, formik, appliedGiftCards, checkout, giftCards,
    } = props;
    return (
        <>
            <FieldPoint
                id="giftCard"
                name="giftCard"
                placeholder="Gift Card Code"
                action={() => {
                    handleApplyGift();
                }}
                onChange={formik.handleChange}
                value={formik.values.giftCard}
                disabled={checkout.loading.giftCard}
                error={!!formik.errors.giftCard}
                errorMessage={formik.errors.giftCard}
                styles={styles}
                loading={checkout.loading.giftCard}
            />
            {appliedGiftCards.length || giftCards.length ? (
                <div className={styles.giftcardInfoContainer}>
                    {giftCards.length === 0 ? null : (
                        <div>
                            <Typography variant="p" letter="capitalize">
                                Your Gift Card
                            </Typography>
                            <div className={styles.giftCardItemContainer}>
                                {giftCards.map((item, index) => (
                                    <Chip
                                        disabled={checkout.loading.giftCard}
                                        className={styles.giftCard}
                                        key={index}
                                        size="small"
                                        label={item.giftcard_code}
                                        onClick={() => {
                                            handleApplyGift(item.giftcard_code);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {appliedGiftCards.length === 0 ? null : (
                        <div>
                            <Typography variant="p" letter="capitalize">
                                Applied Gift Card
                            </Typography>
                            <div className={styles.giftCardItemContainer}>
                                {appliedGiftCards.map((item, index) => (
                                    <Chip
                                        disabled={checkout.loading.giftCard}
                                        className={styles.giftCard}
                                        color="primary"
                                        key={index}
                                        size="small"
                                        label={item}
                                        onDelete={() => {
                                            handleRemoveGift(item);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </>
    );
};

export default GiftCardView;
