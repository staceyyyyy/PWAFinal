/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typograpy from '@common_typography';
import classNames from 'classnames';
import useStyles from '@common_forms/SelectSize/style';

const SelectSize = ({
    selected,
    value = '',
    label = '',
    className = '',
    onChange = () => {},
    disabled = false,
}) => {
    const styles = useStyles();
    const handleChange = () => {
        // eslint-disable-next-line no-unused-expressions
        !disabled && onChange(value);
    };

    const containerStyle = selected && !disabled
        ? classNames(styles.container, styles.active, className)
        : classNames(styles.container, className);
    const labelStyle = selected
        ? classNames(styles.label, styles.labelActive)
        : styles.label;

    return (
        <div className={containerStyle} onClick={handleChange}>
            <Typograpy className={labelStyle}>{label}</Typograpy>
            { disabled && <div className={styles.disabled} /> }
        </div>
    );
};

export default SelectSize;
