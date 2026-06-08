-- ============================================================
-- ADVANCED SQL — Complete Notes & Queries
-- Topic 9 | Week 9
-- Covers: Subqueries, CTEs, Window Functions
-- ============================================================


-- ╔══════════════════════════════════════════════════════════╗
-- ║  PART 1: SUBQUERIES                                       ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- A subquery (inner query / nested query) is a SELECT statement
-- written inside another SQL statement. The inner query runs
-- first, and its result is used by the outer query.

-- Types of subqueries:
--   1. Scalar subquery    — returns a single value
--   2. Row subquery       — returns a single row
--   3. Table subquery     — returns a result set (used as a table)
--   4. Correlated subquery — references columns from the outer query


-- ── TYPE 1: Scalar Subquery — returns one value
-- "Find products priced above the average price"
SELECT name, category, price
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price DESC;
-- The subquery (SELECT AVG(price) FROM products) returns one number.
-- The outer query uses it like a constant: WHERE price > 7341.67


-- ── Scalar subquery in SELECT column
-- "Show each product with the difference from average price"
SELECT
    name,
    price,
    (SELECT AVG(price) FROM products)          AS avg_price,
    price - (SELECT AVG(price) FROM products)  AS diff_from_avg
FROM products
ORDER BY diff_from_avg DESC;


-- ── TYPE 2: Subquery with IN — match against a list
-- "Find customers who placed at least one Delivered order"
SELECT name, city, email
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE status = 'Delivered'
);


-- ── NOT IN — exclude a set
-- "Find customers who have NO delivered orders"
SELECT name, city
FROM customers
WHERE customer_id NOT IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE status = 'Delivered'
);
-- WARNING: NOT IN fails silently if the subquery returns any NULL.
-- Prefer NOT EXISTS for safety (see below).


-- ── TYPE 3: Table Subquery in FROM (Derived Table / Inline View)
-- "Find the average order value per customer, then filter those above ₹10,000"
SELECT *
FROM (
    SELECT
        c.name,
        c.city,
        COUNT(o.order_id)          AS num_orders,
        AVG(o.total_amount)        AS avg_order_value
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.name, c.city
) AS customer_summary
WHERE avg_order_value > 10000;
-- The subquery acts like a temporary table called "customer_summary".
-- You must alias subqueries in FROM (AS customer_summary).


-- ── Subquery in FROM — top product per category
SELECT *
FROM (
    SELECT
        p.category,
        p.name,
        p.price,
        RANK() OVER (PARTITION BY p.category ORDER BY p.price DESC) AS price_rank
    FROM products AS p
) AS ranked_products
WHERE price_rank = 1;
-- Gets the most expensive product in each category.


-- ── TYPE 4: Correlated Subquery
-- CONCEPT: A correlated subquery references a column from the OUTER query.
-- It runs once PER ROW of the outer query (can be slow on large tables).

-- "Find employees who earn more than the average salary in THEIR department"
SELECT
    e.name,
    e.department,
    e.salary
FROM employees AS e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees AS e2
    WHERE e2.department = e.department  -- references outer query's e.department
)
ORDER BY e.department, e.salary DESC;


-- ── EXISTS / NOT EXISTS — efficient correlated subquery
-- "Find customers who have placed at least one order"
SELECT c.name, c.email
FROM customers AS c
WHERE EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);
-- EXISTS returns TRUE as soon as ONE match is found (faster than IN for large tables).


-- "Find customers with no orders (safer than NOT IN)"
SELECT c.name, c.email
FROM customers AS c
WHERE NOT EXISTS (
    SELECT 1
    FROM orders AS o
    WHERE o.customer_id = c.customer_id
);


-- ── Subquery in HAVING
-- "Find product categories where total revenue exceeds the overall avg category revenue"
SELECT
    p.category,
    SUM(oi.quantity * oi.unit_price) AS category_revenue
FROM products AS p
JOIN order_items AS oi ON p.product_id = oi.product_id
GROUP BY p.category
HAVING SUM(oi.quantity * oi.unit_price) > (
    SELECT AVG(cat_rev)
    FROM (
        SELECT SUM(oi2.quantity * oi2.unit_price) AS cat_rev
        FROM order_items AS oi2
        JOIN products AS p2 ON oi2.product_id = p2.product_id
        GROUP BY p2.category
    ) AS category_totals
);


