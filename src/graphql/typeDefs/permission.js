import { gql } from 'apollo-server-express'

export default gql`

type Query {
    allPermissions: PermissionTypes!
    ownPermissions: [Permission!]
}

type Mutation {
    addPermission(input: PermissionInput): MutationResponse!
    deletePermission(input: PermissionInput): MutationResponse!
}

input PermissionInput {
    staff_id: ID!
    branch: ID!
    permission_module: ID!
    permission_type: ID!
}

type PermissionTypes {
    permission_modules: [ PermissionModule! ]
    permission_types: [ PermissionType! ]
}

type Permission {
    branch: Branch!
    permission_module: PermissionModule!
    permission_type: PermissionType!
    created_timestamp: String!
}
`;