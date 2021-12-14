import { useQuery, useLazyQuery } from '@apollo/client';
import * as schema from '@core_modules/blog/services/graphql/schema';

export const getBlog = (params = {}) => useQuery(schema.getAllPost, {
    ...params,
});

export const getCategory = (variables) => useQuery(schema.getCategory, {
    variables,
});

export const getDetailBlog = (id) => useQuery(schema.getPostById, {
    variables: {
        id,
    },
});

export const awBlogPostWithRelatedPosts = (options = {}) => useLazyQuery(schema.awBlogPostWithRelatedPosts, {
    ...options,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
});
export default {};
