import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './typeDefs/index.js' 
import resolvers from './resolvers/index.js' 

export default makeExecutableSchema({
  typeDefs,
  resolvers
})