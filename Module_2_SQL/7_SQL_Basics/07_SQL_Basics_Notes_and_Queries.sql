-- ============================================================
-- SQL BASICS — Complete Notes & Explanation
-- Topic 7 | Week 7
-- ============================================================
-- HOW TO READ THIS FILE:
-- Lines starting with '--' are comments/explanations
-- All other lines are runnable SQL queries
-- Run on the sample_database_setup.sql tables
-- ============================================================


-- ╔══════════════════════════════════════════════════════════╗
-- ║  1. SELECT & FROM — The Foundation of Every Query        ║
-- ╚══════════════════════════════════════════════════════════╝

-- CONCEPT:
-- SELECT tells SQL *which columns* you want.
-- FROM tells SQL *which table* to get them from.
-- Every SQL query starts with SELECT ... FROM ...

-- Syntax:
--   SELECT column1, column2, ...
--   FROM table_name;


-- ── Basic: Select ALL columns using *
SELECT *
FROM customers;
-- Returns every row and every column from the customers table.
-- Avoid * in production — always name your columns explicitly.


-- ── Select specific columns only
SELECT name, city, country
FROM customers;
-- Only retrieves 3 columns, ignoring the rest.


-- ── Column Aliases — rename columns in output using AS
SELECT
    name        AS customer_name,
    city        AS customer_city,
    signup_date AS joined_on
FROM customers;
-- AS renames the column in the result only — the table is unchanged.
-- Aliases with spaces must use quotes: AS "Customer Name"


-- ── Select with a calculated column
SELECT
    name,
    price,
    price * 0.18   AS gst_amount,
    price * 1.18   AS price_with_gst
FROM products;
-- You can do arithmetic directly in SELECT.
-- Operators: + - * / %


-- ── Select a constant value for every row
SELECT
    name,
    'India'    AS default_country,
    2024       AS report_year
FROM customers;


-- ══════════════════════════════════════════════════════════════
--  2. WHERE — Filtering Rows
-- ══════════════════════════════════════════════════════════════

-- CONCEPT:
-- WHERE filters which rows are returned. Only rows where the
-- condition is TRUE are included. WHERE runs BEFORE SELECT.

-- Syntax:
--   SELECT ...
--   FROM table
--   WHERE condition;


-- ── Comparison operators
SELECT * FROM customers WHERE country = 'India';
SELECT * FROM products  WHERE price > 5000;
SELECT * FROM products  WHERE price <= 1500;
SELECT * FROM orders    WHERE status <> 'Cancelled';   -- <> means NOT EQUAL
SELECT * FROM orders    WHERE status != 'Cancelled';   -- same as above


-- ── BETWEEN — range filter (inclusive on both ends)
SELECT * FROM products
WHERE price BETWEEN 1000 AND 10000;
-- Same as: WHERE price >= 1000 AND price <= 10000


-- ── IN — match any value in a list
SELECT * FROM customers
WHERE country IN ('India', 'USA', 'UAE');
-- More readable than: WHERE country='India' OR country='USA' OR country='UAE'

-- NOT IN — exclude values
SELECT * FROM orders
WHERE status NOT IN ('Cancelled', 'Pending');


-- ── LIKE — pattern matching (partial text search)
-- %  = any number of characters (wildcard)
-- _  = exactly one character

SELECT * FROM customers WHERE name LIKE 'A%';      -- Names starting with 'A'
SELECT * FROM customers WHERE name LIKE '%a';       -- Names ending with 'a'
SELECT * FROM customers WHERE email LIKE '%@gmail%';-- Email contains '@gmail'
SELECT * FROM products  WHERE name LIKE 'Laptop%';  -- Products starting with 'Laptop'
SELECT * FROM customers WHERE name LIKE '_a%';      -- Second character is 'a'

-- ILIKE (PostgreSQL only) — case-insensitive LIKE
SELECT * FROM customers WHERE name ILIKE 'a%';


-- ── IS NULL / IS NOT NULL — handle missing values
SELECT * FROM employees WHERE manager_id IS NULL;     -- Top-level managers (no manager)
SELECT * FROM employees WHERE manager_id IS NOT NULL; -- Everyone who has a manager

