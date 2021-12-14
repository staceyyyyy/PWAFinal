/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useRouter } from 'next/router';

import Button from '@common_button';

const WidgetPwaLink = (props) => {
    const {
        pwa_link_type, type, image, url, text = 'Sample Link',
    } = props;
    const customStyle = props?.class;
    const buttonText = props?.button;
    const isExternal = url.startsWith('http');
    const router = useRouter();

    if (!url) return <span>no url found in pwa link widget</span>;

    const propsLink = {};
    const propsOther = {};
    if (customStyle !== undefined) {
        propsOther.className = customStyle;
    }

    if (isExternal) {
        propsLink.href = url;
    } else {
        propsLink.onClick = () => {
            router.push('/[...slug]', url);
        };
    }

    /**
     * {{widget type="pwa-cms-page-link" pwa_link_type="text" text="View All" class="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiTypography-caption MuiTypography-alignLeft homepage-product-list-btn-viewall-text homepage-product-list-btn-viewall" url="/about-us"}}
     * [LINK] button
     * @return {link-button}
     */
    if (pwa_link_type === 'button') {
        return (
            <Button {...propsOther} href={url}>
                {buttonText}
            </Button>
        );
    }

    /**
     * [LINK] image
     * @return {link}
     */
    if (pwa_link_type === 'image') {
        return (
            <a {...propsLink}>
                <img {...propsOther} src={image} alt={`${type}-${pwa_link_type}`} />
            </a>
        );
    }

    /**
     * [LINK] default || text
     * @return {link}
     */
    return (
        <a {...propsLink} {...propsOther}>
            {text}
        </a>
    );
};

export default WidgetPwaLink;
