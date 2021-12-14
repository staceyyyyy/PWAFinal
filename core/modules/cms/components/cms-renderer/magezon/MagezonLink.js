/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable consistent-return */
/* eslint-disable no-lone-blocks */
import parse from 'html-react-parser';
import { getLink } from '@core_modules/cms/helpers/magezonLinkGenerator';
import React, { memo } from 'react';
import Link from 'next/link';
import { setResolver, getResolver } from '@helper_localstorage';

const DOM_NAME = 'pwalink';

const MagezonLink = (props) => {
    const { link, link_target, children } = props;

    const handleClickProduct = async (url_key, blank) => {
        if (!blank || blank === 0) {
            const urlResolver = getResolver();
            urlResolver[`/${url_key}`] = {
                type: 'PRODUCT',
            };
            await setResolver(urlResolver);
        }
    };

    const handleClickCategory = async (url_path, id, blank) => {
        if (!blank || blank === 0) {
            const urlResolver = getResolver();
            urlResolver[`/${url_path}`] = {
                type: 'CATEGORY',
                id,
            };
            await setResolver(urlResolver);
        }
    };

    const contentLink = getLink(link);
    if (contentLink && contentLink !== '' && contentLink.includes(DOM_NAME)) {
        return parse(contentLink, {
            replace: (domNode) => {
                if (domNode.name === DOM_NAME && domNode.attribs) {
                    const {
                        type, url, title, extra, blank, url_key, url_path, id,
                    } = domNode.attribs;
                    switch (type) {
                    case 'custom':
                        return (
                            <Link
                                href={url}
                                color="inherit"
                                underline="none"
                            >
                                <a target={(blank === true || blank === 'true' ? '_blank' : '_self')} style={{ width: '100%' }}>
                                    { children || title }
                                </a>
                            </Link>
                        );
                    case 'product':
                        return (
                            <Link
                                href="/[...slug]"
                                as={`/${url_key + extra}`}
                                target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                            >
                                <a
                                    target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                    onClick={() => handleClickProduct(url_key, blank)}
                                    style={{ width: '100%' }}
                                >
                                    { children || title }
                                </a>
                            </Link>
                        );
                    case 'category':
                        return (
                            <Link
                                href="/[...slug]"
                                as={`/${(url_path || url_key) + extra}`}
                            >
                                <a
                                    target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                    onClick={() => handleClickCategory(url_key, id, blank)}
                                    style={{ width: '100%' }}
                                >
                                    { children || title }
                                </a>
                            </Link>
                        );
                    case 'page':
                        return (
                            <Link
                                href={`/${url_key + extra}`}
                            >
                                <a
                                    target={(blank === true || blank === 'true' ? '_blank' : '_self')}
                                    style={{ width: '100%' }}
                                >
                                    { children || title }
                                </a>
                            </Link>
                        );
                    default:
                        return null;
                    }
                }
            },
        });
    }

    if (contentLink && contentLink !== '' && !contentLink.includes(DOM_NAME)) {
        return (
            <Link href={`${contentLink}`}>
                <a target={link_target === '_blank' ? '_blank' : '_self'}>
                    {children}
                </a>
            </Link>
        );
    }
    return children;
};

const notRenderIf = (prevProps, nextProps) => prevProps.content === nextProps.link;

export default memo(MagezonLink, notRenderIf);
