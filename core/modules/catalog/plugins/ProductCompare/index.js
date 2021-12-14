/* eslint-disable react/require-default-props */
import propTypes from 'prop-types';
import Core from '@core_modules/catalog/plugins/ProductCompare/core';
import WihtLinkView from '@core_modules/catalog/plugins/ProductCompare/components/WithLink';

const ShoppingBag = (props) => (
    <Core
        WihtLinkView={WihtLinkView}
        {...props}
    />
);

ShoppingBag.propTypes = {
    withLink: propTypes.bool,
};

export default ShoppingBag;
