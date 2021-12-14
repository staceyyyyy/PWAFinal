import React from 'react';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableAreaOption = ({
    title = 'test', data = {}, value = '', disabled,
    onChange = () => {}, error = '', required = false,
}) => {
    const styles = useStyles();
    const customClass = classNames('column', styles.container, styles.customizableArea);
    return (
        <div className={customClass}>
            {
                data && data.uid && (
                    <TextField
                        options={data}
                        name={title}
                        label={(
                            <Typography variant="title" type="bold" letter="uppercase">
                                {data.label}
                                {' '}
                                {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                            </Typography>
                        )}
                        className="customizableArea"
                        disabled={disabled}
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
};

export default ViewCustomizableAreaOption;
