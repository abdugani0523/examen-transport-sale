import execute from '../utils/dbConnection.js'
import { get_colors, get_districts } from '../queries/other.js'
import format from 'pg-format'

export default {
    Query: {
        colors: async () => await execute(get_colors),
        districts: async (_, { city, search, sort }) => {
            const data = await execute(get_districts, search, sort, city ? city : null)
            return data
        }
    }
}