export const check_staff_permission = `
SELECT branch FROM permission_of_staff WHERE staff_id = $1 AND permission_type = $2
`

export const get_staff = `
SELECT 
    s.staff_id,
    s.staff_username,
    b.branch_id,
    b.branch_name,
    d.district_name,
    ci.city_name,
    s.birth_date::varchar,
    g.*
FROM staff AS s 
LEFT JOIN branches as b ON b.branch_id = s.staff_branch
LEFT JOIN genders as g ON g.gender_id = s.gender
LEFT JOIN districts as d ON d.district_id = b.branch_district
LEFT JOIN cities AS ci ON ci.city_id = d.city_id
WHERE s.staff_branch IN (%L) AND
s.staff_username ilike concat('%', $1::varchar, '%')
ORDER BY
    CASE 
        WHEN $2 = 'by_date' AND $3 = 1 then s.birth_date
    END ASC,
    CASE 
        WHEN $2 = 'by_date' AND $3 = 2 then s.birth_date
    END DESC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 1 then s.staff_username
    END ASC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 2 then s.staff_username
    END DESC
`

export const get_staff_by_id = `
SELECT 
    s.staff_id,
    s.staff_username,
    b.branch_id,
    b.branch_name,
    d.district_name,
    s.birth_date::varchar,
    c.city_name,
    g.*,
    created_timestamp
FROM staff AS s 
LEFT JOIN branches AS b ON b.branch_id = s.staff_branch
LEFT JOIN districts AS d ON b.branch_district = d.district_id
LEFT JOIN cities AS c ON c.city_id = d.city_id
LEFT JOIN genders AS g ON g.gender_id = s.gender
WHERE s.staff_id = $1
`
