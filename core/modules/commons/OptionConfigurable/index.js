/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import Typograpy from '@common_typography';
import { GRAY_PRIMARY, PRIMARY } from '@theme_color';
import useStyles from '@common_optionconfigurable/style';

const SelectOption = (props) => {
    const {
        value, selected, onChange, className = '', disabled = false, thumbnail, content = '',
        labelClassName = '',
    } = props;
    const styles = useStyles();
    const containerStyle = selected && !disabled
        ? classNames(
            styles.container,
            content.toLowerCase() === 'black' || content.toLowerCase() === '#000000' ? styles.borderedSecondary : styles.bordered,
            className,
        )
        : classNames(styles.container, className);
    const labelStyle = selected
        ? classNames(styles.label, styles.labelActive, labelClassName)
        : classNames(styles.label, labelClassName);
    let customStyle = {
        border: `1px solid ${selected ? PRIMARY : GRAY_PRIMARY}`,
    };
    let childContent = <Typograpy className={labelStyle}>{content}</Typograpy>;
    if (content.includes('#')) {
        customStyle = {
            backgroundColor: content,
        };
        if (content === '#ffffff') {
            customStyle.border = `1px solid ${selected ? PRIMARY : GRAY_PRIMARY}`;
        }
        childContent = '';
    }

    if (thumbnail && thumbnail !== '') {
        customStyle = {
            backgroundImage: `url(${thumbnail})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };
        childContent = '';
    }

    if (!content.includes('#') && content.length > 2) {
        const newWidth = ((content.length - 2) * 10) + 30;
        customStyle.width = `${newWidth}px`;
    }

    const handleChange = () => {
        // eslint-disable-next-line no-unused-expressions
        !disabled && onChange(value);
    };
    return (
        <div style={customStyle} className={containerStyle} onClick={handleChange}>
            {disabled ? <div className={styles.disabledBox} /> : childContent}
        </div>
    );
};

export default SelectOption;
