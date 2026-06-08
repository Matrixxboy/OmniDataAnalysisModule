-- ============================================================
-- SQL QUICK REFERENCE CHEAT SHEET
-- Module 2 — All Topics (Weeks 7, 8, 9)
-- ============================================================


-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--  WEEK 7 — SQL BASICS
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ── Clause Writing Order
-- SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT

-- ── Clause Execution Order
-- FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

-- ── SELECT
SELECT *                          -- all columns
SELECT col1, col2                 -- specific columns
SELECT col1 AS alias              -- rename output column
SELECT col1 * 1.18 AS with_gst   -- calculated column
SELECT DISTINCT col1              -- remove duplicates

-- ── WHERE Operators
-- =   equal             col = 'India'
-- <>  not equal         col <> 'Cancelled'
-- >   greater than      price > 5000
-- <   less than         price < 1000
-- >=  greater or equal  price >= 500
-- <=  less or equal     qty <= 100
-- BETWEEN a AND b       price BETWEEN 100 AND 500   (inclusive)
-- IN (list)             status IN ('A','B','C')
-- NOT IN (list)         country NOT IN ('X','Y')
-- LIKE 'pattern'        name LIKE 'A%'   (% = any chars, _ = one char)
-- IS NULL               manager_id IS NULL
-- IS NOT NULL           email IS NOT NULL
-- AND / OR / NOT        combine conditions

-- ── ORDER BY
ORDER BY col ASC          -- ascending (default)
ORDER BY col DESC         -- descending
ORDER BY col1, col2 DESC  -- multi-column sort

-- ── LIMIT & OFFSET
LIMIT 10                  -- first 10 rows
LIMIT 10 OFFSET 20        -- rows 21-30 (pagination)

-- ── CASE WHEN (inline if-else)
CASE
    WHEN price < 1000  THEN 'Budget'
    WHEN price < 10000 THEN 'Mid-Range'
    ELSE                    'Premium'
END AS price_tier


-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--  WEEK 8 — JOINS & AGGREGATIONS
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ── JOIN Types
-- INNER JOIN      → matching rows only (both tables)
-- LEFT JOIN       → all left rows + matching right (NULL if no match)
-- RIGHT JOIN      → all right rows + matching left (NULL if no match)
-- FULL OUTER JOIN → all rows from both (NULLs where no match)
-- SELF JOIN       → table joined to itself (hierarchies)
-- CROSS JOIN      → every combination of rows (cartesian product)

-- ── JOIN Template
SELECT t1.col, t2.col
FROM   table1 AS t1
JOIN   table2 AS t2  ON t1.key = t2.key;

-- ── Find unmatched rows (anti-join pattern)
SELECT * FROM A
LEFT JOIN B ON A.id = B.id
WHERE B.id IS NULL;           -- rows in A with NO match in B

-- ── Aggregate Functions
COUNT(*)          -- count all rows (includes NULLs)
COUNT(col)        -- count non-NULL values
COUNT(DISTINCT c) -- count unique non-NULL values
SUM(col)          -- total
AVG(col)          -- average (ignores NULLs)
MIN(col)          -- smallest value
MAX(col)          -- largest value
ROUND(val, 2)     -- round to 2 decimal places

-- ── GROUP BY
SELECT dept, COUNT(*), AVG(salary)
FROM employees
GROUP BY dept;
-- All non-aggregated SELECT columns MUST be in GROUP BY

-- ── HAVING  (filter after grouping)
GROUP BY dept
HAVING COUNT(*) > 2        -- departments with more than 2 employees
HAVING AVG(salary) > 60000 -- departments with avg salary above 60k

-- ── WHERE vs HAVING
-- WHERE  → filters rows    BEFORE GROUP BY   (uses column values)
-- HAVING → filters groups  AFTER  GROUP BY   (uses aggregate results)


-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--  WEEK 9 — ADVANCED SQL
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ── Subquery Types
-- Scalar   → returns 1 value  → use in WHERE, SELECT
-- Table    → returns rows     → use in FROM (alias required)
-- IN/NOT IN → returns a list  → use in WHERE col IN (SELECT ...)
-- EXISTS   → returns boolean  → use in WHERE EXISTS (SELECT 1 ...)
-- Correlated → refs outer query → runs once per outer row

-- ── CTE (WITH clause)
WITH cte_name AS (
    SELECT ...
    FROM   ...
)
SELECT * FROM cte_name
WHERE condition;

-- ── Multiple CTEs
WITH cte1 AS (SELECT ...),
     cte2 AS (SELECT ... FROM cte1)  -- cte2 can reference cte1
SELECT * FROM cte2;

-- ── Window Function Syntax
function() OVER (
    PARTITION BY col   -- restart window for each group (optional)
    ORDER BY    col    -- order within window (required for ranking/LAG)
    ROWS BETWEEN ...   -- window frame (optional)
)

