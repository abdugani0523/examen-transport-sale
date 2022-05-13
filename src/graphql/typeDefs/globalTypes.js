import { gql } from 'apollo-server-express'

export default gql`
scalar Upload

type PermissionModule {
    module_id: ID!
    module_name: String! 
}

type PermissionType {
    permission_id: ID!
    permission_name: String!
}

type MutationResponse {
    status: Int!
    message: String!
    data: Data
    token: String
}

enum SortType {
    to_small
    to_large 
}

input SortInput {
    by_name: SortType
    by_date: SortType
}

union Data = Staff | Branch | Permission | Transport
`;

