import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import classNames from 'classnames';
import Router from 'next/router';
import useStyles from '@common_button/style';

const CustomButton = ({
    rootClassName = '',
    className = {},
    variant = 'contained',
    color = 'primary',
    children,
    disabled = false,
    fullWidth = false,
    onClick = () => { },
    loading = false,
    customRootStyle = {},
    href = null,
    align = 'center',
    ...other
}) => {
    const styles = useStyles();
    let customClass = classNames(
        styles.container,
        fullWidth && styles.fullWidth,
    );
    if (className && className !== '') {
        customClass = classNames(className, fullWidth && styles.fullWidth);
    }
    const rootClass = classNames(
        styles.loadRoot,
        styles[`${align}Align`],
        rootClassName,
    );
    return (
        <div className={rootClass} style={customRootStyle}>
            <div className={styles.wrapper}>
                <Button
                    onClick={
                        href !== '' && href ? () => Router.push(href) : onClick
                    }
                    variant={variant}
                    color={color}
                    className={customClass}
                    disabled={disabled || loading}
                    {...other}
                    href={null}
                >
                    {children}
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={styles.buttonProgress}
                        />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default CustomButton;
