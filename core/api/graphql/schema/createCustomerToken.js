const typeDefs = `
type Token {
    originalToken: String
    token: String
    message: String
    is_email_confirmation: Boolean
}

type Query {
    getCustomerToken: Token
}

type RevokeCustomerTokenOutput {
    result: Boolean
}

input internalCreateCustomerTokenInput {
    firstname: String
    lastname: String
    email: String
    gender: Int
    date_of_birth: String
    password: String
    phonenumber: String
    is_subscribed: Boolean
    otp: String
    whatsapp_number: String
}

input internalCreateSocialLoginInput {
    firstname: String
    lastname: String
    email: String
    socialtoken: String
}

type internalGenerateSessionOutput {
    result: Boolean
    isLogin: Boolean
    cartId: String
    redirect_path: String
}

type internalDeleteSessionOutput {
    result: Boolean
}

type Mutation {
    internalGenerateCustomerToken(username: String!, password: String!): Token
    internalCreateCustomerToken(input: internalCreateCustomerTokenInput): Token
    internalCreateSocialLogin(input: internalCreateSocialLoginInput): Token
    internalGenerateCustomerTokenOtp(username: String!, otp: String!): Token
    internalDeleteCustomerToken: RevokeCustomerTokenOutput
    internalGenerateSession(state: String!): internalGenerateSessionOutput
    internalDeleteSession: internalDeleteSessionOutput
    internalGetInstagramFeed(token: String!): internalGetInstagramFeedOutput
}

type internalGetInstagramFeedItem {
    id: String,
    media_type: String
    media_url: String
    permalink: String
    caption: String
    username: String
}

type internalGetInstagramFeedOutput {
    message: String
    data: [internalGetInstagramFeedItem]
    err: String
}
`;

module.exports = typeDefs;
