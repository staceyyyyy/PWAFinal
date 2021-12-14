/* eslint-disable jsx-a11y/anchor-is-valid */

const ItemField = ({
    options = [],
    name = 'select',
    label = 'Select',
    onSelect = () => {},
    propsValue = {},
    errorForm = false,
    errorMessage = '',
    required = false,
    t,
    ItemFieldView,
}) => {
    const [select, setSelect] = React.useState('');
    const handleSelect = (event) => {
        setSelect(event.target.value);
        onSelect({
            ...propsValue,
            value: event.target.value,
        });
    };
    let error = false;
    if (errorForm && required) {
        if (select === '' || select.length === 0) error = true;
    }
    return (
        <ItemFieldView
            options={options}
            name={name}
            label={label}
            select={select}
            handleSelect={handleSelect}
            error={error}
            errorMessage={errorMessage}
            t={t}
        />
    );
};

export default ItemField;
