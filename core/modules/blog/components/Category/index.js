import Core from '@core_modules/blog/components/Category/core';
import ErrorInfo from '@core_modules/blog/components/Info';
import Content from '@core_modules/blog/components/Category/components';

const Category = (props) => (
    <Core
        Content={Content}
        ErrorInfo={ErrorInfo}
        {...props}
    />
);

export default Category;
