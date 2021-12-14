import Button from '@common_button';
import Header from '@common_headermobile';
import Typography from '@common_typography';
import { modules } from '@config';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Router from 'next/router';
import React from 'react';
import useStyles from '@core_modules/blog/components/Category/components/style';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const ModalCategory = (props) => {
    const {
        open, setOpen, data, t,
    } = props;
    const styles = useStyles();
    const { link } = modules.blog;
    const handleClick = (item) => {
        Router.push(
            link.category.href,
            link.category.as + item.url_key,
        );
        setOpen();
    };
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
                            data.map((item, key) => (
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
            </div>
        </Dialog>
    );
};

export default ModalCategory;
