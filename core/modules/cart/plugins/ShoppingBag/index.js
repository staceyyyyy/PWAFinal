/* eslint-disable react/require-default-props */
import propTypes from 'prop-types';
import Core from '@plugin_shoppingbag/core';
import WihtLinkView from '@plugin_shoppingbag/components/WithLink';
import WithoutLinkView from '@plugin_shoppingbag/components/WithoutLink';

const ShoppingBag = (props) => (
    <Core
        WihtLinkView={WihtLinkView}
        WithoutLinkView={WithoutLinkView}
        {...props}
    />
);

ShoppingBag.propTypes = {
    withLink: propTypes.bool,
};

export default ShoppingBag;
