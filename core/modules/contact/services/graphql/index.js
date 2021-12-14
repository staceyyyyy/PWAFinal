import { useMutation, useQuery } from '@apollo/client';
import * as Schema from '@core_modules/contact/services/graphql/schema';
import { getLoginInfo } from '@helper_auth';

let isLogin = 0;
if (typeof window !== 'undefined') {
    isLogin = getLoginInfo();
}

export const contactusFormSubmit = (options) => useMutation(Schema.contactusFormSubmit, {
    ...options,
    context: {
        request: 'internal',
    },
});
export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, {
    variables,
    context: {
        request: isLogin ? 'internal' : '',
    },
    fetchPolicy: isLogin ? 'network-only' : '',
});

export default { contactusFormSubmit, getCmsBlocks };
