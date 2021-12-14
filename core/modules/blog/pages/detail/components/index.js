import Body from '@core_modules/blog/components/Details';
import Category from '@core_modules/blog/components/Category';
import RelatedProduct from '@core_modules/blog/components/RelatedProduct';
import { DiscussionEmbed } from 'disqus-react';
import { getHost } from '@helpers/config';

const DefaultContent = (props) => {
    const {
        storeConfig, title, url_key, relatedProduct, t,
        limitProduct = 8,
    } = props;
    const url = typeof window !== 'undefined'
        ? window.location.href
        : `${getHost()}/blog/${url_key}`;
    const limit = limitProduct || storeConfig.aw_blog_related_products_products_limit;
    let position = 0;
    const layout = storeConfig.aw_blog_related_products_block_layout === 'slider' ? 1 : 2;
    if (storeConfig.aw_blog_related_products_block_position === 'after_comments') {
        position = 1;
    } else if (storeConfig.aw_blog_related_products_block_position === 'after_post') {
        position = 2;
    }
    return (
        <div className="row">
            <div className="col-xs-12 col-sm-2 hidden-mobile">
                <Category {...props} />
            </div>
            <div className="col-xs-12 col-sm-10 row">
                <div className="col-xs-12 col-md-12">
                    <Body {...props} />
                </div>
                {
                    position !== 0
                    && (
                        <div className={position === 2 ? 'col-xs-12 col-md-12' : 'hidden'}>
                            <RelatedProduct relatedProduct={relatedProduct.slice(0, limit)} t={t} storeConfig={storeConfig} layout={layout} />
                        </div>
                    )
                }
                <div className="col-xs-12 col-md-12 comment-container">
                    {
                        storeConfig.aw_blog_general_comments_enabled && (
                            <DiscussionEmbed
                                shortname={storeConfig.aw_blog_general_disqus_forum_code}
                                config={
                                    {
                                        url,
                                        identifier: url_key,
                                        title,
                                    }
                                }
                            />
                        )
                    }
                </div>
                {
                    position !== 0
                    && (
                        <div className={position === 1 ? 'col-xs-12 col-md-12' : 'hidden'}>
                            <RelatedProduct relatedProduct={relatedProduct.slice(0, limit)} t={t} storeConfig={storeConfig} layout={layout} />
                        </div>
                    )
                }
            </div>
            <style jsx>
                {`
                    .comment-container {
                        padding: 10px 10px 10px 20px;
                    }
                    .hidden {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};

export default DefaultContent;
