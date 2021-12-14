import Typography from '@common_typography';
import React, { useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Item from '@common_slider/Carousel/Item';
import useStyles from '@common_slider/Carousel/style';

const SwipeableViews = dynamic(() => import('react-swipeable-views'));

const Caraousel = ({
    data = [1, 2, 3],
    title = '',
    className = '',
    storeConfig,
    customItem,
    customSlideClass,
}) => {
    const styles = useStyles();
    const [index, setIndex] = useState(parseInt(data.length / 2, 10));
    let { slideContainer } = styles;

    if (customSlideClass) {
        slideContainer = classNames(styles.slideContainer, customSlideClass);
    }

    return (
        <div className={classNames(styles.container, className)}>
            {title && title !== '' && (
                <Typography
                    align="center"
                    letter="uppercase"
                    type="bold"
                    variant="span"
                    className={styles.title}
                >
                    {title}
                </Typography>
            )}
            <SwipeableViews
                className={styles.caraousel}
                slideClassName={slideContainer}
                index={index}
                onChangeIndex={(i) => setIndex(i)}
                enableMouseEvents
                resistance
            >
                {data.map((item, y) => (
                    customItem ? customItem({
                        ...item,
                        storeConfig,
                        key: y,
                    }) : <Item {...item} key={y} storeConfig={storeConfig} />
                ))}
            </SwipeableViews>
        </div>
    );
};

export default Caraousel;
