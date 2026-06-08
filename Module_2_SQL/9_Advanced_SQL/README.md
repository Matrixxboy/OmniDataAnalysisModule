# 📘 Topic 9 — Advanced SQL
**Week:** 9 | **Daily Hours:** 2 hrs | **Tools:** LeetCode SQL, StrataScratch

---

## 🎯 Learning Objectives
Write professional-grade SQL used in real data analyst interviews and jobs — including subqueries, CTEs, and window functions like RANK, ROW_NUMBER, and LAG.

---

## 📋 Sub-Topics

| # | Concept | Description |
|---|---------|-------------|
| 1 | **Subqueries** | A query nested inside another query |
| 2 | **CTEs (WITH clause)** | Named temporary result sets for readable multi-step logic |
| 3 | **RANK()** | Rank rows within a partition (gaps on ties) |
| 4 | **DENSE_RANK()** | Rank without gaps on ties |
| 5 | **ROW_NUMBER()** | Unique sequential number per row |
| 6 | **LAG() / LEAD()** | Access previous/next row's value |
| 7 | **SUM() / AVG() OVER()** | Running totals, moving averages |

---

## 📝 Daily Practice Plan (Week 9)

| Day | Focus | Task |
|-----|-------|------|
| Mon | Subqueries | Scalar, row, and table subqueries in WHERE and FROM |
| Tue | Correlated Subqueries | Subquery that references the outer query |
| Wed | CTEs | Rewrite subqueries as CTEs; chain multiple CTEs |
| Thu | RANK / DENSE_RANK / ROW_NUMBER | Rank employees, products, customers |
| Fri | LAG / LEAD + Running Totals | Month-over-month change; cumulative revenue |
| Sat | Combined | Write 5 complex queries using CTEs + window functions |
| Sun | LeetCode | Solve 5 LeetCode Database problems |

---

## 🏆 Deliverable
**Window Functions Notebook** — SQL file containing:
- 5 subquery examples (with explanations)
- 5 CTE examples (including chained CTEs)
- 5 window function queries (RANK, ROW_NUMBER, LAG, running total)
- 2 real-world analytical queries combining all techniques

**File:** `09_advanced_sql.sql`

---

## 📚 References
- [LeetCode Database Problems](https://leetcode.com/problemset/database/)
- [StrataScratch SQL](https://www.stratascratch.com/)
- [PostgreSQL Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html)
- [Mode Analytics — Advanced SQL](https://mode.com/sql-tutorial/sql-subqueries/)
- [SQLZoo — Window Functions](https://sqlzoo.net/wiki/Window_functions)

---

## 💡 When to Use What

| Situation | Best Tool |
|-----------|-----------|
| Filter based on aggregate result | Subquery in WHERE |
| Multi-step logic / readable code | CTE (WITH clause) |
| Rank items within a group | RANK() / DENSE_RANK() |
| Deduplicate / get latest per group | ROW_NUMBER() |
| Compare to previous row (MoM, YoY) | LAG() / LEAD() |
| Cumulative sum / running total | SUM() OVER (ORDER BY) |
| Moving average | AVG() OVER (ORDER BY ROWS BETWEEN) |
