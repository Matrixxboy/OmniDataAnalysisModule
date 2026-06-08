# 🗄️ Module 2 — SQL & Databases
**Duration:** Weeks 7–9 | **Daily Study:** 2 hrs/day | **Topics:** 3

---

## 📁 Folder Structure

| Folder | Topic | Week | Deliverable |
|--------|-------|------|-------------|
| `7_SQL_Basics/` | SQL Basics | Week 7 | Basic Query Library (.sql file) |
| `8_SQL_Joins_and_Aggregations/` | Joins & Aggregations | Week 8 | Joins Reference Sheet |
| `9_Advanced_SQL/` | Advanced SQL | Week 9 | Window Functions Notebook |

---


## 🛠️ Tools Required
- **MySQL** or **PostgreSQL** (install one locally)
- **DB Fiddle** — [db-fiddle.com](https://db-fiddle.com) (browser-based sandbox, no install needed)
- **SQLZoo** — [sqlzoo.net](https://sqlzoo.net) (interactive SQL practice)
- **DBeaver** or **pgAdmin** (optional GUI clients)

---

## ⚡ Quick Setup Options

### Option A — No Install (Recommended for beginners)
Use [DB Fiddle](https://db-fiddle.com) — paste SQL, run instantly in browser.

### Option B — Local PostgreSQL
```bash
# Install PostgreSQL
# Mac: brew install postgresql
# Windows: download from postgresql.org
# Linux: sudo apt install postgresql

# Start server
psql -U postgres

# Create a database
CREATE DATABASE analytics_course;
\c analytics_course
```

### Option C — Local MySQL
```bash
# Install MySQL
# Mac: brew install mysql
# Windows: download MySQL Installer
mysql -u root -p
CREATE DATABASE analytics_course;
USE analytics_course;
```

---

## 📚 Resources
- [SQLZoo](https://sqlzoo.net) — Interactive exercises
- [DB Fiddle](https://db-fiddle.com) — Online sandbox
- [StrataScratch](https://stratascratch.com) — Real interview SQL problems
- [LeetCode Database](https://leetcode.com/problemset/database/) — Practice problems
- [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial) — Guided learning
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [MySQL Docs](https://dev.mysql.com/doc/)

---

## 🗂️ Sample Database Used Throughout This Module

All notes and queries use a consistent sample database with these tables:

```
customers    — customer_id, name, email, city, country, signup_date
products     — product_id, name, category, price, stock_qty
orders       — order_id, customer_id, order_date, status, total_amount
order_items  — item_id, order_id, product_id, quantity, unit_price
employees    — employee_id, name, department, salary, manager_id, hire_date
departments  — dept_id, dept_name, location
```

Setup script is in: `sample_database_setup.sql`