-- ╔══════════════════════════════════════════════════════════╗
-- ║  PART 2: CTEs (Common Table Expressions)                  ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- A CTE (WITH clause) gives a temporary, named result set that
-- you can reference in the main query. It runs only once (unlike
-- a correlated subquery) and makes complex queries much more readable.

-- Syntax:
--   WITH cte_name AS (
--       SELECT ...
--   )
--   SELECT *
--   FROM cte_name;

-- Benefits over subqueries:
--   ✅ Readable — name your logic clearly
--   ✅ Reusable — reference same CTE multiple times
--   ✅ Chainable — one CTE can reference a previous CTE
--   ✅ Debuggable — test each CTE independently


-- ── Basic CTE
-- "Customers who spent more than ₹5000 total"
WITH customer_totals AS (
    SELECT
        c.customer_id,
        c.name,
        c.city,
        SUM(o.total_amount) AS total_spent
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.name, c.city
)
SELECT *
FROM customer_totals
WHERE total_spent > 5000
ORDER BY total_spent DESC;


-- ── CTE replacing a FROM subquery (more readable)
-- "Average order value per customer — filter high spenders"
WITH order_summary AS (
    SELECT
        customer_id,
        COUNT(*)           AS num_orders,
        AVG(total_amount)  AS avg_order_value,
        SUM(total_amount)  AS total_spent
    FROM orders
    WHERE status = 'Delivered'
    GROUP BY customer_id
)
SELECT
    c.name,
    c.city,
    os.num_orders,
    ROUND(os.avg_order_value, 2) AS avg_order,
    os.total_spent
FROM customers AS c
JOIN order_summary AS os ON c.customer_id = os.customer_id
WHERE os.avg_order_value > 5000
ORDER BY os.total_spent DESC;


-- ── Multiple CTEs (chained) — separated by comma
-- "Top-spending customer per city"
WITH customer_totals AS (
    SELECT
        c.customer_id,
        c.name,
        c.city,
        SUM(o.total_amount) AS total_spent
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    GROUP BY c.customer_id, c.name, c.city
),
ranked_by_city AS (
    SELECT
        *,
        RANK() OVER (PARTITION BY city ORDER BY total_spent DESC) AS rank_in_city
    FROM customer_totals
)
SELECT city, name, total_spent
FROM ranked_by_city
WHERE rank_in_city = 1
ORDER BY total_spent DESC;


-- ── CTE for revenue trend analysis
WITH monthly_revenue AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        COUNT(*)                        AS num_orders,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    num_orders,
    revenue,
    SUM(revenue) OVER (ORDER BY month) AS cumulative_revenue
FROM monthly_revenue
ORDER BY month;


-- ── Recursive CTE — Employee hierarchy (manager → direct reports)
WITH RECURSIVE employee_tree AS (
    -- Anchor: start with top-level managers (no manager_id)
    SELECT employee_id, name, department, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: join each employee to their manager
    SELECT e.employee_id, e.name, e.department, e.manager_id, et.level + 1
    FROM employees AS e
    INNER JOIN employee_tree AS et ON e.manager_id = et.employee_id
)
SELECT
    REPEAT('  ', level - 1) || name AS org_tree,
    department,
    level
FROM employee_tree
ORDER BY level, department;
-- Recursive CTEs are powerful for hierarchical/tree-structured data.


-- ╔══════════════════════════════════════════════════════════╗
-- ║  PART 3: WINDOW FUNCTIONS                                 ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- Window functions perform calculations ACROSS a set of rows
-- related to the current row — WITHOUT collapsing them like GROUP BY.
-- Each row keeps its individual identity; the function adds an extra column.

-- Key difference:
--   GROUP BY:          many rows → 1 summary row
--   Window Function:   many rows → same rows + new calculated column

-- Syntax:
--   function_name() OVER (
--       [PARTITION BY column]   -- divide into groups (like GROUP BY but rows kept)
--       [ORDER BY column]       -- order within each partition
--       [ROWS/RANGE BETWEEN ...] -- define the window frame
--   )


-- ── OVER() with no arguments — applies to the ENTIRE result set
SELECT
    name,
    salary,
    AVG(salary) OVER () AS company_avg_salary,
    salary - AVG(salary) OVER () AS diff_from_company_avg
FROM employees;


-- ── PARTITION BY — restart the window for each group
SELECT
    name,
    department,
    salary,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_dept_avg
FROM employees
ORDER BY department;
-- Unlike GROUP BY, we can still see each employee row.


