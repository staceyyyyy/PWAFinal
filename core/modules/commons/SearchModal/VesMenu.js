/* eslint-disable react/no-danger */
import React from 'react';
import Typography from '@common_typography';
import Button from '@common_button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ArrowBack from '@material-ui/icons/ArrowBack';
import useStyles from '@common_searchmodal/style';

const SubCategory = ({
    openSub, data, handleClickMenu, handleOpenSub,
    historyData, historyPosition, onBackHistory, back,
}) => {
    const styles = useStyles();
    return (
        <Slide
            direction={back ? 'right' : 'left'}
            in={!openSub}
            timeout={400}
            mountOnEnter
            unmountOnExit
        >
            <div className={styles.body}>
                <div className={styles.item}>
                    {data
                        ? data.map((catlvl1, index) => {
                            const renderMenu = () => (
                                <div key={index} className="column">
                                    <Button
                                        fullWidth
                                        variant="text"
                                        onClick={() => handleClickMenu(catlvl1)}
                                    >
                                        <Typography variant="label" size="14" letter="uppercase" type="bold" align="center">
                                            <div dangerouslySetInnerHTML={{ __html: catlvl1.name }} />
                                        </Typography>
                                    </Button>
                                    {catlvl1.children.map((catlvl2, indx) => (
                                        <Button
                                            key={indx}
                                            fullWidth
                                            variant="text"
                                            onClick={() => handleOpenSub(catlvl2)}
                                            className={indx === catlvl1.children.length - 1 ? styles.lastCat : styles.cat}
                                        >
                                            <Typography
                                                variant="span"
                                                letter="capitalize"
                                                size="14"
                                                align="center"
                                                color="default"
                                            >
                                                <div dangerouslySetInnerHTML={{ __html: catlvl2.name }} />
                                            </Typography>
                                        </Button>
                                    ))}
                                </div>
                            );
                            if (catlvl1.link !== null && !catlvl1.link.includes('storelocator')) {
                                return renderMenu();
                            }

                            if (catlvl1.link === null) {
                                return renderMenu();
                            }
                            return null;
                        })
                        : null}
                </div>
                {
                    (historyPosition > 0 && historyData.length > 1) && (
                        <IconButton onClick={onBackHistory}>
                            <ArrowBack />
                        </IconButton>
                    )
                }
            </div>
        </Slide>
    );
};

export default SubCategory;
