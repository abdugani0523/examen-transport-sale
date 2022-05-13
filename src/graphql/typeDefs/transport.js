import { gql } from 'apollo-server-express'

export default gql`

type Query {
    transports(branch: ID search: String sort: SortInput): [Transport!]
}

type Mutation {
    addTransport(input: TransportInput): MutationResponse!
    deleteTransport(transport_id: ID!): MutationResponse!
    changeTransport(transport_id: ID!, input: TransportUpdateInput!): MutationResponse!
}

input TransportInput {
    branch: ID!
    transport_model: String!
    transport_color: ID!
    transport_image: Upload!
}

input TransportUpdateInput {
    branch: ID
    transport_model: String
    transport_color: ID
}

type Transport {
    transport_id: ID!
    branch: Branch!
    transport_model: String!
    transport_color: TransportColor!
    transport_img: String!
    created_timestamp: String!
}

type TransportColor {
    color_id: ID!
    color_name: String!
}
`;