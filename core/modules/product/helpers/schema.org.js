/* eslint-disable radix */
import { getHost } from '@helper_config';
import { StripHtmlTags } from '@helper_text';
import { modules } from '@config';

const generate = (product) => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${parseInt(dd) + 1}`;
    const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: product.name,
        image: product.image.url,
        description: StripHtmlTags(product.description.html),
        sku: product.sku,
        gtin: product.id,
        gtin12: product.id,
        gtin13: product.id,
        gtin14: product.id,
        gtin8: product.id,
        mpn: product.id,
        brand: modules.brands.enabled ? product.brand : '',
        offers: {
            '@type': 'Offer',
            priceCurrency: product.price_range.minimum_price.final_price.currency,
            url: `${getHost()}/${product.url_key}`,
            availability: 'https://schema.org/InStock',
            price: product.price_range.minimum_price.final_price.value,
            priceValidUntil: today,
        },
    };

    if (product.review.rating_summary) {
        schema.aggregateRating = { // sementara di comment soalnya datanya belum
            '@type': 'AggregateRating',
            bestRating: product.review.rating_summary ? product.review.rating_summary : 1,
            ratingCount: product.review.reviews_count ? product.review.reviews_count : 1,
            ratingValue: product.review.rating_summary ? product.review.rating_summary : 1,
        };
    }
    return [
        schema,
    ];
};

export default generate;
