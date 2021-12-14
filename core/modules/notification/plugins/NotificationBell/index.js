/* eslint-disable react/require-default-props */
import propTypes from 'prop-types';
import Core from '@plugin_notificationbell/core';
import Content from '@plugin_notificationbell/components';

const NotificationBell = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

NotificationBell.propTypes = {
    withLink: propTypes.bool,
};

export default NotificationBell;
