import execute from '../utils/dbConnection.js'
import { UserInputError } from 'apollo-server-core'
import { check_exists, login, register } from '../queries/auth.js'
import { sign, cleanData } from '../utils/functions.js'
import { get_staff_by_id } from '../queries/staff.js'
import { get_branch_by_id } from '../queries/branch.js'

export default {
    Mutation: {
        register: async (_, { input: { username, password, repeat_password, branch, birth_date, gender } }, { user_agent }) => {
            // Clean
            username = username?.trim()
            if (password != repeat_password) throw new UserInputError('Password and repeat password must be the same!')
            const exists = await execute(check_exists, username)
            if (exists.length) throw new UserInputError('This username already been taken!')
            const check_branch = await execute(get_branch_by_id, branch)
            if (!check_branch.length) throw new UserInputError('Branch not found!')
            const check_date = Date.parse(birth_date)
            if (isNaN(check_date)) throw new UserInputError('Invalid birth date input! (1900-01-01 < birth_date < 2000-01-01)') 
            const [ data ]  = await execute(register, username, password, branch, birth_date, gender)
            const [ staff ] = await execute(get_staff_by_id, data.staff_id)
            const token = sign({
                agent: user_agent,
                id: data.staff_id
            })
            return {
                status: 201,
                message: 'Staff successfully registered!',
                data: cleanData(staff),
                token
            };
        },
        login: async (_, { input: { username, password } }, { user_agent }) => {
            // Clean
            username = username?.trim()
            const exists = await execute(login, username, password)
            if (!exists.length) throw new UserInputError('Username or password is incorrect!')           
            const data = cleanData(exists[0])
            const token = sign({
                agent: user_agent,
                id: data.staff_id
            })
            return {
                status: 201,
                message: 'Staff successfully logged in!',
                data,
                token
            }; 
        }
    }
}