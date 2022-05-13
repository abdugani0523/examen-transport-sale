export const get_transports = `
SELECT 
    t.transport_id,
    t.transport_model,
    c.color_id,
    c.color_name,
    d.district_name,
    ci.city_name,
    b.*,
    t.transport_image,
    t.created_timestamp::varchar
FROM transports AS t
LEFT JOIN colors AS c ON t.transport_color = c.color_id
LEFT JOIN branches AS b ON t.branch = b.branch_id
LEFT JOIN districts AS d ON b.branch_district = d.district_id
LEFT JOIN cities AS ci ON ci.city_id = d.city_id
WHERE t.branch IN (%L) AND
t.transport_model ilike concat('%', $1::varchar, '%')
ORDER BY
    CASE 
        WHEN $2 = 'by_date' AND $3 = 1 then t.created_timestamp
    END ASC,
    CASE 
        WHEN $2 = 'by_date' AND $3 = 2 then t.created_timestamp
    END DESC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 1 then t.transport_model
    END ASC,
    CASE 
        WHEN $2 = 'by_name' AND $3 = 2 then t.transport_model
    END DESC
`

export const add_transport = `
INSERT INTO transports (transport_model, transport_color, branch, transport_image) VALUES
($1, $2, $3, $4)
RETURNING *
`
export const update_transport = `
update transports AS t set
branch = (
    case
        when length($2) > 0 then $2::int
        else t.branch
    end
),
transport_model = (
    case
        when length($3) > 0 then $3::varchar
        else t.transport_model
    end
),
transport_color = (
    case
        when length($4) > 0 then $4::int
        else t.transport_color
    end
)
where t.transport_id = $1
returning *
`

export const delete_transport = `
DELETE FROM transports WHERE transport_id = $1
`

export const get_transport = `
SELECT * FROM transports WHERE transport_id = $1
`