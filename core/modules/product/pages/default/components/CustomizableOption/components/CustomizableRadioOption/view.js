import React from 'react';
import Radio from '@common_radio';
import Typography from '@common_typography';

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
    return (
        <div className="column customizable-container">
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
