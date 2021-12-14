import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableDateOption = ({
    title = 'test', data = {}, value = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const styles = useStyles();
    const customClass = classNames('column', styles.container, styles.customizableDateOption);
    return (
        <div className={customClass}>
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
                        type="datetime-local"
                    />
                )
            }
        </div>
    );
};

export default ViewCustomizableDateOption;
