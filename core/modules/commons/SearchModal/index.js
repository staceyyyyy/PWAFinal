/* eslint-disable no-nested-ternary */
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import { features } from '@config';
import Router from 'next/router';
import React, { useState } from 'react';
import AutoComplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import OptionsItem from '@core_modules/theme/components/header/desktop/components/autocomplete/view';
import CategoryWrapper from '@common_searchmodal/CategoryWrapper';
import VesMenuWrapper from '@common_searchmodal/VesMenuWrapper';
import useStyles from '@common_searchmodal/style';

const Transition = React.forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const SearchPage = (props) => {
    const styles = useStyles();
    const [openedCategory, setOpenedCategory] = useState([]);
    const [showCat, setShowCat] = useState(true);
    const [showSubCat, setShowSubCat] = useState(false);
    const [slideCat, setSlideCat] = useState(false);
    const [value, setValue] = React.useState('');
    const { open } = props;
    const vesMenu = features.vesMenu.enabled;

    const openSub = (cat) => {
        setOpenedCategory([cat]);
        setShowSubCat(true);
        setShowCat(false);
    };

    const closeSub = () => {
        setOpenedCategory([]);
        setShowSubCat(false);
        setShowCat(true);
        setSlideCat(true);
    };

    const handleCloseModal = () => {
        closeSub();
        setSlideCat(false);
        props.setOpenModal(false);
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            handleCloseModal();
            Router.push({
                pathname: '/catalogsearch/result',
                query: { q: value },
            });
        }
    };

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <div className={styles.container}>
                    <AppBar className={styles.appBar}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                onClick={handleCloseModal}
                                aria-label="close"
                            >
                                <ArrowBack className={styles.iconClose} />
                            </IconButton>
                            <AutoComplete
                                setValue={setValue}
                                handleSearch={handleSearch}
                                width="100%"
                                maxHeight="100vh"
                                OptionsItem={OptionsItem}
                            />
                            <IconButton
                                disabled={value === ''}
                                edge="start"
                                onClick={searchByClick}
                                aria-label="close"
                            >
                                <SearchIcon className={styles.iconClose} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {open ? vesMenu ? (
                        <VesMenuWrapper handleCloseModal={handleCloseModal} />
                    ) : (
                        <CategoryWrapper
                            {...props}
                            openedCategory={openedCategory}
                            showCat={showCat}
                            openSub={openSub}
                            slideCat={slideCat}
                            showSubCat={showSubCat}
                            closeSub={closeSub}
                            handleCloseModal={handleCloseModal}
                        />
                    ) : null}
                </div>
            </Dialog>
        </>
    );
};

export default SearchPage;
