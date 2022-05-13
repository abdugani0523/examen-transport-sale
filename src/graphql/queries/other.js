export const get_colors = `
SELECT * FROM colors
`
export const get_color = `
SELECT * FROM colors WHERE color_id = $1
`

export const get_districts = `
SELECT 
    c.*,
    JSON_AGG(d.*) AS districts
FROM cities AS c 
LEFT JOIN districts AS d ON d.city_id = c.city_id
WHERE c.city_id = (
    CASE 
        WHEN $3::INT IS NOT NULL THEN $3::INT
        ELSE c.city_id
    END
) AND c.city_name ILIKE CONCAT('%', $1::varchar , '%')
GROUP BY c.city_id
ORDER BY
    CASE 
    WHEN $2 = 1 then c.city_name
    END ASC,
    CASE 
    WHEN $2 = 2 then c.city_name
    END DESC
`