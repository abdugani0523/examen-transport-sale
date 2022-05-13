import { gql } from 'apollo-server-express'

export default gql`
type Query {
    colors: [Color!]
    districts(search: String city: ID sort: SortType): [Location!]
}
type Color {
    color_id: ID!
    color_name: String!
}

type Location {
    city_id: ID!
    city_name: String!
    districts: [District] 
}

type District {
    district_id: ID!
    district_name: String!
}
`;