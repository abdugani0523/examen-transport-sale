export const get_permissions = `
SELECT 
    pm.*,
    d.*,
    c.*,
    b.*,
    p.*,
    pos.created_timestamp::varchar
FROM permission_of_staff AS pos
LEFT JOIN permission_modules AS pm ON pos.permission_module = pm.module_id
LEFT JOIN permissions AS p ON p.permission_id = pos.permission_type
LEFT JOIN branches AS b ON b.branch_id = pos.branch
LEFT JOIN districts as d on d.district_id = b.branch_district
LEFT JOIN cities as c on c.city_id = d.city_id
WHERE pos.staff_id = $1
`
export const check_permission = `
SELECT 
    *
FROM permission_of_staff
WHERE staff_id = $1 AND permission_module = $2 AND permission_type = $3
`

export const add_permission = `
INSERT INTO permission_of_staff (staff_id, branch, permission_module, permission_type) VALUES
($1, $2, $3, $4)
`

export const check_all_permission = `
SELECT 
    *
FROM permission_of_staff
WHERE staff_id = $1 AND branch = $2 AND permission_module = $3 AND permission_type = $4
`

export const delete_permission = `
DELETE FROM permission_of_staff WHERE staff_id = $1 AND branch = $2 AND permission_module = $3 AND permission_type = $4
`

export const get_permission_module = `
SELECT * FROM permission_modules WHERE module_id = $1
`

export const get_permission = `
SELECT * FROM permissions WHERE permission_id = $1
`

export const get_permission_modules = `
SELECT * FROM permission_modules
`

export const get_all_permissions = `
SELECT * FROM permissions
`