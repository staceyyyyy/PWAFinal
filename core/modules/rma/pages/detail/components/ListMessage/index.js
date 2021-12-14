import classNames from 'classnames';
import Typography from '@common_typography';
import useStyles from '@core_modules/rma/pages/detail/components/ListMessage/style';

const ListMessage = ({
    data = [],
}) => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {
                    data.map((item, index) => (
                        <li
                            key={index}
                            className={
                                classNames(styles.itemContainer, item.owner_type === 2 ? styles.right : styles.left)
                            }
                        >
                            <div className={styles.bodyItem}>
                                <Typography type="bold">
                                    {item.owner_type === 2 ? `${item.owner_name} (Me)` : '(Customer Service)'}
                                    {' '}
                                    {item.created_at}
                                </Typography>
                                <Typography>
                                    {item.text}
                                </Typography>
                                {
                                    item.attachments.length > 0 && item.attachments.map((file, ind) => (
                                        <a key={ind} href={file.image_url} target="blank">
                                            <Typography decoration="underline">
                                                {file.name}
                                            </Typography>
                                        </a>
                                    ))
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ListMessage;
