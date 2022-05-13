import { gql } from 'apollo-server-express'

export default gql`
type Query {
    branches(search: String sort: SortInput): [Branch!]
}

type Mutation {
    changeBranch(branch_id: ID! input: BranchUpdateInput!): MutationResponse!
    deleteBranch(branch_id: ID!): MutationResponse!
    addBranch(input: BranchInput!): MutationResponse!

}

input BranchInput {
    branch_name: String!
    branch_district: ID!
}


input BranchUpdateInput {
    branch_name: String
    branch_district: ID
}

type Branch {
    branch_id: ID!
    branch_name: String!
    address: Address!
}

type Address {
    city: String!
    district: String!
}
`;