-- ──────────────────────────────────────────────────────────
--  RANKING FUNCTIONS
-- ──────────────────────────────────────────────────────────

-- ROW_NUMBER() — unique sequential number, no gaps, no ties
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS overall_row_num,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_row_num
FROM employees;
-- ROW_NUMBER gives 1,2,3,4... even if two rows have equal salary.


-- RANK() — ranking with gaps on ties
-- If two rows tie at position 2, next row is position 4 (2,2,4)
SELECT
    name, department, salary,
    RANK() OVER (ORDER BY salary DESC) AS overall_rank,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;


-- DENSE_RANK() — ranking WITHOUT gaps on ties
-- If two rows tie at position 2, next row is position 3 (2,2,3)
SELECT
    name, department, salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_overall
FROM employees;


-- ── Compare all three ranking functions side by side
SELECT
    name,
    salary,
    ROW_NUMBER()  OVER (ORDER BY salary DESC) AS row_num,
    RANK()        OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK()  OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
-- Study how they differ when two employees have equal salary.


-- ── TOP N per group using ROW_NUMBER (most common interview pattern!)
-- "Top 2 highest-paid employees per department"
SELECT *
FROM (
    SELECT
        name,
        department,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) AS ranked
WHERE rn <= 2
ORDER BY department, rn;


-- ── Top 1 using ROW_NUMBER (latest order per customer)
SELECT *
FROM (
    SELECT
        customer_id,
        order_id,
        order_date,
        total_amount,
        status,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
    FROM orders
) AS latest
WHERE rn = 1;
-- Gets the most recent order for each customer.


-- ── NTILE(n) — divide rows into n buckets
SELECT
    name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS salary_quartile
FROM employees;
-- Quartile 1 = top 25%, Quartile 4 = bottom 25%


-- ── PERCENT_RANK() — relative position as percentage
SELECT
    name,
    salary,
    ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) AS percentile
FROM employees;


-- ──────────────────────────────────────────────────────────
--  LAG() AND LEAD() — Access Adjacent Rows
-- ──────────────────────────────────────────────────────────

-- CONCEPT:
-- LAG()  — looks at a PREVIOUS row's value
-- LEAD() — looks at a NEXT row's value
-- Essential for: month-over-month change, year-over-year growth,
--                detecting trends, comparing with previous record.

-- Syntax:
--   LAG(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)
--   offset = how many rows back (default 1)
--   default = what to return if no previous row (default NULL)


-- ── Month-over-month revenue change
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month)                   AS prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month)         AS revenue_change,
    ROUND(
        (revenue - LAG(revenue) OVER (ORDER BY month))
        / NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100
    , 1)                                                 AS pct_change
FROM monthly
ORDER BY month;


-- ── Compare each employee's salary to the person hired before them
SELECT
    name,
    hire_date,
    salary,
    LAG(salary) OVER (ORDER BY hire_date)  AS prev_hire_salary,
    LEAD(salary) OVER (ORDER BY hire_date) AS next_hire_salary
FROM employees
ORDER BY hire_date;


-- ── LAG within partition — department-wise
SELECT
    name,
    department,
    salary,
    LAG(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS prev_salary_in_dept,
    salary - LAG(salary) OVER (PARTITION BY department ORDER BY salary DESC) AS diff
FROM employees
ORDER BY department, salary DESC;


-- ──────────────────────────────────────────────────────────
--  RUNNING TOTALS AND MOVING AVERAGES
-- ──────────────────────────────────────────────────────────

-- ── Running total (cumulative sum)
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    SUM(revenue) OVER (ORDER BY month)   AS cumulative_revenue,
    COUNT(*)     OVER (ORDER BY month)   AS months_elapsed
FROM monthly
ORDER BY month;


-- ── Running total within groups (per customer)
SELECT
    customer_id,
    order_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS cumulative_customer_spend
FROM orders
ORDER BY customer_id, order_date;


-- ── 3-month moving average (window frame)
WITH monthly AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(total_amount)               AS revenue
    FROM orders
    GROUP BY DATE_TRUNC('month', order_date)
)
SELECT
    month,
    revenue,
    ROUND(
        AVG(revenue) OVER (
            ORDER BY month
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        )
    , 2) AS moving_avg_3m
FROM monthly
ORDER BY month;
-- ROWS BETWEEN 2 PRECEDING AND CURRENT ROW = current row + 2 previous rows = 3 months


