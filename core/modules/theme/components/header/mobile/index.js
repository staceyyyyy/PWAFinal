/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Typography from '@common_typography';
import propTypes from 'prop-types';
import useStyles from '@core_modules/theme/components/header/mobile/style';
import { getAppEnv } from '@root/core/helpers/env';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';

const Header = ({
    LeftComponent,
    CenterComponent,
    RightComponent,
    className,
    pageConfig,
}) => {
    const styles = useStyles();
    const router = useRouter();
    const back = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else if (sessionStorage.getItem('prevUrl') === '/') {
            router.push('/');
        } else {
            router.back();
        }
    };

    if (pageConfig && !pageConfig.header) return null;

    const position = pageConfig && pageConfig.header === 'absolute'
        ? styles.headerAbsolute
        : styles.headerRelative;

    const containerStyle = classNames(styles.container, position, className);
    return (
        <div className={containerStyle}>
            <div className={styles.leftContainer}>
                {React.isValidElement(LeftComponent) ? (
                    LeftComponent
                ) : (
                    <Button
                        onClick={
                            (LeftComponent
                                && LeftComponent.onClick
                                && LeftComponent.onClick)
                            || back
                        }
                        className={styles.btnBack}
                    >
                        {pageConfig.headerBackIcon && pageConfig.headerBackIcon === 'close' ? (
                            <CloseIcon className={styles.backIcon} />
                        ) : (
                            <ArrowBack className={styles.backIcon} />
                        )}
                    </Button>
                )}
            </div>
            <div className={styles.centerContainer}>
                {React.isValidElement(CenterComponent) ? (
                    CenterComponent
                ) : (
                    <>
                        {pageConfig.headerTitle ? (
                            <Typography
                                variant="h1"
                                type="bold"
                                letter="uppercase"
                                align="center"
                                className={styles.title}
                            >
                                {pageConfig.headerTitle}
                            </Typography>
                        ) : null}
                    </>
                )}
            </div>
            <div className={styles.rightContainer}>
                {React.isValidElement(RightComponent) ? RightComponent : null}
            </div>
        </div>
    );
};

Header.propTypes = {
    LeftComponent: propTypes.any,
    CenterComponent: propTypes.any,
    RightComponent: propTypes.any,
    className: propTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    pageConfig: propTypes.object,
};

Header.defaultProps = {
    LeftComponent: null,
    CenterComponent: null,
    RightComponent: null,
    className: '',
    pageConfig: {
        header: 'relative',
    },
};

export default Header;
