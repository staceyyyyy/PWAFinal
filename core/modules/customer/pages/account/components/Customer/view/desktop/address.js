/* eslint-disable no-plusplus */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

const generateData = (data, { t, styles }) => (
    <p>
        {data.firstname}
        {' '}
        {data.lastname}
        <br />
        {data.street[0]}
        <br />
        {data.city}
        {', '}
        {data.region.region}
        {', '}
        {data.postcode}
        <br />
        Indonesia
        <br />
        <Link href="/customer/account/address">
            <a className={styles.desktopLink}>{t('customer:address:editTitle')}</a>
        </Link>
    </p>
);

const AddressView = (props) => {
    const { customer, styles, t } = props;
    const { addresses } = customer;
    let defaultShiping = {};
    let defaultBilling = {};
    let defaultAddress = false;

    for (let index = 0; index < addresses.length; index++) {
        const addr = addresses[index];
        if (addr.default_billing && !defaultBilling.id) {
            defaultBilling = addr;
        }

        if (addr.default_shipping && !defaultShiping.id) {
            defaultShiping = addr;
        }

        if (addr.default_billing === true || addr.default_shipping === true) {
            defaultAddress = true;
        }
    }

    return (
        <>
            <h2 className={styles.infoTitle}>
                {t('customer:menu:address')}
                <Link href="/customer/account/address">
                    <a className={styles.desktopLinkHeader}>{t('customer:address:editTitle')}</a>
                </Link>
            </h2>
            <hr />
            {addresses.length > 0 && defaultAddress ? (
                <div className="row">
                    <div className="col-sm-6 col-lg-6">
                        <h3>{t('customer:address:defaultBilling')}</h3>
                        {generateData(defaultBilling, props)}
                    </div>
                    <div className="col-sm-6 col-lg-6">
                        <h3>{t('customer:address:defaultShiping')}</h3>
                        {generateData(defaultShiping, props)}
                    </div>
                </div>
            ) : <div style={{ textAlign: 'center' }}>{t('customer:address:emptyMessage')}</div>}

        </>
    );
};

export default AddressView;
