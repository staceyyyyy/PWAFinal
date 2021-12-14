/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { formatPrice } from '@helper_currency';
import useStyles from '../../style';

const Multiple = ({ data, options = [], selectOptions }) => {
    const styles = useStyles();
    const defaultValue = [];
    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (element.is_default) {
            defaultValue.push(element.id);
        }
    }
    return (
        <FormControl className={styles.selectItem}>
            <Select
                multiple
                native
                value={defaultValue}
                onChange={(e) => selectOptions(data, parseInt(e.target.value))}
                inputProps={{
                    id: 'select-multiple-native',
                }}
            >
                {options.map((val, idx) => (
                    <option
                        key={idx}
                        value={val.id}
                        dangerouslySetInnerHTML={{
                            __html: `${val.label} + <b>${formatPrice(val.product.price_range.minimum_price.final_price.value,
                                val.product.price_range.minimum_price.final_price.currency)}</b>`,
                        }}
                    />
                ))}
            </Select>
        </FormControl>
    );
};

export default Multiple;
