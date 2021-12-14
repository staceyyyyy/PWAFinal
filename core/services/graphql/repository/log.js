/* eslint-disable import/prefer-default-export */
import { useMutation } from '@apollo/client';
import * as Schema from '../schema/log';

export const updatePwaCheckoutLog = (params) => useMutation(Schema.updatePwaCheckoutLog, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export default {
    updatePwaCheckoutLog,
};
