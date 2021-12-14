import Link from 'next/link';
import Button from '@common_button';
import useStyles from '@core_modules/error/pages/default/components/style';

const ErrorContent = (props) => {
    const styles = useStyles();
    const { statusCode, title } = props;

    return (
        <div className={styles.error}>
            <div className={styles.wrapper}>
                {statusCode ? (
                    <h1 className={styles.h1}>{statusCode}</h1>
                ) : null}
                <div className={styles.desc}>
                    <h2 className={styles.h2}>{title}</h2>
                </div>
            </div>
            {statusCode === 404 ? (
                <div className={styles.actions}>
                    <Link href="/">
                        <Button className={styles.toolbarButton}>Back</Button>
                    </Link>
                </div>
            ) : null}
        </div>
    );
};

export default ErrorContent;
