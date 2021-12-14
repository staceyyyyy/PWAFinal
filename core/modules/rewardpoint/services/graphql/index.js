/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/rewardpoint/services/graphql/scema';

export const getRewardPoint = (variables) => useQuery(Schema.getRewardPoint, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
    variables,
});
