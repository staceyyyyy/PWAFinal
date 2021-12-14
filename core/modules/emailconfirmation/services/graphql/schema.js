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

export const confirmEmail = gql`
    mutation confirmEmail( $id:Int!, $token:String! ){
        confirmEmailRegistration( input:{ id: $id, token: $token } ){
            status
            message
            state
        }
    }
`;

export default {
    internalGenerateSession,
    internalDeleteSession,
    confirmEmail,
};
