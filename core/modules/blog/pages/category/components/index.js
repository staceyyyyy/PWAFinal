/* eslint-disable no-nested-ternary */
import Button from '@common_button';
import Typography from '@common_typography';
import React from 'react';
import propTypes from 'prop-types';
import Category from '@core_modules/blog/components/Category';

const Content = ({
    t, data, loadMore, loading, handleLoadMore, page, loadCategory,
    ContentCategory, ContentItem, ...other
}) => (
    <div className="row">
        <div className="col-xs-12 col-sm-2">
            <Category t={t} {...other} />
        </div>
        <div className="col-xs-12 col-sm-10">
            {data
                    && data.getBlogByFilter.items.length > 0
                    && data.getBlogByFilter.items.map((blog, index) => <ContentItem key={index} short {...blog} t={t} />)}
            {data && data.getBlogByFilter.total_count > data.getBlogByFilter.items.length && data.getBlogByFilter.total_pages > page && (
                <Button variant="text" onClick={handleLoadMore} disabled={loading || loadMore} fullWidth>
                    <Typography variant="span" type="bold" letter="uppercase" color="gray">
                        {loadMore || loading ? 'Loading ...' : t('blog:loadMore')}
                    </Typography>
                </Button>
            )}
        </div>
    </div>
);

Content.prototype = {
    t: propTypes.func.isRequired,
    data: propTypes.array.isRequired,
    loadMore: propTypes.func.isRequired,
    loading: propTypes.bool.isRequired,
    handleLoadMore: propTypes.func.isRequired,
    page: propTypes.number.isRequired,
    loadCategory: propTypes.any.isRequired,
    ContentItem: propTypes.func.isRequired,
    ContentCategory: propTypes.func.isRequired,
};

export default Content;
