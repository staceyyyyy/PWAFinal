/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@common_typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import { setResolver, getResolver } from '@helper_localstorage';
import Router from 'next/router';

const useStyles = makeStyles({
    root: {
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
        marginBottom: 20,
    },
});

const CustomBreadcrumb = ({ data = [], variant = 'text' }) => {
    const handleClick = async (url, id) => {
        const urlResolver = getResolver();
        urlResolver[url] = {
            type: 'CATEGORY',
            id,
        };
        await setResolver(urlResolver);
        Router.push(
            '/[...slug]',
            `${url}`,
        );
    };
    const styles = useStyles();
    return (
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} className={styles.root}>
            <Link color="secondary" onClick={() => Router.push('/')} className={styles.home}>
                <Typography variant="p">Home</Typography>
            </Link>
            {
                variant === 'chip' ? data.map(({
                    label, link, active, id,
                }, index) => (
                    <Link color={active ? 'primary' : 'secondary'} onClick={() => handleClick(link, id)} key={index}>
                        <Chip size="small" label={label} color={active ? 'secondary' : 'default'} />
                    </Link>
                ))
                    : data.map(({
                        label, link, active, id,
                    }, index) => (
                        <Link
                            color={active ? 'primary' : 'secondary'}
                            onClick={index === data.length - 1 ? () => {} : () => handleClick(link, id)}
                            key={index}
                        >
                            <Typography variant="p" type={active ? 'bold' : 'regular'}>{label}</Typography>
                        </Link>
                    ))
            }
        </Breadcrumbs>
    );
};

const BreadcrumbsComp = (props) => (
    <CustomBreadcrumb {...props} />
);

export default BreadcrumbsComp;
