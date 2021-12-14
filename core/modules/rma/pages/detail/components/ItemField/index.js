/* eslint-disable jsx-a11y/anchor-is-valid */

const ItemField = ({
    onSelect = () => {},
    item,
    errorForm = false,
    fieldValue = [''],
    ItemFieldView,
    ...other
}) => {
    const [select, setSelect] = React.useState(fieldValue[0].value || '');
    const handleSelect = (event) => {
        setSelect(event.target.value);
        onSelect({
            field_id: item.id,
            value: event.target.value,
        });
    };
    let error = false;
    if (errorForm && item.is_required) {
        if (select === '' || select.length === 0) error = true;
    }
    return (
        <ItemFieldView
            error={error}
            select={select}
            handleSelect={handleSelect}
            fieldValue={fieldValue}
            item={item}
            {...other}
        />
    );
};

export default ItemField;
