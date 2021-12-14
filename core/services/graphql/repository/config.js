/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from '@services/graphql/schema/config';

export const storeConfig = () => useQuery(Schema.storeConfig);
export default {
    storeConfig,
};
