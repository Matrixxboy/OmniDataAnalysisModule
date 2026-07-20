Below is a **complete MySQL script** that you can copy and run directly in **MySQL 8.x**. It creates the database, creates the tables, inserts sample data, and demonstrates **all JOINs** with additional practice queries.

---

# Step 1: Create Database

```sql
CREATE DATABASE SQL_Joins_Practice;

USE SQL_Joins_Practice;
```

---

# Step 2: Create Departments Table

```sql
CREATE TABLE Departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    location VARCHAR(100)
);
```

---

# Step 3: Create Employees Table

```sql
CREATE TABLE Employees (
    employee_id INT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    salary DECIMAL(10,2),
    department_id INT
);
```

---

# Step 4: Insert Data into Departments

```sql
INSERT INTO Departments
VALUES
(101,'Human Resources','New York'),
(102,'IT','California'),
(103,'Finance','Chicago'),
(104,'Sales','Texas'),
(105,'Marketing','Florida'),
(106,'Research','Boston');
```

---

# Step 5: Insert Data into Employees

```sql
INSERT INTO Employees
VALUES
(1,'John','john@gmail.com',55000,101),
(2,'Emma','emma@gmail.com',65000,102),
(3,'David','david@gmail.com',75000,103),
(4,'Sophia','sophia@gmail.com',50000,NULL),
(5,'James','james@gmail.com',80000,107),
(6,'Olivia','olivia@gmail.com',62000,102),
(7,'William','william@gmail.com',45000,101),
(8,'Mia','mia@gmail.com',70000,104),
(9,'Noah','noah@gmail.com',68000,NULL),
(10,'Ava','ava@gmail.com',72000,105);
```

---

# View Tables

## Employees

```sql
SELECT * FROM Employees;
```

---

## Departments

```sql
SELECT * FROM Departments;
```

---

# INNER JOIN

Returns only matching records.

```sql
SELECT
e.employee_id,
e.employee_name,
d.department_name,
d.location
FROM Employees e
INNER JOIN Departments d
ON e.department_id = d.department_id;
```

---

# LEFT JOIN

Returns every employee.

```sql
SELECT
e.employee_id,
e.employee_name,
d.department_name,
d.location
FROM Employees e
LEFT JOIN Departments d
ON e.department_id = d.department_id;
```

---

# RIGHT JOIN

Returns every department.

```sql
SELECT
e.employee_name,
d.department_name,
d.location
FROM Employees e
RIGHT JOIN Departments d
ON e.department_id = d.department_id;
```

---

# FULL OUTER JOIN (MySQL)

```sql
SELECT
e.employee_name,
d.department_name
FROM Employees e
LEFT JOIN Departments d
ON e.department_id=d.department_id

UNION

SELECT
e.employee_name,
d.department_name
FROM Employees e
RIGHT JOIN Departments d
ON e.department_id=d.department_id;
```

---

# CROSS JOIN

```sql
SELECT
e.employee_name,
d.department_name
FROM Employees e
CROSS JOIN Departments d;
```

---

# SELF JOIN

Find employees working in the same department.

```sql
SELECT
e1.employee_name AS Employee1,
e2.employee_name AS Employee2,
e1.department_id
FROM Employees e1
JOIN Employees e2
ON e1.department_id=e2.department_id
AND e1.employee_id<e2.employee_id;
```

---

# NATURAL JOIN (Only if both tables share same column names)

```sql
SELECT *
FROM Employees
NATURAL JOIN Departments;
```

---

# Employees in IT Department

```sql
SELECT
e.employee_name,
d.department_name
FROM Employees e
JOIN Departments d
ON e.department_id=d.department_id
WHERE d.department_name='IT';
```

---

# Employees in HR Department

```sql
SELECT
e.employee_name,
d.department_name
FROM Employees e
JOIN Departments d
ON e.department_id=d.department_id
WHERE d.department_name='Human Resources';
```

---

# Employees Without Department

```sql
SELECT *
FROM Employees
WHERE department_id IS NULL;
```

---

# Employees Having Invalid Department

```sql
SELECT *
FROM Employees
WHERE department_id NOT IN
(
SELECT department_id
FROM Departments
);
```

---

# Departments Without Employees

```sql
SELECT
d.department_name
FROM Departments d
LEFT JOIN Employees e
ON d.department_id=e.department_id
WHERE e.employee_id IS NULL;
```

---

# Count Employees in Each Department

