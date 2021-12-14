import React from 'react';
import Radio from '@common_radio';
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableRadioOption = ({
    title = 'test', data = [], selected = [], disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const Label = () => (
        <>
            <Typography variant="label" type="bold" letter="uppercase">
                {title.replace(/_/g, ' ')}
                {' '}
                {required && <Typography color="red" type="bold" variant="label">*</Typography>}
            </Typography>
        </>
    );
    const styles = useStyles();
    const customClass = classNames('column', styles.container, styles.customizableRadioOption);
    return (
        <div className={customClass}>
            {
                data && data.length > 0 && (
                    <Radio
                        name={title}
                        label={title}
                        CustomLabel={Label}
                        valueData={data}
                        value={selected || ''}
                        flex="column"
                        onChange={onChange}
                        disabled={disabled}
                    />
                )
            }
            {
                error && error !== '' && (
                    <Typography color="red">{error}</Typography>
                )
            }
        </div>
    );
};

export default ViewCustomizableRadioOption;
