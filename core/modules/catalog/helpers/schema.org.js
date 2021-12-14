/* eslint-disable no-plusplus */
import { getHost } from '@helper_config';

const generate = (category, storeConfig) => {
    const itemList = [
        {
            '@type': 'ListItem',
            position: 1,
            item: {
                '@id': `${getHost()}/`,
                name: 'Home',
            },
        },
    ];
    if (category.breadcrumbs) {
        for (let index = 0; index < category.breadcrumbs.length; index++) {
            itemList.push({
                '@type': 'ListItem',
                position: index + 2,
                item: {
                    '@id': `${getHost()}/${category.breadcrumbs[index].category_url_path}`,
                    name: category.breadcrumbs[index].category_name,
                },
            });
        }
    }

    itemList.push({
        '@type': 'ListItem',
        position: category.breadcrumbs ? category.breadcrumbs.length + 2 : 2,
        item: {
            '@id': `${getHost()}/${category.url_path}`,
            name: category.name,
        },
    });
    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: itemList,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];
    return schemaOrg;
};

export default generate;
