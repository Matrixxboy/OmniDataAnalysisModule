-- ============================================================
-- SQL JOINS & AGGREGATIONS — Complete Notes & Queries
-- Topic 8 | Week 8
-- ============================================================


-- ╔══════════════════════════════════════════════════════════╗
-- ║  UNDERSTANDING JOINS                                      ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- A JOIN combines rows from two (or more) tables based on a
-- related column (usually a primary key + foreign key pair).

-- WHY JOINS EXIST:
-- Relational databases split data into separate tables to avoid
-- repetition. JOINs let us reassemble that data for querying.

-- Our key relationships:
--   customers.customer_id  →  orders.customer_id
--   orders.order_id        →  order_items.order_id
--   order_items.product_id →  products.product_id
--   employees.department   →  departments.dept_name

-- JOIN Syntax:
--   SELECT t1.col, t2.col
--   FROM   table1 AS t1
--   JOIN   table2 AS t2  ON t1.key = t2.key;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  1. INNER JOIN                                            ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Returns ONLY rows that have a match in BOTH tables.
-- Non-matching rows from either table are excluded.
-- This is the most commonly used JOIN type.

--  Table A    Table B     INNER JOIN Result
--  ───────    ───────     ─────────────────
--  1          1     ──►   1  (match)
--  2          2     ──►   2  (match)
--  3                      (3 excluded — no match in B)
--             4            (4 excluded — no match in A)


-- ── INNER JOIN: orders + customers (see who placed each order)
SELECT
    o.order_id,
    c.name          AS customer_name,
    c.city,
    o.order_date,
    o.status,
    o.total_amount
FROM orders AS o
INNER JOIN customers AS c  ON o.customer_id = c.customer_id
ORDER BY o.order_date;


