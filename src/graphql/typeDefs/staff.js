import { gql } from 'apollo-server-express'

export default gql`
type Query {
    staff(branch: ID search: String sort: SortInput): [Staff!]
}

type Staff {
    staff_id: ID!
    staff_username: String!
    staff_branch: Branch!
    birth_date: String!
    gender: Gender!
}

input StaffRegister {
    username: String!
    branch: ID!
    password: String!
    repeat_password: String!
    birth_date: String!
    gender: ID!
}

input StaffLogin{
    username: String!
    password: String!
}
`;