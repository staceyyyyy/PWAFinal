import { makeStyles } from '@material-ui/core/styles';
import { GRAY_PRIMARY, GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '100%',
        '& h4': {
            fontSize: '16px',
            color: 'black',
        },
        '& ul': {
            'list-style-type': 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .container-footer': {
            display: 'block',
        },
        '& .content-assets': {
            '& .col-sm-3': { flex: 1 },
            '& .col-xs-12': { flex: 1 },
        },
        '& li': {
            'list-style-type': 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .social-icon': {
            padding: '0 6px',
            verticalAlign: 'middle',
            display: 'inline-block',
            '& i': {
                content: '',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                width: 40,
                height: 40,
                display: 'block',
            },

            '& .icon-facebook': {
                backgroundImage: 'url(/assets/img/facebook.png)',
            },
            '& .icon-twitter': {
                backgroundImage: 'url(/assets/img/twitter.png)',
            },
            '& .icon-instagram': {
                backgroundImage: 'url(/assets/img/instagram.png)',
            },
            '& .icon-pinterest': {
                backgroundImage: 'url(/assets/img/pinterest.png)',
            },

        },
    },
    padding_vertical_40: {
        paddingTop: '40px',
        paddingBottom: '40px',
    },
    border_bottom: {
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    background_grey: {
        background: '#f3f3f3',
    },
    account_clearfix: {
        clear: 'both',
        display: 'block',
    },
    account_wishlist_title: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '15px',
    },
    account_wishlist_read_more: {
        paddingRight: '15px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    account_wrapper: {
        background: 'white',
    },
    account_block: {
        display: 'block',
        margin: 'auto',
        textAlign: 'center',
        position: 'relative',
    },
    account_username: {
        margin: 0,
    },
    account_email: {
        margin: 0,
        marginBottom: 15,
    },
    account_point: {
        background: 'black',
        position: 'absolute',
        width: '60%',
        display: 'block',
        margin: 'auto',
        color: 'white',
        left: '20%',
        right: '20%',
        top: '-10%',
    },
    account_point_title: {
        marginBottom: 0,
    },
    account_point_summary: {
        marginTop: 0,
    },
    account_navigation: {
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        padding: 0,
    },
    account_navigation_item: {
        flex: '0 0 auto',
        marginBottom: '10px',
        width: '85%',
    },
    account_navigation_link: {
        color: 'black',
        textTransform: 'uppercase',
        textDecoration: 'none',
        fontSize: 16,
        fontWeight: '700',
    },
    wishlistBlock: {
        background: GRAY_LIGHT,
    },
    margin20: {
        paddingBottom: 20,
    },
    authBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    spanWishlist: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    span: {
        width: '100%',
        height: 20,
        background: GRAY_LIGHT,
    },
    desktopContainer: {
        marginTop: 20,
        paddingLeft: 4,
        '& .notification': {
            '&-list': {
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
    },
    infoTitle: {
        fontWeight: 'normal',
    },
    desktopLink: {
        fontSize: 12,
        textDecoration: 'underline',
    },
    desktopLinkHeader: {
        fontWeight: 'normal',
        fontSize: 12,
        marginLeft: 30,
    },
    reorderButton: {
        fontSize: 12,
        backgroundColor: 'Transparent',
        backgroundRepeat: 'no-repeat',
        border: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        marginLeft: 15,
    },
    logoutBtn: {
        background: '#ce1212',
    },
}));

export default useStyles;