-- ── INNER JOIN: order_items + products (see what's in each order)
SELECT
    oi.order_id,
    p.name          AS product_name,
    p.category,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price   AS line_total
FROM order_items AS oi
INNER JOIN products AS p  ON oi.product_id = p.product_id
ORDER BY oi.order_id;


-- ── THREE-TABLE JOIN: orders + customers + order_items
SELECT
    c.name          AS customer,
    c.city,
    o.order_date,
    o.status,
    p.name          AS product,
    oi.quantity,
    oi.unit_price
FROM orders AS o
INNER JOIN customers   AS c   ON o.customer_id  = c.customer_id
INNER JOIN order_items AS oi  ON o.order_id     = oi.order_id
INNER JOIN products    AS p   ON oi.product_id  = p.product_id
ORDER BY o.order_date;


-- ── FOUR-TABLE JOIN: Full order breakdown
SELECT
    c.name          AS customer,
    o.order_id,
    o.order_date,
    p.name          AS product,
    p.category,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price   AS line_total,
    o.status
FROM orders AS o
JOIN customers   AS c   ON o.customer_id  = c.customer_id
JOIN order_items AS oi  ON o.order_id     = oi.order_id
JOIN products    AS p   ON oi.product_id  = p.product_id
ORDER BY customer, o.order_date;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  2. LEFT JOIN (LEFT OUTER JOIN)                           ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Returns ALL rows from the LEFT table, plus matching rows
-- from the RIGHT table. If no match exists in the right table,
-- NULL is returned for right-table columns.

-- Use LEFT JOIN when: "Give me everything from A, and attach
-- B's data where it exists."

--  Table A    Table B     LEFT JOIN Result
--  ───────    ───────     ─────────────────
--  1          1     ──►   1, B-data
--  2          2     ──►   2, B-data
--  3                ──►   3, NULL (no match — still included)
--             4            (4 not included — not in A)


-- ── LEFT JOIN: All customers, even those with no orders
SELECT
    c.customer_id,
    c.name,
    c.city,
    o.order_id,
    o.total_amount,
    o.status
FROM customers AS c
LEFT JOIN orders AS o  ON c.customer_id = o.customer_id
ORDER BY c.name;
-- Customers with no orders will show NULL for order columns.


-- ── Find customers who have NEVER placed an order
SELECT
    c.customer_id,
    c.name,
    c.email
FROM customers AS c
LEFT JOIN orders AS o  ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;
-- Key trick: filter WHERE right-table key IS NULL → only unmatched left rows


-- ── Products never ordered
SELECT
    p.product_id,
    p.name,
    p.category,
    p.price
FROM products AS p
LEFT JOIN order_items AS oi  ON p.product_id = oi.product_id
WHERE oi.item_id IS NULL;


-- ── Departments with no employees (using our departments table)
SELECT
    d.dept_name,
    d.location,
    e.name AS employee_name
FROM departments AS d
LEFT JOIN employees AS e  ON d.dept_name = e.department
ORDER BY d.dept_name;
-- Finance dept will appear with NULL employee (no one assigned)


-- ╔══════════════════════════════════════════════════════════╗
-- ║  3. RIGHT JOIN (RIGHT OUTER JOIN)                         ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Returns ALL rows from the RIGHT table, plus matching rows
-- from the LEFT table. Mirror image of LEFT JOIN.
-- In practice, most people rewrite RIGHT JOINs as LEFT JOINs
-- (by swapping table order) — easier to read.

-- RIGHT JOIN: All products, with order info if any
SELECT
    p.name          AS product,
    p.category,
    p.price,
    oi.order_id,
    oi.quantity
FROM order_items AS oi
RIGHT JOIN products AS p  ON oi.product_id = p.product_id
ORDER BY p.name;
-- Equivalent to: products LEFT JOIN order_items


-- ╔══════════════════════════════════════════════════════════╗
-- ║  4. FULL OUTER JOIN                                       ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Returns ALL rows from BOTH tables.
-- Where there's no match, NULLs fill in for the missing side.
-- PostgreSQL supports FULL OUTER JOIN natively.
-- MySQL does NOT — emulate with UNION of LEFT + RIGHT JOIN.

-- PostgreSQL:
SELECT
    c.name     AS customer,
    o.order_id,
    o.total_amount
FROM customers AS c
FULL OUTER JOIN orders AS o  ON c.customer_id = o.customer_id;


-- MySQL equivalent (FULL OUTER JOIN emulation):
SELECT c.name, o.order_id, o.total_amount
FROM customers AS c
LEFT JOIN orders AS o  ON c.customer_id = o.customer_id
UNION
SELECT c.name, o.order_id, o.total_amount
FROM customers AS c
RIGHT JOIN orders AS o  ON c.customer_id = o.customer_id;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  5. SELF JOIN                                             ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- A table joined to ITSELF. Common for hierarchical data
-- (employee → manager, category → parent category).

-- Find each employee and their manager's name
SELECT
    e.name          AS employee,
    e.department,
    e.salary,
    m.name          AS manager_name
FROM employees AS e
LEFT JOIN employees AS m  ON e.manager_id = m.employee_id
ORDER BY e.department;
-- LEFT JOIN ensures top-level managers (no manager) still appear (with NULL)


-- ╔══════════════════════════════════════════════════════════╗
-- ║  6. AGGREGATE FUNCTIONS                                   ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Aggregate functions compute a single result from multiple rows.
-- They collapse many rows into one summary value.

-- Core aggregate functions:
--   COUNT(*)        — number of rows
--   COUNT(column)   — number of non-NULL values in column
--   SUM(column)     — total of numeric column
--   AVG(column)     — average of numeric column
--   MIN(column)     — smallest value
--   MAX(column)     — largest value


-- ── COUNT examples
SELECT COUNT(*) AS total_orders        FROM orders;              -- All rows
SELECT COUNT(*) AS delivered_orders    FROM orders WHERE status = 'Delivered';
SELECT COUNT(DISTINCT customer_id) AS unique_customers FROM orders;
SELECT COUNT(manager_id) AS employees_with_manager FROM employees; -- NULLs excluded


-- ── SUM examples
SELECT SUM(total_amount) AS total_revenue        FROM orders;
SELECT SUM(total_amount) AS delivered_revenue    FROM orders WHERE status = 'Delivered';


-- ── AVG examples
SELECT AVG(total_amount) AS average_order_value  FROM orders;
SELECT AVG(salary)       AS average_salary        FROM employees;
SELECT ROUND(AVG(price), 2) AS avg_product_price FROM products;


-- ── MIN / MAX examples
SELECT MIN(price) AS cheapest, MAX(price) AS most_expensive FROM products;
SELECT MIN(order_date) AS first_order, MAX(order_date) AS latest_order FROM orders;
SELECT MIN(salary) AS lowest_salary, MAX(salary) AS highest_salary FROM employees;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  7. GROUP BY — Aggregate per Category                     ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- GROUP BY groups rows that share the same value in a column,
-- then applies an aggregate function to each group separately.
-- Every column in SELECT must be either:
--   (a) in the GROUP BY clause, or
--   (b) inside an aggregate function.

-- Syntax:
--   SELECT column, AGG_FUNC(col)
--   FROM table
--   GROUP BY column;


-- ── Orders per status
SELECT
    status,
    COUNT(*) AS order_count
FROM orders
GROUP BY status;


-- ── Revenue by order status
SELECT
    status,
    COUNT(*)            AS num_orders,
    SUM(total_amount)   AS total_revenue,
    AVG(total_amount)   AS avg_order_value
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;


-- ── Revenue per customer (join + group)
SELECT
    c.name              AS customer,
    COUNT(o.order_id)   AS total_orders,
    SUM(o.total_amount) AS total_spent
FROM customers AS c
INNER JOIN orders AS o  ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
ORDER BY total_spent DESC;


-- ── Product sales summary (items + products + aggregate)
SELECT
    p.category,
    COUNT(DISTINCT oi.order_id)         AS orders_containing_category,
    SUM(oi.quantity)                    AS total_units_sold,
    SUM(oi.quantity * oi.unit_price)    AS total_revenue
FROM order_items AS oi
JOIN products AS p  ON oi.product_id = p.product_id
GROUP BY p.category
ORDER BY total_revenue DESC;


-- ── Employees per department with salary stats
SELECT
    department,
    COUNT(*)            AS headcount,
    MIN(salary)         AS min_salary,
    MAX(salary)         AS max_salary,
    ROUND(AVG(salary),0)AS avg_salary,
    SUM(salary)         AS total_payroll
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;


-- ── Sales by month (date truncation)
-- PostgreSQL:
SELECT
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*)                        AS orders,
    SUM(total_amount)               AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- MySQL equivalent:
