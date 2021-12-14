import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/trackingorder/pages/default/components/style';

const SkeleteonTracking = () => {
    const styles = useStyles();
    return (
        <table style={{ width: '100%', padding: '0 20px' }}>
            <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <tr key={i}>
                        <td className={styles.tColContent} style={{ width: '50%' }}><Skeleton variant="text" /></td>
                        <td className={styles.tColContent} style={{ width: '2%' }} />
                        <td className={styles.tColContent}><Skeleton variant="text" /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SkeleteonTracking;