-- NOTE: Never use = NULL. It doesn't work! Always use IS NULL.
-- WRONG: WHERE manager_id = NULL
-- RIGHT: WHERE manager_id IS NULL


-- ── AND / OR / NOT — combine multiple conditions
SELECT * FROM products
WHERE category = 'Electronics' AND price < 5000;
-- Both conditions must be true

SELECT * FROM customers
WHERE city = 'Mumbai' OR city = 'Delhi';
-- Either condition being true is enough

SELECT * FROM orders
WHERE status = 'Delivered' AND total_amount > 10000;
-- High-value completed orders

SELECT * FROM products
WHERE NOT category = 'Furniture';
-- All products except Furniture (same as category <> 'Furniture')


-- ── Operator precedence: AND evaluates before OR — use parentheses!
-- BAD (ambiguous):
SELECT * FROM orders WHERE status = 'Delivered' OR status = 'Pending' AND total_amount > 5000;

-- GOOD (clear intent):
SELECT * FROM orders
WHERE (status = 'Delivered' OR status = 'Pending') AND total_amount > 5000;


-- ══════════════════════════════════════════════════════════════
--  3. DISTINCT — Remove Duplicates
-- ══════════════════════════════════════════════════════════════

-- CONCEPT:
-- DISTINCT removes duplicate values from the result set.
-- It applies to ALL selected columns together (not just one).

-- Syntax:
--   SELECT DISTINCT column1, column2
--   FROM table;


-- ── Get unique list of countries
SELECT DISTINCT country
FROM customers;
-- Returns each country only once, even if many customers share it.


-- ── Unique combinations (DISTINCT across multiple columns)
SELECT DISTINCT category, country
FROM products, customers;
-- Returns unique pairs — both columns together must be unique.


-- ── Count of distinct values
SELECT COUNT(DISTINCT country) AS unique_countries
FROM customers;

SELECT COUNT(DISTINCT customer_id) AS unique_buyers
FROM orders;


-- ── Unique order statuses
SELECT DISTINCT status FROM orders;
-- Quickly tells you all possible values in the status column.


-- ══════════════════════════════════════════════════════════════
--  4. ORDER BY — Sorting Results
-- ══════════════════════════════════════════════════════════════

-- CONCEPT:
-- ORDER BY sorts the result set. Default is ascending (ASC).
-- Use DESC for descending. NULL values sort last in ASC (first in DESC).

-- Syntax:
--   SELECT ...
--   FROM ...
--   ORDER BY column1 [ASC|DESC], column2 [ASC|DESC];


-- ── Sort alphabetically (A → Z)
SELECT name, city FROM customers ORDER BY name ASC;

-- ── Sort reverse alphabetically (Z → A)
SELECT name, city FROM customers ORDER BY name DESC;

-- ── Sort products by price: cheapest first
SELECT name, price FROM products ORDER BY price ASC;

-- ── Sort products by price: most expensive first
SELECT name, price FROM products ORDER BY price DESC;

-- ── Sort by multiple columns (primary + secondary sort)
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
-- First sort by department A→Z, then within each dept sort salary high→low.

-- ── Sort by column position (number instead of name)
SELECT name, price, category
FROM products
ORDER BY 2 DESC;
-- 2 refers to the 2nd column in SELECT (price). Less readable, avoid if possible.

-- ── Sort by an alias
SELECT name, price * 1.18 AS price_with_gst
FROM products
ORDER BY price_with_gst DESC;

-- ── Sort NULLs: PostgreSQL lets you control NULL position
SELECT name, manager_id FROM employees ORDER BY manager_id ASC NULLS LAST;
SELECT name, manager_id FROM employees ORDER BY manager_id ASC NULLS FIRST;


-- ══════════════════════════════════════════════════════════════
--  5. LIMIT — Control Number of Rows Returned
-- ══════════════════════════════════════════════════════════════

-- CONCEPT:
-- LIMIT restricts the number of rows in the result.
-- Most useful when combined with ORDER BY (e.g. Top 5 products).
-- MySQL uses LIMIT; SQL Server uses TOP; Oracle uses ROWNUM or FETCH.

-- Syntax:
--   SELECT ...
--   FROM ...
--   ORDER BY ...
--   LIMIT n;


-- ── Get only 5 rows
SELECT * FROM customers LIMIT 5;

