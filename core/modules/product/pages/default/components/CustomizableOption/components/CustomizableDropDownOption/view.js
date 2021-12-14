import React from 'react';
import Typography from '@common_typography';
import Select from '@common_select';

const ViewCustomizableDropDownOption = ({
    title = 'test', data = [], selected = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => (
    <div className="column customizable-container">
        {
            data && data.length > 0 && (
                <Select
                    disabled={disabled}
                    options={data}
                    name={title}
                    label={(
                        <>
                            <Typography variant="title" type="bold" letter="uppercase">
                                {title.replace(/_/g, ' ')}
                                {' '}
                                {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                            </Typography>
                        </>
                    )}
                    value={selected}
                    onChange={onChange}
                    error={error}
                    errorMessage={error}
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

export default ViewCustomizableDropDownOption;
