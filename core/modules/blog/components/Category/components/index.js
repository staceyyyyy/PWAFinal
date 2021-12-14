import Button from '@common_button';
import Typography from '@common_typography';
import Menu from '@material-ui/icons/Menu';
import React from 'react';
import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import { modules } from '@config';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import useStyles from '@core_modules/blog/components/Category/components/style';
import ModalContent from '@core_modules/blog/components/Category/components/ModalCategory';

const ContentCategory = (props) => {
    const { t, data } = props;
    const styles = useStyles();
    const desktop = breakPointsUp('sm');
    const [openModal, setOpenModal] = React.useState(false);
    const { link } = modules.blog;
    const handleClick = (item) => {
        Router.push(
            link.category.href,
            link.category.as + item.url_key,
        );
    };
    return (
        <>
            <ModalContent t={t} open={openModal} setOpen={() => setOpenModal(false)} {...props} />
            {
                desktop ? (
                    <div className={styles.categoryDesktop}>
                        <Button variant="text" className={styles.labelCategory}>
                            <Typography variant="span" letter="uppercase">
                                {t('blog:category')}
                            </Typography>
                        </Button>
                        {
                            data.map((item, key) => (
                                <Button
                                    variant="text"
                                    onClick={() => handleClick(item)}
                                    key={key}
                                >

                                    <Typography variant="span" align="center">
                                        {item.name}
                                    </Typography>
                                </Button>
                            ))
                        }
                        <Divider light className={styles.divider} />
                    </div>
                ) : (
                    <div className={classNames(styles.btnCategoryContainer, 'hidden-desktop')}>
                        <Button
                            variant="text"
                            customRootStyle={{ width: 'fit-content' }}
                            className={styles.btnFilter}
                            onClick={() => setOpenModal(true)}
                        >
                            <Menu className={styles.iconFilter} />
                        </Button>
                        <Typography type="bold" variant="span" letter="capitalize">
                            {t('blog:category')}
                        </Typography>
                    </div>
                )
            }
        </>
    );
};

export default ContentCategory;
