/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import classNames from 'classnames';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import Slider from 'react-slick';
import ImageSlide from '@common_slick/Banner/ImageSlider';
import useStyles from '@common_slick/Banner/style';

const Banner = ({
    data = [],
    height,
    width,
    contentWidth = '',
    autoPlay = true,
    noLink = false,
    showArrow = true,
    speed = 500,
    autoplaySpeed = 4000,
}) => {
    const styles = useStyles();
    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);
    let sliderRef = React.createRef();

    const dotActive = data.length > 1 ? classNames(styles.dotsItem, styles.dotActive) : styles.hide;
    const dotItem = data.length > 1 ? styles.dotsItem : styles.hide;
    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickPrev(data.length - 1);
        } else {
            sliderRef.slickPrev(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: autoPlay,
        speed,
        autoplaySpeed,
        rtl: true,
        arrows: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
    };

    return (
        <div className={styles.caraousel}>
            <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
                {data.map((item, key) => (
                    <ImageSlide height={height} width={width} noLink={noLink} contentWidth={contentWidth} key={key} {...item} />
                ))}
            </Slider>
            {showArrow ? (
                <>
                    <div className={classNames(styles.arrow, styles.leftArrow)} onClick={handleLeftArrow}>
                        <LeftArrowIcon fontSize="inherit" />
                    </div>
                    <div className={classNames(styles.arrow, styles.rightArrow)} onClick={handleRightArrow}>
                        <RightArrowIcon fontSize="inherit" />
                    </div>
                </>
            ) : null}
            <div className={styles.dots}>
                {data.map((item, id) => (
                    /* eslint-disable jsx-a11y/click-events-have-key-events */
                    /* eslint-disable jsx-a11y/no-static-element-interactions */
                    <div className={slideIndex === id ? dotActive : dotItem} key={id} onClick={() => sliderRef.slickGoTo(id)} />
                ))}
            </div>
        </div>
    );
};

export default Banner;
