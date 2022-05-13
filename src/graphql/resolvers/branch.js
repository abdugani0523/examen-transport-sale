import { UserInputError } from 'apollo-server-core'
import { add_branch, get_branches_more, update_branch, delete_branch } from '../queries/branch.js'
import check_token from '../utils/checkToken.js' 
import execute from '../utils/dbConnection.js'
import { check_permission, check_all_permission } from '../queries/permission.js'
import { get_district_by_id } from '../queries/district.js'
import format from 'pg-format'

export default {
    Query: {
        branches: async (_, { search, sort }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_permission, staff.staff_id, 2, 2)
            if (!checkPermission.length) throw new UserInputError('you are not allowed to see the branches!')
            const allowedBranches = checkPermission.map(permission => permission.branch)
            const sort_key = Object.keys(sort || {})[0]
            let rows = await execute(format(get_branches_more, allowedBranches.length ? allowedBranches : null), search , sort_key, sort?.[sort_key])
            
            return rows.map(row => {
                row.address = {
                    city: row.city_name,
                    district: row.district_name
                }
                return row
            })
        }
    },
    Mutation: {
        changeBranch: async (_, { branch_id, input: { branch_district, branch_name } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_all_permission, staff.staff_id, branch_id, 2, 4)
            if (!checkPermission.length) throw new UserInputError('Branch change is not allowed!')
            const check_district = await execute(get_district_by_id, branch_district)
            if (!check_district.length) throw new UserInputError('District not found!')
            await execute(update_branch, branch_id, branch_district, branch_name);
            return {
                status: 200,
                message: "Branch changed",
            }
        },
        addBranch: async (_, { input: { branch_district, branch_name } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_permission, staff.staff_id, 2, 1)
            if (!checkPermission.length) throw new UserInputError('Branch creation is not allowed!')
            const check_district = await execute(get_district_by_id, branch_district)
            if (!check_district.length) throw new UserInputError('District not found!')
            await execute(add_branch, branch_district, branch_name)
            return {
                status: 200,
                message: "Branch created",
            }
        },
        deleteBranch: async (_, { branch_id }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_all_permission, staff.staff_id, branch_id, 2, 3)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')
            await execute(delete_branch, branch_id)
            return {
                status: 200,
                message: "Branch deleted",
            }
        },
    }
}