/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { formatPrice } from '@helper_currency';
import useStyles from '../../style';

const SelectItem = ({ data, options = [], selectOptions }) => {
    const styles = useStyles();
    let defaultValue = 0;
    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        if (element.is_default) {
            defaultValue = element.id;
        }
    }
    return (
        <FormControl className={styles.selectItem}>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultValue}
                onChange={(e) => selectOptions(data, parseInt(e.target.value))}
            >
                {options.map((val, idx) => (
                    <MenuItem key={idx} value={val.id}>
                        <label
                            className="label-options"
                            dangerouslySetInnerHTML={{
                                __html: `${val.label} + <b>${formatPrice(val.product.price_range.minimum_price.final_price.value,
                                    val.product.price_range.minimum_price.final_price.currency)}</b>`,
                            }}
                        />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectItem;
