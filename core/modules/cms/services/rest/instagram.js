/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import InstagramHelper from '@core_modules/cms/components/cms-renderer/widget-instagram/helpers';

/**
 * get user feed
 * @return {object}
 */
export const getUserFeed = async (username, limitData) => {
    try {
        const res = await InstagramHelper.getFeed(username);
        const media = res.slice(0, limitData);
        return media;
    } catch (error) {
        console.error(error);
    }
};

/**
 * get tag feed
 * @return {object}
 */
export const getTagFeed = async (tagname, limitData) => {
    try {
        const res = await InstagramHelper.getFeedTag(tagname);
        const media = res.slice(0, limitData);
        return media;
    } catch (error) {
        console.error(error);
    }
};
