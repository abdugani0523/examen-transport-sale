export const get_branches = `
SELECT * FROM branches
`

export const get_branches_more = `
SELECT 
    b.branch_id,
    b.branch_name,
    d.district_name,
    c.city_name,
    b.created_timestamp
FROM branches as b
LEFT JOIN districts as d on d.district_id = b.branch_district
LEFT JOIN cities as c on c.city_id = d.city_id
WHERE b.branch_id IN (%L) AND 
b.branch_name ILIKE CONCAT('%', $1::varchar, '%')   
ORDER BY
    CASE 
        WHEN $2 = 'by_date' AND $3 = 1 then b.created_timestamp
    END ASC,
    CASE 
        WHEN $2 = 'by_date' AND $3 = 2 then b.created_timestamp
    END DESC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 1 then b.branch_name
    END ASC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 2 then b.branch_name
    END DESC
`

export const update_branch = `
update branches AS b set
branch_district = (
    case
        when length($2) > 0 then $2::int
        else b.branch_district
    end
),
branch_name = (
    case
        when length($3) > 0 then $3::varchar
        else b.branch_name
    end
)
where b.branch_id = $1
returning *
`
export const add_branch = `
INSERT INTO branches (branch_district, branch_name) VALUES
($1, $2)
RETURNING *
`

export const delete_branch = `
DELETE FROM branches WHERE branch_id = $1
`

export const get_branch_by_id = `
SELECT * FROM branches WHERE branch_id = $1
`