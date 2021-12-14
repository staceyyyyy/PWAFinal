import Select from '@common_select';

const ItemFieldView = ({
    options = [],
    name = 'select',
    label = 'Select',
    errorMessage = '',
    t,
    select,
    handleSelect,
    error,
}) => (
    <Select
        options={options}
        name={name}
        label={label}
        value={select}
        onChange={handleSelect}
        error={error}
        errorMessage={errorMessage || t('rma:form:required')}
    />
);

export default ItemFieldView;
