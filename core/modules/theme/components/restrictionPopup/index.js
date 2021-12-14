import { useTranslation } from '@i18n';
import Button from '@common_button';
import Typography from '@common_typography';
import Link from 'next/link';

const RestrictionPopup = (props) => {
    const { t } = useTranslation();
    const { handleRestrictionCookies, restrictionStyle } = props;
    const cookiesMessage = t('common:message:restrictionCookies').split('.');
    return (
        <div className={restrictionStyle}>
            <div className="wrapper-text">
                <div className="row">
                    <Typography variant="title" type="semiBold" style={{ fontSize: 12 }}>
                        {`${cookiesMessage[0]}.`}
                    </Typography>
                    <Typography variant="title" style={{ fontSize: 12 }}>
                        {`${cookiesMessage[1]}.`}
                    </Typography>
                    <Typography variant="title" type="semiBold" style={{ cursor: 'pointer', fontSize: 12 }}>
                        <Link href="/privacy-policy-cookie-restriction-mode">
                            {`${cookiesMessage[2]}.`}
                        </Link>
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    align="left"
                    onClick={() => handleRestrictionCookies()}
                    style={
                        {
                            borderRadius: 0,
                            marginTop: '5px',
                            paddingTop: '4px',
                            paddingBottom: '4px',
                            paddingLeft: '8px',
                            paddingRight: '8px',
                        }
                    }
                >
                    <Typography variant="title" type="semiBold" color="white" style={{ fontSize: 14 }}>
                        {t('common:button:allowCookies')}
                    </Typography>
                </Button>
                <style jsx global>
                    {`
                    .wrapper-text{
                        padding: 4px;
                    }
                `}
                </style>
            </div>
        </div>
    );
};

export default RestrictionPopup;
