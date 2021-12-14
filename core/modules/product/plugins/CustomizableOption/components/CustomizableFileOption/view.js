import React from 'react';
import Typography from '@common_typography';
import DropFile from '@common_dropfile';
import classNames from 'classnames';
import useStyles from '@plugin_customizableitem/components/style';

const ViewCustomizableFileOption = ({
    data = {}, onChange = () => {}, error = '', required = false, t, disabled,
}) => {
    let maxSize = 2000000;
    let acceptedFile = 'image/*';
    const styles = useStyles();
    const customClass = classNames('column', styles.container, styles.customizableFileOption);
    if (data && data.image_size_x && data.image_size_y) {
        maxSize = (data.image_size_x * data.image_size_y) * 3;
    }
    if (data && data.file_extension) {
        acceptedFile = '';
        data.file_extension.split(',').map((ex) => {
            acceptedFile += `.${ex.replace(' ', '')},`;
            return ex;
        });
    }
    return (
        <div className={customClass}>
            {
                data && data.uid && (
                    <>
                        <Typography variant="label" type="bold" letter="uppercase">
                            {data.label}
                            {' '}
                            {required && <Typography color="red" type="bold" variant="label">*</Typography>}
                        </Typography>
                        { !disabled && (
                            <DropFile
                                acceptedFile={acceptedFile}
                                multiple={false}
                                error={error}
                                getBase64={onChange}
                                maxSize={maxSize}
                                maxWidth={data.image_size_x}
                                maxHeight={data.image_size_y}
                                noStyle
                            />
                        ) }
                        {
                            data.file_extension !== '' && (
                                <Typography variant="p">
                                    {t('product:customizableOptions:file:extentionAccept')}
                                    <strong>{data.file_extension}</strong>
                                </Typography>
                            )
                        }
                        {
                            data.image_size_x !== '' && (
                                <Typography variant="p">
                                    {t('product:customizableOptions:file:maxImageWidth')}
                                    <strong>
                                        {data.image_size_x}
                                        {' '}
                                        px
                                    </strong>
                                </Typography>
                            )
                        }
                        {
                            data.image_size_y !== '' && (
                                <Typography variant="p">
                                    {t('product:customizableOptions:file:maxImageHeight')}
                                    <strong>
                                        {data.image_size_y}
                                        {' '}
                                        px
                                    </strong>
                                </Typography>
                            )
                        }
                        {
                            error && error !== '' && (
                                <Typography color="red">{error}</Typography>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default ViewCustomizableFileOption;
