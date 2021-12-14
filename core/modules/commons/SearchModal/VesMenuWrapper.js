import { debuging, features } from '@config';
import { useTranslation } from '@i18n';
import Alert from '@material-ui/lab/Alert';
import { getVesMenu } from '@core_modules/theme/services/graphql/index';
import React from 'react';
import Router from 'next/router';
import getPath from '@helper_getpath';
import { setResolver, getResolver } from '@helper_localstorage';
import CategorySkeleton from '@common_searchmodal/CategorySkeleton';
import SubVesMenu from '@common_searchmodal/SubVesMenu';
import VesMenu from '@common_searchmodal/VesMenu';

const CategoryWrapper = ({ handleCloseModal = () => {} }) => {
    // const {
    //     openedCategory, showCat, openSub, slideCat, showSubCat, closeSub,
    // } = props;
    const { t } = useTranslation(['common']);
    const [dataCat, setDataCat] = React.useState(null);
    const [historyData, setHistoryData] = React.useState([]);
    const [historyPosition, setHistoryPosition] = React.useState(-1);
    const [back, setBack] = React.useState(false);

    const {
        loading, data, error, storeConfig,
    } = getVesMenu({
        variables: {
            alias: features.vesMenu.alias,
        },
    });
    const cmsPages = storeConfig && storeConfig.cms_page ? storeConfig.cms_page.split(',') : [];

    React.useMemo(() => {
        if (dataCat === null && !loading && data) {
            setDataCat(data.vesMenu.items);
            setDataCat(data.vesMenu.items);
            setHistoryData([...historyData, data.vesMenu.items]);
            setHistoryPosition(historyPosition + 1);
        }
    });

    const [openSub, setOpenSub] = React.useState(false);
    // const [openCat, setOpenCat] = React.useState(false);
    const [dataSub, setDataSub] = React.useState(null);

    if (loading) return <CategorySkeleton />;
    if (error) {
        return (
            <div>
                <Alert className="m-15" severity="error">
                    {debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                </Alert>
            </div>
        );
    }
    if (!data) {
        return (
            <div>
                <Alert className="m-15" severity="error">
                    {t('common:error:notFound')}
                </Alert>
            </div>
        );
    }

    const handleClickMenu = async (cat) => {
        if (cat.link) {
            handleCloseModal();
            const link = cat.link ? getPath(cat.link) : `/${cat.url_path}`;
            const urlResolver = getResolver();
            if (cat.link_type === 'category_link') {
                urlResolver[link] = {
                    type: 'CATEGORY',
                    id: cat.category_id,
                };
                await setResolver(urlResolver);
                Router.push('/[...slug]', link);
            } else {
                const cms = cmsPages.find((cmsPage) => cmsPage === link.replace('/', ''));
                if (cms) {
                    urlResolver[link] = {
                        type: 'CMS_PAGE',
                    };
                    await setResolver(urlResolver);
                    Router.push('/[...slug]', link);
                } else {
                    Router.push(link);
                }
            }
        }
    };

    const handleOpenCat = (cat) => {
        setBack(false);
        if (cat.children && cat.children.length > 0) {
            setDataCat([cat]);
            setOpenSub(false);
            setHistoryData([...historyData, [cat]]);
            setHistoryPosition(historyPosition + 1);
        } else {
            handleClickMenu(cat);
        }
    };

    const handleOpenSub = (cat) => {
        setBack(false);
        if (cat.children && cat.children.length > 0) {
            setDataSub([cat]);
            setOpenSub(true);
            setHistoryData([...historyData, [cat]]);
            setHistoryPosition(historyPosition + 1);
        } else {
            handleClickMenu(cat);
        }
    };

    const onBackHistory = () => {
        setBack(true);
        const catData = historyData;
        catData.pop();
        if (!openSub) {
            setDataSub(historyData[historyPosition - 1]);
            setOpenSub(true);
            setHistoryPosition(historyPosition - 1);
            setHistoryData(catData);
        } else {
            setDataCat(historyData[historyPosition - 1]);
            setOpenSub(false);
            setHistoryPosition(historyPosition - 1);
            setHistoryData(catData);
        }
    };

    const handleBackSub = () => {
        setBack(true);
        setDataCat(historyData[0]);
        setOpenSub(false);
        setHistoryPosition(0);
        setHistoryData([historyData[0]]);
    };

    return (
        <>
            {!openSub ? (
                <VesMenu
                    handleClickMenu={handleClickMenu}
                    data={dataCat}
                    historyPosition={historyPosition}
                    historyData={historyData}
                    openSub={openSub}
                    onBackHistory={onBackHistory}
                    handleOpenSub={handleOpenSub}
                    back={back}
                />
            ) : (
                <SubVesMenu
                    open={openSub && dataSub !== null}
                    data={dataSub}
                    onBack={handleBackSub}
                    handleOpenCat={handleOpenCat}
                    handleClickMenu={handleClickMenu}
                    back={back}
                />
            )}
        </>
    );
};

export default CategoryWrapper;