-- Window frame options:
-- ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  → running total from start
-- ROWS BETWEEN 2 PRECEDING AND CURRENT ROW           → 3-row rolling window
-- ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           → centred 3-row window
-- ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING   → reverse running total


-- ── First and Last value in a window
SELECT
    name,
    department,
    salary,
    FIRST_VALUE(name)  OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner,
    LAST_VALUE(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS lowest_salary_in_dept
FROM employees
ORDER BY department, salary DESC;


-- ╔══════════════════════════════════════════════════════════╗
-- ║  PUTTING IT ALL TOGETHER — Real-World Analytical Queries  ║
-- ╚══════════════════════════════════════════════════════════╝

-- ── Query 1: Customer lifetime value with rank and running total
WITH customer_stats AS (
    SELECT
        c.customer_id,
        c.name,
        c.city,
        c.country,
        COUNT(o.order_id)   AS total_orders,
        SUM(o.total_amount) AS lifetime_value
    FROM customers AS c
    JOIN orders AS o ON c.customer_id = o.customer_id
    WHERE o.status = 'Delivered'
    GROUP BY c.customer_id, c.name, c.city, c.country
)
SELECT
    name,
    city,
    country,
    total_orders,
    lifetime_value,
    RANK() OVER (ORDER BY lifetime_value DESC)                     AS overall_rank,
    RANK() OVER (PARTITION BY country ORDER BY lifetime_value DESC) AS rank_in_country,
    SUM(lifetime_value) OVER (ORDER BY lifetime_value DESC)        AS cumulative_revenue
FROM customer_stats
ORDER BY overall_rank;


-- ── Query 2: Product performance — sales trend, rank, and running contribution
WITH product_sales AS (
    SELECT
        p.product_id,
        p.name          AS product,
        p.category,
        SUM(oi.quantity)                    AS units_sold,
        SUM(oi.quantity * oi.unit_price)    AS total_revenue
    FROM products AS p
    JOIN order_items AS oi ON p.product_id = oi.product_id
    GROUP BY p.product_id, p.name, p.category
),
with_ranks AS (
    SELECT
        *,
        RANK()       OVER (ORDER BY total_revenue DESC)                     AS overall_rank,
        RANK()       OVER (PARTITION BY category ORDER BY total_revenue DESC) AS rank_in_category,
        SUM(total_revenue) OVER (ORDER BY total_revenue DESC)               AS cumulative_revenue,
        ROUND(
            SUM(total_revenue) OVER (ORDER BY total_revenue DESC)
            / SUM(total_revenue) OVER () * 100
        , 1)                                                                AS cumulative_pct
    FROM product_sales
)
SELECT *
FROM with_ranks
ORDER BY overall_rank;


-- ══════════════════════════════════════════════════════════════
--  ✅ PRACTICE EXERCISES — Week 9
-- ══════════════════════════════════════════════════════════════

-- SUBQUERIES (Easy):
-- 1. Find products priced above the overall average price.
-- 2. Find customers who ordered at least one item in the 'Electronics' category.
-- 3. Find orders with total_amount above the average order value.

-- SUBQUERIES (Medium):
-- 4. Find employees who earn more than the average salary in their own department.
-- 5. Find the most expensive product in each category (use subquery in FROM).
-- 6. Find customers who have placed orders for ALL three statuses (Delivered, Pending, Cancelled).

-- CTEs (Medium):
-- 7. Use a CTE to find the top 3 revenue-generating customers, then display their city and country.
-- 8. Write a CTE that calculates monthly revenue, then a main query that adds month-over-month change.
-- 9. Chain two CTEs: first calculate customer totals, then rank them within each country.

-- WINDOW FUNCTIONS (Medium):
-- 10. Rank all employees by salary (overall rank + rank within department).
-- 11. Find the top 2 best-selling products per category by total units sold.
-- 12. For each order, show the running total of total_amount ordered by date.

-- WINDOW FUNCTIONS (Hard):
-- 13. Calculate month-over-month revenue growth % for 2023.
-- 14. For each customer, show their orders with cumulative spending and order number.
-- 15. Find employees whose salary is in the top 25% of their department.

-- CHALLENGE (Interview-style):
-- 16. Find the second-highest salary in each department without using LIMIT.
-- 17. For each month, find the best-selling product (most units sold).
-- 18. Calculate a 3-month rolling average of monthly revenue.
