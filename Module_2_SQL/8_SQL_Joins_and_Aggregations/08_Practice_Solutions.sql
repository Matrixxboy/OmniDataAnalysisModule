-- ============================================================
-- SQL JOINS & AGGREGATIONS — Practice Solutions
-- Topic 8 | Week 8
-- ============================================================

-- ── Exercise 1: Every order with customer name and city
SELECT c.name, c.city, o.order_id, o.order_date, o.status, o.total_amount
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
ORDER BY o.order_date;

-- ── Exercise 2: Order items with product details
SELECT
    oi.order_id,
    p.name          AS product_name,
    p.category,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM order_items AS oi
JOIN products AS p ON oi.product_id = p.product_id;

-- ── Exercise 3: Employees with manager name
SELECT
    e.name      AS employee,
    e.department,
    e.salary,
    m.name      AS manager
FROM employees AS e
LEFT JOIN employees AS m ON e.manager_id = m.employee_id
ORDER BY e.department;

-- ── Exercise 4: Customers who never ordered
SELECT c.name, c.email
FROM customers AS c
LEFT JOIN orders AS o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;

-- ── Exercise 5: Products with total qty ordered (include 0)
SELECT
    p.name,
    p.category,
    COALESCE(SUM(oi.quantity), 0) AS total_ordered
FROM products AS p
LEFT JOIN order_items AS oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name, p.category
ORDER BY total_ordered DESC;

-- ── Exercise 6: Full order details
SELECT
    c.name          AS customer,
    o.order_id,
    o.order_date,
    p.name          AS product,
    oi.quantity,
    oi.unit_price,
    o.status
FROM orders AS o
JOIN customers   AS c  ON o.customer_id  = c.customer_id
JOIN order_items AS oi ON o.order_id     = oi.order_id
JOIN products    AS p  ON oi.product_id  = p.product_id
ORDER BY o.order_date;

-- ── Exercise 7: Orders per status
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;

-- ── Exercise 8: Average salary per department
SELECT department, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- ── Exercise 9: Total and average order value
SELECT
    COUNT(*)              AS total_orders,
    SUM(total_amount)     AS total_revenue,
    ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders;

-- ── Exercise 10: Revenue per customer
SELECT
    c.name,
    COUNT(o.order_id)   AS num_orders,
    SUM(o.total_amount) AS total_spent
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC;

-- ── Exercise 11: Product stats per category
SELECT
    category,
    COUNT(*)              AS num_products,
    MIN(price)            AS min_price,
    MAX(price)            AS max_price,
    ROUND(AVG(price), 2)  AS avg_price
FROM products
GROUP BY category
ORDER BY avg_price DESC;

-- ── Exercise 12: Orders per customer (only buyers)
SELECT
    c.name,
    COUNT(o.order_id) AS num_orders
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY num_orders DESC;

-- ── Exercise 13: Departments with > 2 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;

-- ── Exercise 14: Customers with total orders > ₹5000
SELECT
    c.name,
    SUM(o.total_amount) AS total_spent
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING SUM(o.total_amount) > 5000
ORDER BY total_spent DESC;

-- ── Exercise 15: Categories with avg price > ₹3000
SELECT
    category,
    ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 3000
ORDER BY avg_price DESC;

-- ── Exercise 16: Customers with avg order > ₹5000
SELECT
    c.name,
    COUNT(o.order_id)          AS num_orders,
    SUM(o.total_amount)        AS total_spent,
    ROUND(AVG(o.total_amount), 2) AS avg_order_value
FROM customers AS c
JOIN orders AS o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING AVG(o.total_amount) > 5000
ORDER BY avg_order_value DESC;

-- ── Exercise 17: Top 3 products by units sold
SELECT
    p.name,
    p.category,
    SUM(oi.quantity) AS total_units_sold
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name, p.category
ORDER BY total_units_sold DESC
LIMIT 3;

-- ── Exercise 18: Monthly revenue 2023
-- PostgreSQL:
SELECT
    TO_CHAR(order_date, 'YYYY-MM Month') AS month,
    COUNT(*)                             AS num_orders,
    SUM(total_amount)                    AS total_revenue
FROM orders
WHERE EXTRACT(YEAR FROM order_date) = 2023
GROUP BY DATE_TRUNC('month', order_date), TO_CHAR(order_date, 'YYYY-MM Month')
ORDER BY DATE_TRUNC('month', order_date);
