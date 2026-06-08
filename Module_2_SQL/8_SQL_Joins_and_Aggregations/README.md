# 📘 Topic 8 — SQL Joins & Aggregations
**Week:** 8 | **Daily Hours:** 2 hrs | **Tools:** DB Fiddle, Mode Analytics

---

## 🎯 Learning Objectives
Combine multiple tables using different types of JOINs, and summarise data using aggregation functions with GROUP BY and HAVING filters.

---

## 📋 Sub-Topics

| # | Keyword | Purpose |
|---|---------|---------|
| 1 | **INNER JOIN** | Return only rows with matching values in both tables |
| 2 | **LEFT JOIN** | All rows from left table + matching rows from right |
| 3 | **RIGHT JOIN** | All rows from right table + matching rows from left |
| 4 | **FULL OUTER JOIN** | All rows from both tables |
| 5 | **GROUP BY** | Group rows sharing a value; apply aggregate functions |
| 6 | **HAVING** | Filter groups (like WHERE, but for aggregated results) |
| 7 | **COUNT / SUM / AVG** | Core aggregate functions |

---

## 📝 Daily Practice Plan (Week 8)

| Day | Focus | Task |
|-----|-------|------|
| Mon | INNER JOIN | Join orders + customers; join order_items + products |
| Tue | LEFT & RIGHT JOIN | Find customers with no orders; products never ordered |
| Wed | FULL OUTER JOIN | Identify unmatched records on both sides |
| Thu | GROUP BY + Aggregates | Total revenue by customer; count orders by status |
| Fri | HAVING | Filter groups: customers with > 2 orders; avg order > ₹5000 |
| Sat | Combined | Multi-join + GROUP BY + HAVING in one query |
| Sun | Reference Sheet | Document all JOIN types with diagrams in notes |

---

## 🏆 Deliverable
**Joins Reference Sheet** — SQL file with:
- All JOIN types demonstrated on the same tables
- 5+ GROUP BY + aggregate queries
- 3+ HAVING filter queries
- Visual comment explaining when to use each JOIN

**File:** `08_joins_aggregations.sql`

---

## 📚 References
- [Visual JOIN Guide — C.L. Moffatt](https://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins)
- [DB Fiddle](https://db-fiddle.com) — Test JOIN queries live
- [Mode SQL Tutorial — JOINs](https://mode.com/sql-tutorial/sql-joins/)
- [SQLZoo JOIN section](https://sqlzoo.net/wiki/The_JOIN_operation)

---

## 💡 JOIN Memory Aid

```
        LEFT        INNER       RIGHT
  ┌────────────┐ ┌────────┐ ┌────────────┐
  │  ██████    │ │   ██   │ │     ██████ │
  │ ██ LEFT ██ │ │ ██ ██  │ │ ██ RIGHT██ │
  │  ██ + ██   │ │  ████  │ │  ██ + ██   │
  └────────────┘ └────────┘ └────────────┘
  All Left rows  Matching    All Right rows
  + matching     rows only   + matching
```
