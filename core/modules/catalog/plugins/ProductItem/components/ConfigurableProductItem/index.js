import ProductByVariant, {
    generateValue,
    generateAvailableCombination,
    handleSelected,
} from '@helper_productbyvariant';

const ConfigurableOpt = (props) => {
    const {
        variants = [], configurable_options = [], setSpesificProduct,
        ConfigurableView,
    } = props;

    const [firstSelected, setFirstSelected] = React.useState({});
    const [combination, setCombination] = React.useState({});
    const [options, setOptions] = React.useState([]);
    const [selectConfigurable, setSelectConfigurable] = React.useState({});

    const handleSelect = async (value, key) => {
        const selectedOption = handleSelected(selectConfigurable, key, value);

        const comb = configurable_options && variants && generateAvailableCombination(selectedOption, {
            configurable_options,
            variants,
        });
        setCombination({ ...comb });
        setSelectConfigurable({
            ...selectedOption,
        });
        const product = await ProductByVariant(selectedOption, variants);
        setSpesificProduct({ ...product });

        firstSelected.code = key;
        firstSelected.value = value;
        await setFirstSelected({ ...firstSelected });
    };

    React.useEffect(() => {
        if (configurable_options && options.length === 0) {
            const op = generateValue(selectConfigurable, configurable_options, combination);
            setOptions(op);
        }
    }, []);

    React.useMemo(() => {
        if (configurable_options) {
            const op = generateValue(selectConfigurable, configurable_options, combination);
            setOptions(op);
        }
    }, [selectConfigurable]);

    return (
        <>
            { options.map((data, index) => (
                <ConfigurableView
                    key={index}
                    option={data.options}
                    selected={selectConfigurable}
                    value={data.value}
                    handleSelect={handleSelect}
                />
            ))}
        </>
    );
};

export default ConfigurableOpt;
