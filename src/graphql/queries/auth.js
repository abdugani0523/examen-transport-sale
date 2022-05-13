export const register = `
INSERT INTO staff (staff_username, staff_password, staff_branch, birth_date, gender) VALUES
($1, crypt($2, gen_salt('md5')), $3, $4, $5)
RETURNING staff_id
`

export const check_exists = `
SELECT staff_id FROM staff WHERE staff_username = $1
`

export const login = `
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
WHERE s.staff_username = $1 AND s.staff_password = crypt($2, s.staff_password)
`