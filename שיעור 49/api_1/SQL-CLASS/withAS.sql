WITH table_result AS(
SELECT
	o.id 
    ,concat(c.first_name, " ", c.last_name) AS 'customer_name'
    ,os.status_name
FROM
	northwind.orders AS o 
	JOIN northwind.customers AS c ON c.id = o.customer_id
	JOIN northwind.orders_status AS os ON os.id = o.status_id

)

SELECT 
    table_result.customer_name,
    table_result.status_name,
    COUNT(table_result.id) AS 'counter'
FROM
    table_result
GROUP BY 
	table_result.customer_name 
    ,table_result.status_name