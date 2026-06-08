-- ============================================================
-- SQL BASICS — Practice Query Library (Solutions)
-- Topic 7 | Week 7
-- ============================================================

-- ── Exercise 1: Customers from India
SELECT name, email, city
FROM customers
WHERE country = 'India';

-- ── Exercise 2: Products between ₹1000 and ₹10000
SELECT name, category, price
FROM products
WHERE price BETWEEN 1000 AND 10000
ORDER BY price;

-- ── Exercise 3: Delivered orders sorted by amount
SELECT order_id, customer_id, order_date, total_amount
FROM orders
WHERE status = 'Delivered'
ORDER BY total_amount DESC;

-- ── Exercise 4: Unique product categories
SELECT DISTINCT category FROM products;

-- ── Exercise 5: 5 most recently signed up customers
SELECT name, city, signup_date
FROM customers
ORDER BY signup_date DESC
LIMIT 5;

-- ── Exercise 6: Names starting with A or S
SELECT name, city
FROM customers
WHERE name LIKE 'A%' OR name LIKE 'S%';

-- ── Exercise 7: Low stock products, sorted cheapest first
SELECT name, category, price, stock_qty
FROM products
WHERE stock_qty < 100
ORDER BY price ASC;

-- ── Exercise 8: Top-level employees (no manager)
SELECT name, department
FROM employees
WHERE manager_id IS NULL;

-- ── Exercise 9: Orders from Jan-Mar 2023
SELECT order_id, customer_id, order_date, status, total_amount
FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-03-31'
ORDER BY order_date;

-- ── Exercise 10: Products with 'Pro' in name
SELECT name, category, price
FROM products
WHERE name LIKE '%Pro%';

-- ── Exercise 11: Top 3 expensive Furniture products
SELECT name, price
FROM products
WHERE category = 'Furniture'
ORDER BY price DESC
LIMIT 3;

-- ── Exercise 12: Customers NOT from India, UAE, China
SELECT name, city, country
FROM customers
WHERE country NOT IN ('India', 'UAE', 'China');

-- ── Exercise 13: Big non-cancelled orders
SELECT order_id, total_amount, status
FROM orders
WHERE total_amount > 20000
  AND status <> 'Cancelled'
ORDER BY total_amount DESC;

-- ── Exercise 14: Stock level label
SELECT
    name,
    stock_qty,
    CASE
        WHEN stock_qty > 200 THEN 'High Stock'
        ELSE 'Low Stock'
    END AS stock_level
FROM products
ORDER BY stock_qty DESC;

-- ── Exercise 15: Employees sorted by dept then hire_date
SELECT name, department, hire_date, salary
FROM employees
ORDER BY department ASC, hire_date DESC;
