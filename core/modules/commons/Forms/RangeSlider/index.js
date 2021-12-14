/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import Slider from '@material-ui/core/Slider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@common_typography';
import PropTypes from 'prop-types';
import { formatPrice } from '@helper_currency';
import { sliderStyle, useStyles } from '@common_forms/RangeSlider/style';

const CustomSlider = withStyles(sliderStyle)(Slider);

const RangeSlider = ({
    maxValue = 100,
    onChange = () => {},
    value = [0, 10],
    label = '',
}) => {
    const styles = useStyles();
    const handleChange = (event, newValue) => {
        onChange(newValue);
    };

    return (
        <div className={styles.container}>
            <Typography variant="label" type="bold" letter="uppercase">
                {label}
            </Typography>
            <div className={styles.spanLabelPrice}>
                <Typography variant="label" type="regular" letter="uppercase">
                    {
                        formatPrice(
                            value[0], 'IDR',
                        )
                    }
                </Typography>
                <Typography variant="label" type="regular" letter="uppercase">
                    {
                        formatPrice(
                            value[1], 'IDR',
                        )
                    }
                </Typography>
            </div>
            <CustomSlider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-labelledby="range-slider"
                max={maxValue}
            />
        </div>
    );
};

RangeSlider.propTypes = {
    maxValue: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.array,
    label: PropTypes.string,
};

export default RangeSlider;
