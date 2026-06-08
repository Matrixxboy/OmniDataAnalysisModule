-- ============================================================
-- ADVANCED SQL — Practice Solutions
-- Topic 9 | Week 9
-- ============================================================


-- ── Exercise 1: Products priced above overall average
SELECT name, category, price
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price DESC;


-- ── Exercise 2: Customers who ordered Electronics
SELECT DISTINCT c.name, c.city
FROM customers AS c
WHERE c.customer_id IN (
    SELECT o.customer_id
    FROM orders AS o
    JOIN order_items AS oi ON o.order_id = oi.order_id
    JOIN products    AS p  ON oi.product_id = p.product_id
    WHERE p.category = 'Electronics'
);


-- ── Exercise 3: Orders above average order value
SELECT order_id, customer_id, order_date, total_amount, status
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders)
ORDER BY total_amount DESC;


-- ── Exercise 4: Employees earning more than their dept average (correlated)
SELECT e.name, e.department, e.salary
FROM employees AS e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.department = e.department
)
ORDER BY e.department, e.salary DESC;


-- ── Exercise 5: Most expensive product in each category
SELECT category, name, price
FROM (
    SELECT
        category,
        name,
        price,
        RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rnk
    FROM products
) AS ranked
WHERE rnk = 1;


-- ── Exercise 6: Customers who have ALL three order statuses
SELECT c.name
FROM customers AS c
WHERE c.customer_id IN (
    SELECT customer_id FROM orders WHERE status = 'Delivered'
)
AND c.customer_id IN (
    SELECT customer_id FROM orders WHERE status = 'Pending'
)
AND c.customer_id IN (
    SELECT customer_id FROM orders WHERE status = 'Cancelled'
);


-- ── Exercise 7: CTE — Top 3 revenue customers with city/country
WITH customer_revenue AS (
    SELECT
        c.customer_id,
        c.name,
        c.city,
        c.country,
        SUM(o.total_amount) AS total_spent
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.name, c.city, c.country
)
SELECT name, city, country, total_spent
FROM customer_revenue
ORDER BY total_spent DESC
LIMIT 3;


-- ── Exercise 8: CTE — Monthly revenue with MoM change
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month)                             AS prev_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month)                   AS change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100
    , 1)                                                           AS pct_change
FROM monthly_revenue
ORDER BY month;


-- ── Exercise 9: Chained CTEs — customer totals ranked within country
WITH customer_totals AS (
    SELECT
        c.customer_id,
        c.name,
        c.country,
        c.city,
        SUM(o.total_amount) AS total_spent
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.name, c.country, c.city
),
ranked_customers AS (
    SELECT
        *,
        RANK() OVER (PARTITION BY country ORDER BY total_spent DESC) AS rank_in_country
    FROM customer_totals
)
SELECT name, country, city, total_spent, rank_in_country
FROM ranked_customers
ORDER BY country, rank_in_country;


-- ── Exercise 10: Rank employees by salary — overall and within department
SELECT
    name,
    department,
    salary,
    RANK()       OVER (ORDER BY salary DESC)                       AS overall_rank,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees
ORDER BY department, dept_rank;


-- ── Exercise 11: Top 2 best-selling products per category
SELECT *
FROM (
    SELECT
        p.category,
        p.name,
        SUM(oi.quantity)                 AS units_sold,
        SUM(oi.quantity * oi.unit_price) AS revenue,
        ROW_NUMBER() OVER (
            PARTITION BY p.category
            ORDER BY SUM(oi.quantity) DESC
        ) AS rn
    FROM products AS p
    JOIN order_items AS oi ON p.product_id = oi.product_id
    GROUP BY p.category, p.product_id, p.name
) AS ranked
WHERE rn <= 2
ORDER BY category, rn;


-- ── Exercise 12: Running total of order amounts by date
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (ORDER BY order_date, order_id) AS running_total
FROM orders
ORDER BY order_date;


-- ── Exercise 13: Month-over-month revenue growth % for 2023
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    WHERE EXTRACT(YEAR FROM order_date) = 2023
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    TO_CHAR(month, 'Mon YYYY')                                     AS month_name,
    revenue,
    LAG(revenue) OVER (ORDER BY month)                             AS prev_month,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100
    , 1)                                                           AS growth_pct
FROM monthly
ORDER BY month;


-- ── Exercise 14: Each customer's orders with cumulative spend and order number
SELECT
    c.name          AS customer,
    o.order_id,
    o.order_date,
    o.total_amount,
    ROW_NUMBER() OVER (PARTITION BY o.customer_id ORDER BY o.order_date) AS order_num,
    SUM(o.total_amount) OVER (
        PARTITION BY o.customer_id
        ORDER BY o.order_date
    )                                                              AS cumulative_spend
FROM orders AS o
JOIN customers AS c ON o.customer_id = c.customer_id
ORDER BY c.name, o.order_date;


-- ── Exercise 15: Employees in top 25% salary of their department
SELECT name, department, salary, percentile
FROM (
    SELECT
        name,
        department,
        salary,
        ROUND(PERCENT_RANK() OVER (
            PARTITION BY department ORDER BY salary
        ) * 100, 1) AS percentile
    FROM employees
) AS ranked
WHERE percentile >= 75
ORDER BY department, salary DESC;


-- ── Exercise 16 (Challenge): Second highest salary per department (no LIMIT)
SELECT department, name, salary
FROM (
    SELECT
        department,
        name,
        salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk
    FROM employees
) AS ranked
WHERE rnk = 2
ORDER BY department;


-- ── Exercise 17 (Challenge): Best-selling product each month
SELECT *
FROM (
    SELECT
        DATE_TRUNC('month', o.order_date)   AS month,
        p.name                              AS product,
        SUM(oi.quantity)                    AS units_sold,
        ROW_NUMBER() OVER (
            PARTITION BY DATE_TRUNC('month', o.order_date)
            ORDER BY SUM(oi.quantity) DESC
        ) AS rn
    FROM orders AS o
    JOIN order_items AS oi ON o.order_id     = oi.order_id
    JOIN products    AS p  ON oi.product_id  = p.product_id
    GROUP BY DATE_TRUNC('month', o.order_date), p.product_id, p.name
) AS monthly_best
WHERE rn = 1
ORDER BY month;


-- ── Exercise 18 (Challenge): 3-month rolling average revenue
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    TO_CHAR(month, 'Mon YYYY') AS month_name,
    revenue,
    ROUND(
        AVG(revenue) OVER (
            ORDER BY month
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        )
    , 2)                       AS rolling_avg_3m
FROM monthly
ORDER BY month;
