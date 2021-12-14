import { useQuery } from '@apollo/client';
import * as Schema from '@core_modules/slug/services/graphql/schema';

export const getResolver = (urlpath) => useQuery(Schema.getResolver(urlpath));

export default { getResolver };
