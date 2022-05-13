import { gql } from 'apollo-server-express'

export default gql`
type Mutation {
    register(input: StaffRegister!): MutationResponse!
    login(input: StaffLogin!): MutationResponse!
}

type Gender {
    gender_id: Int!
    gender_name: String!
}

`;