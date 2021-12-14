import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_textfield';

const ViewCustomizableAreaOption = ({
    title = 'test', data = {}, value = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => (
    <div className="column customizable-container">
        {
            data && data.uid && (
                <TextField
                    options={data}
                    name={title}
                    disabled={disabled}
                    label={(
                        <>
                            <Typography variant="title" type="bold" letter="uppercase">
                                {data.label}
                                {' '}
                                {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                            </Typography>
                        </>
                    )}
                    onChange={onChange}
                    value={value}
                    error={error}
                    errorMessage={error}
                    multiline
                    rows={4}
                />
            )
        }
    </div>
);

export default ViewCustomizableAreaOption;
