/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/*
  NOTE: This modifies next.js internal api behavior and may break your application.
  Tested on next.js version: 9.2.1
*/

import React from 'react';

import { Head } from 'next/document';

class HeadCustom extends Head {
    // https://github.com/zeit/next.js/blob/d467e040d51ce1f8d2bf050d729677b6dd99cb96/packages/next/pages/_document.tsx#L187
    getCssLinks(files) {
        const { assetPrefix } = this.context;
        const cssFiles = files && files.allFiles && files.allFiles.length ? files.allFiles.filter((f) => /\.css$/.test(f)) : [];
        const cssLinkElements = [];
        cssFiles.forEach((file) => {
            cssLinkElements.push(
                <link
                    key={file}
                    nonce={this.props.nonce}
                    rel="stylesheet"
                    href={`${assetPrefix}/_next/${encodeURI(file)}`}
                    crossOrigin={this.props.crossOrigin || process ? process.crossOrigin : false}
                />,
            );
        });

        return cssLinkElements.length === 0 ? null : cssLinkElements;
    }

    getPreloadMainLinks() {
        return [];
    }

    getPreloadDynamicChunks() {
        return [];
    }
}

export default HeadCustom;
