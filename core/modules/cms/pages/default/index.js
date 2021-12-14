import { withTranslation } from '@i18n';
import Content from '@core_modules/cms/pages/default/components';
import Core from '@core_modules/cms/pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} />);

export default withTranslation()(Page);
