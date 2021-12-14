import _app from '@core_modules/theme/pages/_app';
import { features } from '@config';

/**
 * Import global css
 * */
import '../core/styles/index.css';
import '../core/styles/mediaquery.css';
import '../core/styles/flexboxgrid.min.css';
import '../core/styles/fonts.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

if (features.useCustomStyle) {
    // eslint-disable-next-line global-require
    require('../src/styles/custom.css');
}

export default _app;
