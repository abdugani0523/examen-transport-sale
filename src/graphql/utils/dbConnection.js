import { UserInputError } from 'apollo-server-core'
import pg from 'pg'

const pool = new pg.Pool({
    port: process.env.pg_port,
    host: process.env.pg_host,
    user: process.env.pg_user,
    password: process.env.pg_passwd,
    database: process.env.pg_database
})

export default async function (query, ...params) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query(query, params)
        return rows
    } catch (error) {
        console.log('Database error:', error.message)
        throw new UserInputError(error.message)
    } finally {
        client.release()
    }
}