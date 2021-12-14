/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBack from '@material-ui/icons/ArrowBack';
import useStyles from '@common_searchmodal/style';

const SubCategory = ({
    open, data, onBack, handleOpenCat, handleClickMenu, back,
}) => {
    const styles = useStyles();
    return (
        <Slide
            direction={back ? 'right' : 'left'}
            in={open}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.body}>
                <Button
                    fullWidth
                    variant="text"
                    onClick={() => handleClickMenu(data[0])}
                >
                    <Typography variant="label" size="14" letter="uppercase" type="bold" align="center">
                        <div dangerouslySetInnerHTML={{ __html: data[0].name }} />
                    </Typography>
                </Button>
                <div className={styles.item}>
                    {data && data[0].children && data[0].children.length > 0
                    && data[0].children.map((item, indx) => (
                        <Button
                            key={indx}
                            fullWidth
                            variant="text"
                            onClick={() => handleOpenCat(item)}
                            className={indx === data[0].children.length - 1 ? styles.lastCat : styles.cat}
                        >
                            <Typography
                                variant="span"
                                letter="capitalize"
                                size="14"
                                align="center"
                            >
                                <div dangerouslySetInnerHTML={{ __html: item.name }} />
                            </Typography>

                        </Button>
                    ))}
                </div>
                <IconButton onClick={() => onBack()}>
                    <ArrowBack />
                </IconButton>
            </div>
        </Slide>
    );
};

export default SubCategory;