-- GROUP BY DATE_FORMAT(order_date, '%Y-%m')


-- ── GROUP BY multiple columns
SELECT
    status,
    EXTRACT(YEAR FROM order_date) AS year,
    COUNT(*)            AS num_orders,
    SUM(total_amount)   AS revenue
FROM orders
GROUP BY status, EXTRACT(YEAR FROM order_date)
ORDER BY year, status;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  8. HAVING — Filter Groups                                ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- HAVING is like WHERE, but it filters AFTER GROUP BY aggregation.
-- WHERE filters individual rows BEFORE grouping.
-- HAVING filters groups AFTER aggregation.

-- Rule of thumb:
--   Use WHERE  → to filter rows        (before GROUP BY)
--   Use HAVING → to filter aggregates  (after GROUP BY)

-- Syntax:
--   SELECT column, AGG_FUNC(col)
--   FROM table
--   WHERE row_condition
--   GROUP BY column
--   HAVING aggregate_condition;


-- ── Customers who placed more than 1 order
SELECT
    c.name,
    COUNT(o.order_id) AS num_orders
FROM customers AS c
JOIN orders AS o  ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.name
HAVING COUNT(o.order_id) > 1
ORDER BY num_orders DESC;


-- ── Categories with average price above ₹5000
SELECT
    category,
    COUNT(*)          AS products_count,
    ROUND(AVG(price),2) AS avg_price
