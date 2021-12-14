import Badge from '@material-ui/core/Badge';
import LocalMall from '@material-ui/icons/LocalMall';

const WithoutLink = ({ cartData = 0 }) => (
    <Badge color="secondary" badgeContent={cartData || 0}>
        <LocalMall color="secondary" />
    </Badge>
);

export default WithoutLink;
