/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import Dialog from '@material-ui/core/Dialog';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import Router from 'next/router';
import React from 'react';
import useStyles from '@common_searchmodal/SearchDialog/style';

const data = [
    {
        text: 'Shisendo',
        value: 1,
    },
];
const category = [
    {
        text: 'Shirt',
        value: 23,
        cat: 'Top',
    },
    {
        text: 'Shine',
        value: 13,
        cat: 'Accesories',
    },
];

const Transition = React.forwardRef((props, ref) => <Grow ref={ref} {...props} timeout={600} />);

const TextSearch = ({
    text = '', searchValue = '', value = 3, subText = '',
}) => {
    const styles = useStyles();
    const textArray = text.split('');
    const valueArray = searchValue.split('');
    return (
        <div className={styles.textSearch}>
            <div className={styles.textValue}>
                <Typography variant="span" type="bold" letter="capitalize" className={styles.rmMargin}>
                    {valueArray.map((txt, key) => textArray[key])}
                    <Typography variant="span" letter="lowercase" className={styles.rmMargin} type="regular">
                        {textArray.map((txt, idx) => idx >= valueArray.length && txt)}
                    </Typography>
                </Typography>
                <Typography variant="p" type="regular" className={styles.rmMargin}>
                    {subText}
                </Typography>
            </div>
            <Typography variant="p">{value}</Typography>
        </div>
    );
};

const SearchDialog = ({ open, setOpen }) => {
    const { t } = useTranslation(['common']);
    const styles = useStyles();
    const [value, setValue] = React.useState('');
    const classBody = value === '' ? classNames(styles.body, styles.hide) : classNames(styles.body, styles.show);
    const handleSearch = (ev) => {
        if (ev.key === 'Enter') {
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const handleAutoComplete = (event) => {
        setValue(event.target.value);
    };

    return (
        <Dialog fullScreen open={open} TransitionComponent={Transition} onClose={setOpen}>
            <AppBar className={styles.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={setOpen} aria-label="close">
                        <CloseIcon className={styles.iconClose} />
                    </IconButton>
                    <TextField placeholder="Search ..." value={value} onChange={handleAutoComplete} onKeyPress={handleSearch} />
                </Toolbar>
            </AppBar>
            <div className={classBody}>
                <Typography variant="span" type="bold" letter="uppercase" className={styles.title}>
                    {t('common:title:brand')}
                </Typography>
                <div className={styles.result}>
                    {data.map((dt, idx) => (
                        <a
                            key={idx}
                            onClick={() => {
                                Router.push('/product/[id]', `/product/${dt.text.toLowerCase()}`);
                            }}
                        >
                            <TextSearch text={dt.text} searchValue={value} value={dt.value} />
                        </a>
                    ))}
                </div>
                <Typography variant="span" type="bold" letter="uppercase" className={styles.title}>
                    {t('common:title:category')}
                </Typography>
                <div className={styles.result}>
                    {category.map((dt, idx) => (
                        <a key={idx} onClick={() => Router.push('/category/[id]', `/category/${dt.cat.toLowerCase()}`)}>
                            <TextSearch text={dt.text} searchValue={value} value={dt.value} subText={`in ${dt.cat}`} />
                        </a>
                    ))}
                </div>
            </div>
        </Dialog>
    );
};

export default SearchDialog;