```sql
SELECT
d.department_name,
COUNT(e.employee_id) AS Total_Employees
FROM Departments d
LEFT JOIN Employees e
ON d.department_id=e.department_id
GROUP BY d.department_name;
```

---

# Total Salary Department Wise

```sql
SELECT
d.department_name,
SUM(e.salary) AS Total_Salary
FROM Departments d
LEFT JOIN Employees e
ON d.department_id=e.department_id
GROUP BY d.department_name;
```

---

# Average Salary Department Wise

```sql
SELECT
d.department_name,
AVG(e.salary) AS Average_Salary
FROM Departments d
LEFT JOIN Employees e
ON d.department_id=d.department_id
GROUP BY d.department_name;
```

---

# Maximum Salary Department Wise

```sql
SELECT
d.department_name,
MAX(e.salary) AS Highest_Salary
FROM Departments d
LEFT JOIN Employees e
ON e.department_id=d.department_id
GROUP BY d.department_name;
```

---

# Minimum Salary Department Wise

```sql
SELECT
d.department_name,
MIN(e.salary) AS Lowest_Salary
FROM Departments d
LEFT JOIN Employees e
ON e.department_id=d.department_id
GROUP BY d.department_name;
```

---

# Highest Paid Employee

```sql
SELECT *
FROM Employees
WHERE salary=
(
SELECT MAX(salary)
FROM Employees
);
```

---

# Lowest Paid Employee

```sql
SELECT *
FROM Employees
WHERE salary=
(
SELECT MIN(salary)
FROM Employees
);
```

---

# Employees Earning More Than Average Salary

```sql
SELECT *
FROM Employees
WHERE salary>
(
SELECT AVG(salary)
FROM Employees
);
```

---

# Highest Paid Employee in Each Department

```sql
SELECT
d.department_name,
MAX(e.salary) AS Highest_Salary
FROM Employees e
JOIN Departments d
ON e.department_id=d.department_id
GROUP BY d.department_name;
```

---

# Employee Count by Location

```sql
SELECT
d.location,
COUNT(e.employee_id) AS Total_Employees
FROM Departments d
LEFT JOIN Employees e
ON e.department_id=d.department_id
GROUP BY d.location;
```

---

# Employees Sorted by Salary

```sql
SELECT *
FROM Employees
ORDER BY salary DESC;
```

---

# Departments Having More Than One Employee

```sql
SELECT
d.department_name,
COUNT(e.employee_id) AS Employee_Count
FROM Departments d
JOIN Employees e
ON d.department_id=e.department_id
GROUP BY d.department_name
HAVING COUNT(e.employee_id)>1;
```

---

# Top 3 Highest Paid Employees

```sql
SELECT *
FROM Employees
ORDER BY salary DESC
LIMIT 3;
```

---

# Employees and Their Department Location

```sql
SELECT
e.employee_name,
d.department_name,
d.location
FROM Employees e
JOIN Departments d
ON e.department_id=d.department_id;
```

---

# Employees with NULL Department

```sql
SELECT *
FROM Employees
WHERE department_id IS NULL;
```

---

# Employees with Existing Departments Only

```sql
SELECT *
FROM Employees
WHERE department_id IN
(
SELECT department_id
FROM Departments
);
```

---

# Employees with Non-Existing Departments

```sql
SELECT *
FROM Employees
WHERE department_id NOT IN
(
SELECT department_id
FROM Departments
);
```

---

# Total Number of Employees

```sql
SELECT COUNT(*) AS Total_Employees
FROM Employees;
```

---

# Total Number of Departments

```sql
SELECT COUNT(*) AS Total_Departments
FROM Departments;
```

---

# Cross Join Count

```sql
SELECT COUNT(*)
FROM Employees
CROSS JOIN Departments;
```

Since there are **10 employees** and **6 departments**, the result will be:

```
10 × 6 = 60 Rows
```

---

## ⚠️ Correction

There is a small mistake in the earlier **Average Salary Department Wise** query. The correct version is:

```sql
SELECT
d.department_name,
AVG(e.salary) AS Average_Salary
FROM Departments d
LEFT JOIN Employees e
ON e.department_id = d.department_id
GROUP BY d.department_name;
```

This script contains **30+ commonly used SQL queries** covering:

* Database and table creation
* Data insertion
* `INNER`, `LEFT`, `RIGHT`, `FULL OUTER` (using `UNION`), `CROSS`, `SELF`, and `NATURAL` joins
* Filtering with `WHERE`
* Sorting with `ORDER BY`
* Aggregations (`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`)
* `GROUP BY` and `HAVING`
* Subqueries
* Practical interview-style examples
