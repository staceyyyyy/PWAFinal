import ConfigurableOption from '@plugin_optionitem/ConfigurableOption';
import SimpleOption from '@plugin_optionitem/SimpleProduct';
import VirtualOption from '@plugin_optionitem/Virtual';
import DownloadOption from '@plugin_optionitem/Download';
import BundleOption from '@plugin_optionitem/BundleOption';

const OptionItem = (props) => {
    const {
        data, enableConfigurable = true, enableSimple = true,
        enableVirtual = true, enableDownload = true, enableBundle = true,
    } = props;
    const { __typename } = data;
    return (
        <>
            {enableConfigurable && __typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {enableSimple && __typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {enableVirtual && __typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {enableDownload && __typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {enableBundle && __typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}
        </>
    );
};

export default OptionItem;
