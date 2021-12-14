/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import Slider from '@material-ui/core/Slider';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@common_typography';
import PropTypes from 'prop-types';
import { formatPrice } from '@helper_currency';
import { sliderStyle, useStyles } from '@common_rangeslider/style';

const CustomSlider = withStyles(sliderStyle)(Slider);

let globalTimeout = null;

const RangeSlider = ({
    maxValue = 100,
    onChange = () => {},
    value = [0, 10],
    label = '',
    noLabel = false,
    storeConfig,
}) => {
    const styles = useStyles();
    const [values, setValue] = React.useState(value);
    const handleChange = (event, newValue) => {
        if (globalTimeout) {
            clearTimeout(globalTimeout);
        }
        setValue(newValue);
        globalTimeout = setTimeout(() => {
            onChange(newValue);
        }, 1000);
    };

    return (
        <div className={styles.container}>
            {!noLabel ? (
                <Typography variant="label" type="bold" letter="uppercase">
                    {label}
                </Typography>
            ) : null}

            <div className={styles.spanLabelPrice}>
                <Typography variant="label" type="regular" letter="uppercase">
                    {
                        formatPrice(
                            values[0], storeConfig.base_currency_code,
                        )
                    }
                </Typography>
                <Typography variant="label" type="regular" letter="uppercase">
                    {
                        formatPrice(
                            values[1], storeConfig.base_currency_code,
                        )
                    }
                </Typography>
            </div>
            <CustomSlider
                value={values}
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
