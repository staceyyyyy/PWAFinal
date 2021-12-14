/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-lonely-if */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const filter = createFilterOptions();

// debounced value will change only once every certain delay (ms)
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handleTimeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handleTimeout);
        };
    }, [value]);

    return debouncedValue;
}

const CustomAutocomplete = (props) => {
    const {
        error,
        disableCloseOnSelect,
        getOptions,
        getOptionsVariables,
        getOptionLabel,
        helperText,
        label,
        labelKey,
        loading,
        mode,
        multiple,
        onChange,
        options,
        primaryKey,
        value,
        variant,
        inputLabelProps,
        enableCustom,
        ...others
    } = props;
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState();
    const debouncedQuery = useDebounce(query, 700);
    const prevGetOptionsVariables = usePrevious(getOptionsVariables);
    const [allowGetOptions, setAllowGetOptions] = React.useState(true);

    React.useEffect(() => {
        if (open) {
            if (mode === 'lazy' && allowGetOptions) {
                setAllowGetOptions(false);
                getOptions(getOptionsVariables);
            }
            if (mode === 'server') {
                const variables = {
                    variables: {
                        ...getOptionsVariables.variables,
                        ...(query && { querySearch: query }),
                    },
                };
                getOptions(variables);
            }
        }
    }, [open, debouncedQuery]);

    React.useEffect(() => {
        if (!open) {
            setQuery('');
        }
    }, [open]);

    React.useEffect(() => {
        const prev = JSON.stringify(prevGetOptionsVariables);
        const current = JSON.stringify(getOptionsVariables);
        // need better deep comparison
        // setAllowGetOptions when there is change in getOptionsVariables
        if (prev !== current) setAllowGetOptions(true);
    }, [getOptionsVariables]);

    const renderInput = (params) => (
        <TextField
            {...params}
            label={label}
            variant={variant}
            error={error}
            helperText={helperText}
            InputProps={{
                ...params.InputProps,
                autoComplete: 'no-autocomplete',
                autoCorrect: 'off',
                autoCapitalize: 'none',
                spellCheck: 'false',
                endAdornment: (
                    <>
                        {loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
            InputLabelProps={{
                shrink: true,
                type: 'search',
                ...inputLabelProps,
            }}
            inputProps={{
                ...params.inputProps,
                autoComplete: 'no-autocomplete',
            }}
        />
    );

    return (
        <Autocomplete
            value={multiple ? (value || []) : value}
            open={open}
            getOptionSelected={(option, selectedValue) => option[primaryKey] === selectedValue[primaryKey]}
            getOptionLabel={getOptionLabel || ((option) => {
                if (typeof option === 'string' && enableCustom) {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue && enableCustom) {
                    return option.inputValue;
                }
                // Regular option
                return option[labelKey] || '';
            })}
            multiple={multiple}
            disableCloseOnSelect={disableCloseOnSelect || multiple}
            onChange={(event, newValue) => {
                // onChange(newValue);
                if (typeof newValue === 'string' && enableCustom) {
                    onChange({
                        [labelKey]: newValue,
                    });
                } else if (newValue && newValue.inputValue && enableCustom) {
                    // Create a new value from the user input
                    onChange({
                        [labelKey]: newValue.inputValue,
                    });
                } else {
                    onChange(newValue);
                }
            }}
            filterOptions={(option, params) => {
                const filtered = filter(option, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '' && enableCustom) {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            onInputChange={(e) => setQuery((e && e.target && e.target.value) || '')}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options || []}
            loading={loading}
            renderInput={renderInput}
            freeSolo={enableCustom}
            {...others}
        />
    );
};

CustomAutocomplete.propTypes = {
    enableCustom: PropTypes.bool,
    error: PropTypes.bool,
    inputLabelProps: PropTypes.object,
    disableCloseOnSelect: PropTypes.bool,
    getOptions: PropTypes.func,
    getOptionsVariables: PropTypes.object,
    getOptionLabel: PropTypes.func,
    helperText: PropTypes.string,
    label: PropTypes.string,
    labelKey: PropTypes.string,
    loading: PropTypes.bool,
    mode: PropTypes.oneOf(['default', 'lazy', 'server']),
    multiple: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.array,
    primaryKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    variant: PropTypes.string,
};

CustomAutocomplete.defaultProps = {
    getOptionsVariables: { variables: { pageSize: 20, currentPage: 1 } },
    labelKey: 'name',
    loading: false,
    mode: 'default',
    multiple: false,
    options: [],
    primaryKey: 'id',
    value: null,
    variant: 'standard',
    inputLabelProps: {},
    enableCustom: true,
};

export default CustomAutocomplete;
