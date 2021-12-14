import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/productreview/services/graphql/schema';

export const getReview = (variables) => useQuery(Schema.getReview, {
    variables,
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export default { getReview };
