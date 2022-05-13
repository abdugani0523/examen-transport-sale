import { AuthenticationError } from 'apollo-server-core'
import { get_staff_by_id } from '../queries/staff.js'
import execute from './dbConnection.js'
import { verify } from './functions.js'

export default async (token, userAgent) => {
    if (!token) throw new AuthenticationError('Token required!')
    const { agent, id } = verify(token)
    if (userAgent !== agent) throw new AuthenticationError("Token is sent from wrong device!")
    const staff = await execute(get_staff_by_id, id)
    if (!staff.length) throw new AuthenticationError('You are not a member!')
    return staff
}