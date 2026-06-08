# 🗄️ Module 2 — The Ultimate SQL & Databases Guide

This comprehensive guide covers everything from foundational queries to advanced analytical SQL. Use this as your primary reference for Weeks 7–9 of the Data Analysis Module.

---

## 🏗️ 1. Sample Database Schema
All examples in this guide are based on the following relational schema. You can set this up using `sample_database_setup.sql`.

### 📊 Tables Overview
- **`customers`**: Profiles of users (ID, Name, Email, City, Country, Signup Date).
- **`products`**: Catalog items (ID, Name, Category, Price, Stock Qty).
- **`orders`**: Transaction headers (ID, Customer ID, Date, Status, Total Amount).
- **`order_items`**: Line items per order (ID, Order ID, Product ID, Qty, Unit Price).
- **`employees`**: Staff data (ID, Name, Dept, Salary, Manager ID, Hire Date).
- **`departments`**: Organizational units (ID, Name, Location).

---

## 🟦 Topic 7 — SQL Basics (Week 7)
The foundation of data retrieval. These keywords form the backbone of every SQL query.

### 1.1 The Core Clauses
| Keyword | Purpose | Example |
| :--- | :--- | :--- |
| **SELECT** | Which columns? | `SELECT name, email` |
| **FROM** | Which table? | `FROM customers` |
| **WHERE** | Filter rows? | `WHERE country = 'India'` |
| **DISTINCT**| Unique values? | `SELECT DISTINCT category` |
| **ORDER BY**| Sort results? | `ORDER BY price DESC` |
| **LIMIT** | How many rows? | `LIMIT 10` |

### 1.2 Dedicated Examples
#### Filtering with WHERE
```sql
-- Range filtering
SELECT * FROM products WHERE price BETWEEN 1000 AND 5000;

-- Pattern matching (Wildcards: % = any, _ = one char)
SELECT * FROM customers WHERE email LIKE '%@gmail.com';

-- List matching
SELECT * FROM orders WHERE status IN ('Delivered', 'Shipped');
```

#### Sorting & Limiting
```sql
-- Top 5 most expensive products
SELECT name, price 
FROM products 
ORDER BY price DESC 
LIMIT 5;
```

---

## 🟩 Topic 8 — Joins & Aggregations (Week 8)
How to combine data from multiple tables and summarize it.

### 2.1 Understanding JOINs
SQL uses JOINs to reassemble data split across tables.

- **INNER JOIN**: Only matching records in **both** tables.
- **LEFT JOIN**: All from the **left** table + matches from the right.
- **RIGHT JOIN**: All from the **right** table + matches from the left.
- **FULL JOIN**: All records from **both** tables.

#### Example: Customer Orders (Inner Join)
```sql
SELECT o.order_id, c.name, o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;
```

### 2.2 Aggregations & Grouping
Summary functions like `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX`.

| Function | Description |
| :--- | :--- |
| **GROUP BY** | Groups rows sharing a value. |
| **HAVING** | Filters **groups** (runs after GROUP BY). |

#### Example: Sales by Category
```sql
SELECT p.category, SUM(o.total_amount) AS revenue
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN products p ON oi.product_id = p.product_id
GROUP BY p.category
HAVING SUM(o.total_amount) > 10000;
```

---

## 🟪 Topic 9 — Advanced SQL (Week 9)
Professional-grade SQL for complex data analysis.

### 3.1 CTEs (Common Table Expressions)
The `WITH` clause makes complex queries readable by naming temporary result sets.

```sql
WITH customer_revenue AS (
    SELECT customer_id, SUM(total_amount) as total_spent
    FROM orders
    GROUP BY customer_id
)
SELECT c.name, cr.total_spent
FROM customers c
JOIN customer_revenue cr ON c.customer_id = cr.customer_id
WHERE cr.total_spent > 5000;
```

### 3.2 Window Functions
Perform calculations across sets of rows without collapsing them.

- **`ROW_NUMBER()`**: Unique ID per row.
- **`RANK()`**: Rank with gaps (1, 2, 2, 4).
- **`DENSE_RANK()`**: Rank without gaps (1, 2, 2, 3).
- **`LAG() / LEAD()`**: Access previous or next row values (great for MoM growth).

#### Example: Employee Ranking per Department
```sql
SELECT name, department, salary,
       RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank
FROM employees;
```

---

## 🏆 Final Practice Challenge
Try to solve these without looking at the notes!

1. **Basics**: List the top 3 customers from 'USA' who signed up in 2023.
2. **Joins**: Find all products that have **never** been ordered (Hint: Use `LEFT JOIN` and `IS NULL`).
3. **Advanced**: Calculate the month-over-month growth in revenue for the entire year of 2023.

---
*End of Guide*
