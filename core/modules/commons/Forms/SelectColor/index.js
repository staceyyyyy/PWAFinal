/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import useStyles from '@common_forms/SelectColor/style';

const SelectColor = (props) => {
    const {
        value, selected, onChange, className = '', disabled = false,
    } = props;
    const styles = useStyles();
    const containerStyle = selected && !disabled
        ? classNames(
            styles.container,
            value.toLowerCase() === 'black' || value.toLowerCase() === '#000000' ? styles.borderedSecondary : styles.bordered,
            className,
        )
        : classNames(styles.container, className);
    const customStyle = {
        backgroundColor: value,
    };
    const handleChange = () => {
        // eslint-disable-next-line no-unused-expressions
        !disabled && onChange(value);
    };
    return (
        <div className={containerStyle} style={customStyle} onClick={handleChange}>
            {disabled ? <div className={styles.disabledBox} /> : null}
        </div>
    );
};

export default SelectColor;
