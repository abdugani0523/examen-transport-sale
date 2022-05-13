import jwt from 'jsonwebtoken'

const jwtOptions = {
    algorithm: "HS256",
    expiresIn: "5h"
}
export const sign = payload => jwt.sign(payload, process.env.jwt_secret, jwtOptions)
export const verify = token => jwt.verify(token, process.env.jwt_secret, jwtOptions)


export function cleanData(staff) {
    return {
        staff_id: staff.staff_id,
        staff_username: staff.staff_username,
        gender: {
            gender_id: staff.gender_id,
            gender_name: staff.gender_name
        },
        staff_branch: {
            branch_id: staff.branch_id,
            branch_name: staff.branch_name,
            address: {
                city: staff.city_name,
                district: staff.district_name
            }
        },
        birth_date: staff.birth_date,
        created_timestamp: staff.created_timestamp
    }
}

export function cleanPermissionCallback (row ) {
    row.branch = {
        branch_id: row.branch_id,
        branch_name: row.branch_name,
        address: {
            city: row.city_name,
            district: row.district_name
        }
    }
    row.permission_module = {
        module_id: row.module_id,
        module_name: row.module_name
    }
    row.permission_type = {
        permission_id: row.permission_id,
        permission_name: row.permission_name
    }
    return row
}