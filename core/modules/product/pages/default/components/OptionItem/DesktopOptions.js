import { modules } from '@config';
import ConfigurableOption from '@plugin_optionitem/ConfigurableOption';
import SimpleOption from '@plugin_optionitem/SimpleProduct';
import VirtualOption from '@plugin_optionitem/Virtual';
import DownloadOption from '@plugin_optionitem/Download';
import BundleOption from '@plugin_optionitem/BundleOption';
import GroupedOption from '@plugin_optionitem/GroupedProduct';
import AwGiftCardProduct from '@plugin_optionitem/AwGiftCardProduct';
import CustomizableOption from '@plugin_customizableitem';

const Options = (props) => {
    const {
        data, price, customizableOptions, setCustomizableOptions,
        errorCustomizableOptions, additionalPrice, setAdditionalPrice,
    } = props;
    const { __typename } = data;
    return (
        <>
            { modules.product.customizableOptions.enabled && (
                <CustomizableOption
                    {...data}
                    price={price}
                    showCustomizableOption
                    customizableOptions={customizableOptions}
                    setCustomizableOptions={setCustomizableOptions}
                    errorCustomizableOptions={errorCustomizableOptions}
                    additionalPrice={additionalPrice}
                    setAdditionalPrice={setAdditionalPrice}
                />
            ) }
            {__typename === 'ConfigurableProduct' && (
                <ConfigurableOption
                    {...props}
                />
            )}

            {__typename === 'SimpleProduct' && (
                <SimpleOption
                    {...props}
                />
            )}

            {__typename === 'VirtualProduct' && (
                <VirtualOption
                    {...props}
                />
            )}

            {__typename === 'BundleProduct' && (
                <BundleOption
                    {...props}
                />
            )}
            {__typename === 'DownloadableProduct' && (
                <DownloadOption
                    {...props}
                />
            )}

            {__typename === 'GroupedProduct' && (
                <GroupedOption
                    {...props}
                />
            )}
            {__typename === 'AwGiftCardProduct' && (
                <AwGiftCardProduct {...props} />
            )}
        </>
    );
};

export default Options;