FROM products
GROUP BY category
HAVING AVG(price) > 5000
ORDER BY avg_price DESC;


-- ── Departments with total payroll above ₹1,50,000
SELECT
    department,
    COUNT(*)          AS headcount,
    SUM(salary)       AS total_payroll
FROM employees
GROUP BY department
HAVING SUM(salary) > 150000
ORDER BY total_payroll DESC;


-- ── Customers who spent more than ₹10,000 total (Delivered orders only)
SELECT
    c.name,
    COUNT(o.order_id)   AS orders,
    SUM(o.total_amount) AS total_spent
FROM customers AS c
JOIN orders AS o  ON c.customer_id = o.customer_id
WHERE o.status = 'Delivered'          -- filter rows BEFORE grouping
GROUP BY c.customer_id, c.name
HAVING SUM(o.total_amount) > 10000    -- filter groups AFTER grouping
ORDER BY total_spent DESC;


-- ── Products that appear in more than 1 order
SELECT
    p.name,
    p.category,
    COUNT(DISTINCT oi.order_id) AS times_ordered,
    SUM(oi.quantity)            AS total_units_sold
FROM products AS p
JOIN order_items AS oi  ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name, p.category
HAVING COUNT(DISTINCT oi.order_id) > 1
ORDER BY times_ordered DESC;


-- ══════════════════════════════════════════════════════════════
--  FULL CLAUSE ORDER SUMMARY
-- ══════════════════════════════════════════════════════════════

-- Writing order:
--   SELECT
--   FROM
--   JOIN ... ON ...
--   WHERE         ← filter rows (before grouping)
--   GROUP BY      ← group rows
--   HAVING        ← filter groups (after grouping)
--   ORDER BY      ← sort final result
--   LIMIT         ← restrict rows returned

-- Execution order (how SQL processes it):
--   FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT


-- ── Full example combining everything learned in Weeks 7 & 8:
-- "Top 3 customers (India only) by total delivered order value,
--  who placed more than 1 order, newest customer first."
SELECT
    c.name,
    c.city,
    c.signup_date,
    COUNT(o.order_id)   AS num_orders,
    SUM(o.total_amount) AS total_spent
FROM customers AS c
JOIN orders AS o  ON c.customer_id = o.customer_id
WHERE c.country = 'India'
  AND o.status = 'Delivered'
GROUP BY c.customer_id, c.name, c.city, c.signup_date
HAVING COUNT(o.order_id) > 1
ORDER BY total_spent DESC
LIMIT 3;


-- ══════════════════════════════════════════════════════════════
--  ✅ PRACTICE EXERCISES — Week 8
-- ══════════════════════════════════════════════════════════════

-- JOINS (Easy):
-- 1. Show every order with the customer's name and city.
-- 2. List all order items with product name, category, and line total (qty × unit_price).
-- 3. Find employees and their manager's name. Show NULL if no manager.

-- JOINS (Medium):
-- 4. Find customers who have NEVER placed an order (LEFT JOIN + IS NULL).
-- 5. List all products with total quantity ever ordered (include products never ordered as 0).
-- 6. Show full order details: customer name, product name, quantity, unit price, order status.

-- AGGREGATION (Easy):
-- 7. How many orders are in each status?
-- 8. What is the average salary per department?
-- 9. What is the total and average order value across all orders?

-- AGGREGATION (Medium):
-- 10. Total revenue per customer — sorted highest to lowest.
-- 11. How many products in each category? What is the min, max, avg price per category?
-- 12. How many orders did each customer place? (Only include customers who ordered.)

-- HAVING (Medium):
-- 13. Which departments have more than 2 employees?
-- 14. Which customers have placed orders with total value > ₹5000 in aggregate?
-- 15. Which product categories have average price above ₹3000?

-- CHALLENGE:
-- 16. For each customer, show total orders, total spent, and avg order value.
--     Only include customers with avg order value > ₹5000.
-- 17. Find the top 3 best-selling products by total units sold.
-- 18. Show monthly revenue for 2023 — month name, order count, total revenue.