-- ── Ranking Functions
ROW_NUMBER() OVER (ORDER BY col DESC)               -- 1,2,3,4 (no ties)
RANK()        OVER (ORDER BY col DESC)              -- 1,2,2,4 (gap on tie)
DENSE_RANK()  OVER (ORDER BY col DESC)              -- 1,2,2,3 (no gap)
NTILE(4)      OVER (ORDER BY col)                   -- split into 4 buckets
PERCENT_RANK() OVER (ORDER BY col)                  -- 0.0 to 1.0

-- ── Top N per Group (most common interview pattern)
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY group_col ORDER BY rank_col DESC) AS rn
    FROM table
) AS ranked
WHERE rn <= 3;

-- ── LAG / LEAD
LAG(col, 1)  OVER (ORDER BY date_col)   -- previous row value
LEAD(col, 1) OVER (ORDER BY date_col)   -- next row value
-- Use for: month-over-month, day-over-day, comparing with neighbour

-- ── Running Total
SUM(col) OVER (ORDER BY date_col)                           -- cumulative sum
SUM(col) OVER (PARTITION BY group ORDER BY date_col)        -- cumulative per group

-- ── Moving Average (3-row rolling window)
AVG(col) OVER (
    ORDER BY date_col
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

-- ── Window Frame Reference
-- ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  → running total
-- ROWS BETWEEN 2 PRECEDING AND CURRENT ROW           → 3-row rolling
-- ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING           → centred 3-row
-- ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING   → reverse running total


-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--  COMMON FUNCTIONS REFERENCE
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- ── String Functions
UPPER(col)                  -- 'hello' → 'HELLO'
LOWER(col)                  -- 'HELLO' → 'hello'
LENGTH(col)                 -- number of characters
TRIM(col)                   -- remove leading/trailing spaces
LTRIM / RTRIM               -- remove from left or right only
SUBSTRING(col, 1, 3)        -- extract 3 chars from position 1
REPLACE(col, 'old', 'new')  -- replace text
CONCAT(col1, ' ', col2)     -- join strings (MySQL)
col1 || ' ' || col2         -- join strings (PostgreSQL)
COALESCE(col, 'default')    -- return first non-NULL value
NULLIF(col, 0)              -- return NULL if value = 0 (avoids div/0)

-- ── Numeric Functions
ROUND(col, 2)               -- round to 2 decimals
CEIL(col)                   -- round up
FLOOR(col)                  -- round down
ABS(col)                    -- absolute value
MOD(col, 2)                 -- remainder (0=even, 1=odd)

-- ── Date Functions (PostgreSQL)
CURRENT_DATE                            -- today's date
NOW()                                   -- current timestamp
EXTRACT(YEAR  FROM date_col)            -- extract year
EXTRACT(MONTH FROM date_col)            -- extract month
DATE_TRUNC('month', date_col)           -- truncate to month start
date_col + INTERVAL '7 days'            -- add 7 days
AGE(date_col)                           -- time since date
date1 - date2                           -- difference in days

-- ── NULL Handling
COALESCE(a, b, c)           -- first non-NULL among a, b, c
NULLIF(a, b)                -- return NULL if a = b, else return a
IS NULL                     -- check for NULL
IS NOT NULL                 -- check not NULL


-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
--  INTERVIEW PATTERNS — MUST KNOW
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- 1. Nth highest value per group      → ROW_NUMBER / DENSE_RANK
-- 2. Customers with no orders         → LEFT JOIN + IS NULL / NOT EXISTS
-- 3. Month-over-month change          → LAG() with date ordering
-- 4. Running total                    → SUM() OVER (ORDER BY date)
-- 5. Percentage of total              → col / SUM(col) OVER () * 100
-- 6. Deduplicate (keep latest row)    → ROW_NUMBER() OVER (PARTITION BY id ORDER BY date DESC) = 1
-- 7. Self-referencing hierarchy       → SELF JOIN or Recursive CTE
-- 8. Conditional aggregation          → SUM(CASE WHEN ... THEN 1 ELSE 0 END)

-- ── Conditional Aggregation (Pivot-style)
SELECT
    department,
    SUM(CASE WHEN salary > 70000 THEN 1 ELSE 0 END) AS high_earners,
    SUM(CASE WHEN salary <= 70000 THEN 1 ELSE 0 END) AS others
FROM employees
GROUP BY department;

-- ── Percentage of total
SELECT
    category,
    SUM(price)                                    AS category_total,
    ROUND(SUM(price) / SUM(SUM(price)) OVER () * 100, 1) AS pct_of_total
FROM products
GROUP BY category;

-- ── Deduplication — keep only the latest order per customer
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
    FROM orders
) AS latest
WHERE rn = 1;
