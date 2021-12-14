import React from 'react';
import CheckBox from '@common_checkbox';
import Typography from '@common_typography';

const ViewCustomizableMultipleOption = ({
    title = 'test', data = [], selected = [], disabled,
    onChange = () => {}, error = '', required = false,
}) => (
    <div className="column">
        {
            data && data.length > 0 && (
                <>
                    <Typography variant="label" type="bold" letter="uppercase">
                        {title.replace(/_/g, ' ')}
                        {' '}
                        {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                    </Typography>
                    <CheckBox
                        name={title}
                        label={title}
                        noLabel
                        data={data}
                        value={selected || []}
                        flex="column"
                        onChange={onChange}
                        disabled={disabled}
                    />
                </>
            )
        }
        {
            error && error !== '' && (
                <Typography color="red">{error}</Typography>
            )
        }
    </div>
);

export default ViewCustomizableMultipleOption;
