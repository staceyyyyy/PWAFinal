/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import useStyles from '@common_forms/CheckBoxColor/style';

const CheckboxColor = ({
    label = '',
    value = '',
    dataValues = [],
    onChange = () => {},
}) => {
    const styles = useStyles();
    const checked = dataValues.indexOf(value) !== -1;

    const handleChange = () => {
        onChange(value);
    };

    const containerStyle = checked
        ? classNames(styles.container, styles.active)
        : styles.container;
    const customStyle = {
        backgroundColor: `${label || '#fff'}`,
    };

    return (
        <div
            className={containerStyle}
            onClick={handleChange}
            style={customStyle}
        />
    );
};

export default CheckboxColor;
