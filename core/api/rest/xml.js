/* eslint-disable no-plusplus */
/* eslint-disable func-names */
const fs = require('fs');
const path = require('path');
const requestGraph = require('../graphql/request');
const { getHost } = require('../../helpers/config');

const baseDir = path.join(__dirname, '../../../public/static/');

const queryProduct = (page, size) => `
{
    products(search: "", pageSize: ${size}, currentPage: ${page}) {
        page_info {
            current_page
            page_size
            total_pages
        }
      items {
        name
        id
        updated_at
        url_key
        small_image {
            url
            label
        }
        media_gallery {
            url
            label
        }
      }
    }
  }
  
`;

const queryCategory = `
{
    categoryList {
      children_count
      children {
        id
        name
        url_key
        url_path
        updated_at
        include_in_menu
        children {
          id
          name
          url_key
          url_path
          updated_at
          children {
            id
            name
            url_key
            url_path
            updated_at
          }
        }
      }
    }
}  
`;

const generateProduct = async (page = 1, allProducts = []) => {
    const getProduct = await requestGraph(queryProduct(page, 400));
    const products = [...allProducts, ...getProduct.products.items];
    const totalPages = getProduct.products.page_info.total_pages;
    return {
        products,
        totalPages,
        page,
    };
};

const getXmlData = async (res) => {
    let dataProducts = [];
    const getProducts = await generateProduct(1);
    dataProducts = getProducts.products;
    for (let page = getProducts.page + 1; page <= getProducts.totalPages; page += 1) {
        // eslint-disable-next-line no-await-in-loop
        const loopProducts = await generateProduct(page, dataProducts);
        dataProducts = loopProducts.products;
    }

    const getCategory = new Promise((resolve) => {
        const response = requestGraph(queryCategory);
        resolve(response);
    });
    Promise.all([dataProducts, getCategory]).then((values) => {
        const category = values[1].categoryList[0].children;
        const products = values[0];

        res.set('Content-Type', 'text/xml');
        let content = `
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:content="http://www.google.com/schemas/sitemap-content/1.0"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
            <url>
                <loc>${getHost()}</loc>
            </url>
        `;

        // generate category sitemap
        for (let index = 0; index < category.length; index++) {
            if (category[index].include_in_menu) {
                let dateCategory = category[index].updated_at;
                dateCategory = dateCategory.split(' ');
                content += `
                <url>
                    <loc>${getHost()}/${category[index] && category[index].url_path && category[index].url_path.replace('&', '&amp;')}</loc>
                    <lastmod>${`${dateCategory[0]}T${dateCategory[1]}+00:00`}</lastmod>
                    <changefreq>daily</changefreq>
                    <priority>0.5</priority>
                </url>
            `;
                for (let child1 = 0; child1 < category[index].children.length; child1++) {
                    const children1 = category[index].children[child1];
                    let childTime = children1.updated_at;
                    childTime = childTime.split(' ');
                    content += `
                    <url>
                        <loc>${getHost()}/${children1 && children1.url_path && children1.url_path.replace('&', '&amp;')}</loc>
                        <lastmod>${`${childTime[0]}T${childTime[1]}+00:00`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `;
                    for (let child2 = 0; child2 < children1.children.length; child2++) {
                        const children2 = children1.children[child2];
                        let childTime2 = children1.updated_at;
                        childTime2 = childTime2.split(' ');
                        content += `
                    <url>
                        <loc>${getHost()}/${children2 && children2.url_path && children2.url_path.replace('&', '&amp;')}</loc>
                        <lastmod>${`${childTime2[0]}T${childTime2[1]}+00:00`}</lastmod>
                        <changefreq>daily</changefreq>
                        <priority>0.5</priority>
                    </url>
                `;
                    }
                }
            }
        }

        // generate product sitemap
        for (let index = 0; index < products.length; index++) {
            let productTime = products[index].updated_at;
            productTime = productTime.split(' ');
            content += `<url>
                <loc>${getHost()}/${products[index] && products[index].url_key && products[index].url_key.replace('&', '&amp;')}</loc>
                <lastmod>${`${productTime[0]}T${productTime[1]}+00:00`}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
             `;
            for (let idxGallery = 0; idxGallery < products[index].media_gallery.length; idxGallery++) {
                const img = products[index].media_gallery[idxGallery];
                content += `
                    <image:image>
                        <image:loc>
                        ${img && img.url && img.url.replace('&', '&amp;')}
                        </image:loc>
                        <image:title>${img && img.label && img.label.replace('&', '&amp;')}</image:title>
                    </image:image>
                `;
            }

            content += `
            <PageMap xmlns="http://www.google.com/schemas/sitemap-pagemap/1.0">
                <DataObject type="thumbnail">
                <Attribute name="name" value="${products[index] && products[index].url_key && products[index].url_key.replace('&', '&amp;')}"/>
                <Attribute name="src" value="${products[index] && products[index].small_image
                    && products[index].small_image.url
                    && products[index].small_image.url.replace('&', '&amp;')}"/>
                </DataObject>
            </PageMap>
            `;
            content += '  </url>';
        }

        content += `<url>
            <loc>${getHost()}/</loc>
            <priority>0.5</priority>
        </url>`;
        content += '</urlset>';
        // write file to public
        fs.writeFile(`${baseDir}sitemap.xml`, content, (err) => {
            if (err) throw err;
        });
        res.send(content);
    });
};

const generateXml = (req, res) => {
    if (fs.existsSync(`${baseDir}sitemap.xml`)) {
        const { birthtime } = fs.statSync(`${baseDir}sitemap.xml`);
        const created = new Date(birthtime);
        const dateCreated = created.getDate();
        const now = new Date().getDate();
        // if date not same, get latest
        if (now !== dateCreated) {
            fs.unlink(`${baseDir}sitemap.xml`, () => {
                getXmlData(res);
            });
        } else {
            fs.readFile(`${baseDir}sitemap.xml`, { encoding: 'utf-8' }, (err, data) => {
                if (!err) {
                    res.set('Content-Type', 'text/xml');
                    res.send(data);
                }
            });
        }
    } else {
        getXmlData(res);
    }
};

module.exports = generateXml;
