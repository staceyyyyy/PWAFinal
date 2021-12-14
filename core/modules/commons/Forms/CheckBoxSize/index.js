/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typograpy from '@common_typography';
import classNames from 'classnames';
import useStyles from '@common_forms/CheckBoxSize/style';

const CheckBoxSize = ({
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
    const labelStyle = checked
        ? classNames(styles.label, styles.labelActive)
        : styles.label;

    return (
        <div className={containerStyle} onClick={handleChange}>
            <Typograpy className={labelStyle}>{label}</Typograpy>
        </div>
    );
};

export default CheckBoxSize;
