import { gql } from '@apollo/client';

export const internalGenerateSession = gql`
           mutation internalGenerateSession($state: String!) {
               internalGenerateSession(state: $state) {
                   result
                   isLogin
                   cartId
                   redirect_path
               }
           }
       `;

export const internalDeleteSession = gql`
           mutation internalDeleteSession {
               internalDeleteSession {
                   result
               }
           }
       `;

export default {
    internalGenerateSession,
    internalDeleteSession,
};