-- ── Top 3 most expensive products
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 3;

-- ── Bottom 5 lowest salary employees
SELECT name, salary
FROM employees
ORDER BY salary ASC
LIMIT 5;

-- ── Most recent 5 orders
SELECT order_id, customer_id, order_date, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 5;

-- ── LIMIT with OFFSET — skip N rows first (used for pagination)
-- Page 1 (rows 1-5):
SELECT * FROM customers ORDER BY customer_id LIMIT 5 OFFSET 0;

-- Page 2 (rows 6-10):
SELECT * FROM customers ORDER BY customer_id LIMIT 5 OFFSET 5;

-- Page 3 (rows 11-15):
SELECT * FROM customers ORDER BY customer_id LIMIT 5 OFFSET 10;


-- ══════════════════════════════════════════════════════════════
--  6. COMBINING EVERYTHING — Full Query Order
-- ══════════════════════════════════════════════════════════════

-- SQL CLAUSE EXECUTION ORDER (different from writing order!):
-- 1. FROM      — which table
-- 2. WHERE     — filter rows
-- 3. SELECT    — choose columns
-- 4. DISTINCT  — remove dupes
-- 5. ORDER BY  — sort
-- 6. LIMIT     — cut rows

-- WRITING ORDER (how you type it):
-- SELECT → FROM → WHERE → ORDER BY → LIMIT


-- ── Example 1: Top 3 Indian customers by signup date (newest first)
SELECT
    name,
    city,
    signup_date
FROM customers
WHERE country = 'India'
ORDER BY signup_date DESC
LIMIT 3;


-- ── Example 2: Affordable Electronics under ₹5000
SELECT
    name        AS product,
    price,
    stock_qty   AS in_stock
FROM products
WHERE category = 'Electronics'
  AND price < 5000
ORDER BY price ASC;


-- ── Example 3: Recent delivered orders above ₹10,000
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount
FROM orders
WHERE status = 'Delivered'
  AND total_amount > 10000
ORDER BY order_date DESC
LIMIT 5;


-- ══════════════════════════════════════════════════════════════
--  7. USEFUL SINGLE-TABLE TRICKS
-- ══════════════════════════════════════════════════════════════

-- Concatenate strings (PostgreSQL uses ||, MySQL uses CONCAT)
SELECT name || ' from ' || city AS label FROM customers;           -- PostgreSQL
SELECT CONCAT(name, ' from ', city) AS label FROM customers;       -- MySQL

-- String functions
SELECT UPPER(name), LOWER(email), LENGTH(name) FROM customers;

-- Date parts
SELECT name, signup_date,
       EXTRACT(YEAR FROM signup_date)  AS signup_year,
       EXTRACT(MONTH FROM signup_date) AS signup_month
FROM customers;

-- Conditional column (CASE WHEN — inline IF-ELSE)
SELECT
    name,
    price,
    CASE
        WHEN price < 1000  THEN 'Budget'
        WHEN price < 10000 THEN 'Mid-Range'
        ELSE                    'Premium'
    END AS price_tier
FROM products
ORDER BY price;


-- ══════════════════════════════════════════════════════════════
--  ✅ PRACTICE EXERCISES — Week 7
-- ══════════════════════════════════════════════════════════════

-- EASY:
-- 1. Select name, email, city of all customers from India.
-- 2. List all products priced between ₹1000 and ₹10000.
-- 3. Find all orders with status 'Delivered', sorted by total_amount DESC.
-- 4. List unique categories from the products table.
-- 5. Show the 5 most recently signed up customers.

-- MEDIUM:
-- 6. Find customers whose name starts with 'A' or 'S'.
-- 7. List products where stock_qty is less than 100, sorted cheapest first.
-- 8. Get all employees who do NOT have a manager (top-level).
-- 9. Show orders from January to March 2023 only.
-- 10. List products where name contains the word 'Pro'.

-- CHALLENGE:
-- 11. Show the top 3 most expensive products in the Furniture category.
-- 12. List customers not from India, UAE, or China.
-- 13. Find orders where total_amount > ₹20,000 and status is NOT 'Cancelled'.
-- 14. Add a column showing "High Stock" if stock_qty > 200, else "Low Stock".
-- 15. List all employees, sorted by department ASC, then hire_date DESC.
