import React from 'react';
import Typography from '@common_typography';
import Link from 'next/link';
import useStyles from '@core_modules/rma/pages/new/components/styles';

const OtherRmaLink = ({
    t, other_rma_request,
}) => {
    const styles = useStyles();
    return (
        <div className="column">
            <Typography color="red">{t('rma:otherRequestRma')}</Typography>
            <div className={styles.listOtherRma}>
                {other_rma_request.map((number_rma, indx) => (
                    <Link href="/rma/customer/view/id/[id]" as={`/rma/customer/view/id/${number_rma}`} key={indx}>
                        <a>
                            <Typography type="semiBold">
                                #
                                {number_rma}
                            </Typography>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OtherRmaLink;
