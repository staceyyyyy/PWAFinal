import { useMutation } from '@apollo/client';
import * as Schema from './schema';

export const generateSession = (params) => useMutation(Schema.internalGenerateSession, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export const deleteSession = () => useMutation(Schema.internalDeleteSession, {
    context: {
        request: 'internal',
    },
});

export const confirmEmail = (params) => useMutation(Schema.confirmEmail, {
    context: {
        request: 'internal',
    },
    variables: params,
});

export default {
    generateSession,
    deleteSession,
    confirmEmail,
};
