import React from 'react';
import classNames from 'classnames';
import useStyles from '@plugin_productitem/components/WeltpixelLabel/style';

const WeltpixelLabelView = (props) => {
    const {
        data = [], onDetailProduct, withThumbnailProduct, categoryLabel,
    } = props;
    const styles = useStyles();
    const styleWithThumbnailProduct = (item) => {
        if (withThumbnailProduct) {
            if (item.position === 1 || item.position === 4 || item.position === 7) {
                return styles.withThumbnailProduct;
            }
            if (item.position === 3 || item.position === 6 || item.position === 9) {
                return styles.withThumbnailProductRight;
            }
        } else if (!categoryLabel && (item.position === 3 || item.position === 6 || item.position === 9)) {
            return styles.productRight;
        }
        return '';
    };
    const styleTopSmallDevice = (item) => {
        if (item.position === 1 || item.position === 2 || item.position === 3) {
            return styles.topSmall;
        }
        return '';
    };
    return (
        <>
            {
                data && data.length > 0 && data.map((item, key) => (
                    <div
                        key={key}
                        className={
                            classNames(
                                'text-container',
                                styles[item.position],
                                styleTopSmallDevice(item),
                                styleWithThumbnailProduct(item),
                                ((item.position === 10 && !onDetailProduct) || item.disabled) ? 'hide' : '',
                            )
                        }
                    >
                        {
                            item.image
                                ? (<img src={item.image} alt={item.text} />)
                                : (<p className="text-label">{item.text}</p>)
                        }
                        <style jsx>
                            {`
                                .text-container {
                                    ${item.css}
                                    background: ${item.image ? 'transparent' : item.text_bg_color};
                                    overflow: auto;
                                    display: table;              
                                    padding: ${item.text_padding};
                                }

                                .text-container img {
                                    max-width: ${categoryLabel ? '3.5em' : '5em'};
                                }

                                @media screen and (min-width: 768px) {
                                    .text-container img {
                                        max-width: ${categoryLabel ? '3.5em' : '8em'};
                                    }
                                  }

                                .text-label {
                                    display: table-row;                      
                                    font-size: ${item.text_font_size};
                                    color: ${item.text_font_color};
                                }
                              

                            `}
                        </style>
                    </div>
                ))
            }
        </>
    );
};

export default WeltpixelLabelView;
