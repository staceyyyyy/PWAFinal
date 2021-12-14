import Typography from '@common_typography';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import useStyles from '@common_carousel/style';

const Caraousel = ({
    data = [1, 2, 3], title = '', className = '', storeConfig, item, customSlideClass,
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
                <Typography align="center" letter="uppercase" type="bold" variant="span" className={styles.title}>
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
                {data.map((val, y) => item({
                    ...val,
                    storeConfig,
                    key: y,
                }))}
            </SwipeableViews>
        </div>
    );
};

export default Caraousel;
