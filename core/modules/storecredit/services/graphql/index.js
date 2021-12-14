import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/storecredit/services/graphql/schema';

export const getStoreCredit = (variables) => useQuery(Schema.getStoreCredit, {
    variables,
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export default { getStoreCredit };
