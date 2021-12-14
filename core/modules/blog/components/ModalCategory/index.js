/* eslint-disable consistent-return */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import Typography from '@common_typography';
import Skeleton from '@common_skeleton';
import Button from '@common_button';
import Header from '@common_headermobile';
import Router from 'next/router';
import Alert from '@material-ui/lab/Alert';
import Menu from '@material-ui/icons/Menu';
import { modules } from '@config';
import useStyles from '@core_modules/blog/components/ModalCategory/style';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const CategoryWrapperSkeleteon = () => {
    const SkeletonRect = ({ width }) => (
        <Skeleton
            style={{ alignSelf: 'center', marginBottom: '32px' }}
            variant="rect"
            width={width}
            height={16}
            animation="wave"
        />
    );
    return (
        <div style={{ width: '100%', marginTop: '36px' }}>
            <Grid container direction="column" alignItems="center">
                {[100, 60, 180, 65, 150, 70, 80, 175, 70, 55, 115, 60, 155].map((width, i) => (
                    <SkeletonRect key={i} width={width} />
                ))}
            </Grid>
        </div>
    );
};

const ListCategory = ({ setOpen, t, loadCategory }) => {
    const styles = useStyles();
    const { loading, error, data } = loadCategory;
    const { link } = modules.blog;
    if (loading) return <CategoryWrapperSkeleteon />;
    if (error) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="error">{t('commong:error:fetchError')}</Alert>
            </div>
        );
    }
    if (!data || data.getBlogCategory.data.length === 0) {
        return (
            <div className={styles.divMessage}>
                <Alert className="m-15" severity="warning">{t('common:error:notFound')}</Alert>
            </div>
        );
    }
    if (!loading && data && data.getBlogCategory.data.length > 0) {
        const handleClick = (item) => {
            Router.push(
                link.category.href,
                link.category.as + item.url_key,
            );
            setOpen();
        };
        return (
            <div className={styles.body}>
                <div className={styles.item}>
                    <Button
                        variant="text"
                        onClick={() => Router.push(link.default.href)}
                    >

                        <Typography type="semiBold" variant="title" align="center">
                            All
                        </Typography>
                    </Button>
                    {
                        data.getBlogCategory.data.map((item, key) => (
                            <Button
                                variant="text"
                                onClick={() => handleClick(item)}
                                key={key}
                            >

                                <Typography type="semiBold" variant="title" align="center">
                                    {item.name}
                                </Typography>
                            </Button>
                        ))
                    }
                </div>
            </div>
        );
    }
};

const ModalContent = ({
    open, setOpen, t, ...other
}) => {
    const styles = useStyles();
    return (
        <Dialog
            fullScreen
            open={open}
            TransitionComponent={Transition}
        >
            <div className={styles.container}>
                <Header
                    LeftComponent={{
                        onClick: setOpen,
                    }}
                    pageConfig={{
                        headerTitle: t('common:title:category'),
                        header: 'relative',
                    }}
                />
                {
                    open && (<ListCategory setOpen={setOpen} t={t} {...other} />)
                }
            </div>
        </Dialog>
    );
};

const ModalCategory = ({ t, ...other }) => {
    const styles = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    return (
        <>
            <ModalContent t={t} open={openModal} setOpen={() => setOpenModal(false)} {...other} />
            <div className={styles.btnCategoryContainer}>
                <Button variant="text" customRootStyle={{ width: 'fit-content' }} className={styles.btnFilter} onClick={() => setOpenModal(true)}>
                    <Menu className={styles.iconFilter} />
                </Button>
                <Typography type="bold" variant="span" letter="capitalize">
                    Categories
                </Typography>
            </div>
        </>
    );
};

export default ModalCategory;
