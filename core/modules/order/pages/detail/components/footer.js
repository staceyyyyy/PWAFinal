import Button from '@common_button';
import Typography from '@common_typography';
import Router from 'next/router';
import useStyles from '@core_modules/order/pages/detail/style';

const Footer = ({ t, detail }) => {
    const styles = useStyles();
    return (
        <div className={styles.footer}>
            {
                (detail[0].detail[0].aw_rma && detail[0].detail[0].aw_rma.status)
                    && (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => Router.push(
                                '/rma/customer/new/order_id/[id]',
                                `/rma/customer/new/order_id/${detail[0].order_number}`,
                            )}
                        >
                            <Typography variant="span" type="bold" letter="uppercase">{t('order:return')}</Typography>
                        </Button>
                    )
            }
        </div>
    );
};

export default Footer;
