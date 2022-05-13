import check_token from '../utils/checkToken.js'
import execute from '../utils/dbConnection.js'
import { get_permissions, 
    check_permission, 
    check_all_permission,
     add_permission,
      delete_permission, get_permission_module, get_permission, get_all_permissions, get_permission_modules } from '../queries/permission.js'
import { UserInputError } from 'apollo-server-core'
import { get_staff_by_id } from '../queries/staff.js'
import { get_branch_by_id } from '../queries/branch.js'
import { cleanPermissionCallback } from '../utils/functions.js'


export default {
    Query: {
        ownPermissions: async (_, __, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const rows = await execute(get_permissions, staff.staff_id)
            return rows.map(cleanPermissionCallback)
        },
        allPermissions: async (_, __, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const check = await execute(check_permission, staff.staff_id, 3, 2)
            if (!check.length) throw new UserInputError('Permission not allowed!')
            const p_modules = await execute(get_permission_modules)
            const p_types = await execute(get_all_permissions)
            return {
                permission_modules: p_modules,
                permission_types: p_types
            }
        }
    },
    Mutation: {
        addPermission: async (_, { input: { staff_id, branch, permission_module, permission_type } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_permission, staff.staff_id, 3, 1)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')
            const staff_exists = await execute(get_staff_by_id, staff_id)
            if (!staff_exists.length) throw new UserInputError('Selected staff not found!')
            const check_branch = await execute(get_branch_by_id, branch)
            if (!check_branch.length) throw new UserInputError('Selected branch not found!')
            const check_module = await execute(get_permission_module, permission_module)
            if (!check_module.length) throw new UserInputError('Selected permission module not found!')
            const check_module_type = await execute(get_permission, permission_type)
            if (!check_module_type.length) throw new UserInputError('Selected permission type not found!')
            const check_exists = await execute(check_all_permission, staff_id, branch, permission_module, permission_type)
            if (check_exists.length) throw new UserInputError('This staff already has permission!')

            await execute(add_permission, staff_id, branch, permission_module, permission_type)
            return {
                status: 201,
                message: "Permission successfully granted"
            }
        },
        deletePermission: async (_, { input: { staff_id, branch, permission_module, permission_type } }, { token, user_agent }) => {
            if (!token) throw new UserInputError('Token is required!')
            const [ staff ] = await check_token(token, user_agent)
            const checkPermission = await execute(check_permission, staff.staff_id, 3, 3)
            if (!checkPermission.length) throw new UserInputError('Permission not allowed!')
            const staff_exists = await execute(get_staff_by_id, staff_id)
            if (!staff_exists.length) throw new UserInputError('Selected staff not found!')
            const check_branch = await execute(get_branch_by_id, branch)
            if (!check_branch.length) throw new UserInputError('Selected branch not found!')
            const check_module = await execute(get_permission_module, permission_module)
            if (!check_module.length) throw new UserInputError('Selected permission module not found!')
            const check_module_type = await execute(get_permission, permission_type)
            if (!check_module_type.length) throw new UserInputError('Selected permission type not found!')
            const check_exists = await execute(check_all_permission, staff_id, branch, permission_module, permission_type)
            if (!check_exists.length) throw new UserInputError('This employee has no such permission!')

            await execute(delete_permission, staff_id, branch, permission_module, permission_type)
            return {
                status: 201,
                message: "Permission successfully deleted"
            }
        }
    }
}