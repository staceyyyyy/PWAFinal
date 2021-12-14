/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Router from 'next/router';

const Content = ({ withLink, totalUnread }) => (
    <div
        style={{ margin: 20, cursor: 'pointer' }}
        onClick={() => {
            if (withLink) {
                Router.push('/inboxnotification/notification');
            }
        }}
    >
        <Badge color="secondary" badgeContent={totalUnread || 0}>
            <NotificationsIcon color="secondary" />
        </Badge>
    </div>
);

export default Content;
