import makeStyles from '@material-ui/core/styles/makeStyles';

const configStyleContainer = {
    position: 'relative',
    width: '100%',
    '& label': {
        position: 'relative',
        transform: 'unset',
        '& > *': {
            fontSize: '12px',
            lineHeight: '14px',
            padding: 0,
            margin: 0,
        },
    },
    '& label + *': {
        marginTop: 0,
    },
    '& div.checkbox-container': {
        justifyContent: 'flex-start',
        overflow: 'initial',
        '& > label': {
            margin: 'auto 0',
        },
    },
};

export default makeStyles(() => ({
    container: {
        width: '100%',
    },
    customizableArea: {
        ...configStyleContainer,
        '& .customizableArea': {
            maxHeight: '100%',
        },
    },
    customizableCheckboxOption: {
        ...configStyleContainer,
    },
    customizableDateOption: {
        ...configStyleContainer,
    },
    customizableDropDownOption: {
        ...configStyleContainer,
    },
    customizableFieldOption: {
        ...configStyleContainer,
    },
    customizableFileOption: {
        ...configStyleContainer,
    },
    customizableMultipleOption: {
        ...configStyleContainer,
    },
    customizableRadioOption: {
        ...configStyleContainer,
    },
}));
