# 📘 Topic 18 — Power BI: Data Modeling
**Week:** 18 | **Daily Hours:** 2 hrs | **Tools:** Power BI Desktop, Microsoft Learn

---

## 🎯 Learning Objectives
Connect multiple data sources to Power BI, build a clean Star Schema data model, define table relationships, and create calculated columns — laying the foundation for all DAX measures and dashboards.

---

## 📋 Sub-Topics

| # | Sub-Topic | Description |
|---|-----------|-------------|
| 1 | **Connecting Data Sources** | Import from Excel, CSV, SQL Server, Web |
| 2 | **Power Query in Power BI** | Transform data before it enters the model |
| 3 | **Star Schema** | Fact tables + Dimension tables — the gold standard BI model |
| 4 | **Table Relationships** | Cardinality, cross-filter direction, active vs inactive |
| 5 | **Calculated Columns** | DAX columns stored in the model (vs. measures) |
| 6 | **Data Types & Formatting** | Correct types, display formats, hidden fields |

---

## 📝 Daily Practice Plan (Week 18)

| Day | Focus | Task |
|-----|-------|------|
| Mon | Install + Connect | Install Power BI Desktop; connect Superstore CSV; explore Power Query |
| Tue | Power Query Transforms | Clean columns, change types, rename, split, merge queries |
| Wed | Star Schema Design | Identify fact vs dimension; split the flat file into 4 tables |
| Thu | Relationships | Build all relationships in Model View; set cardinality + filter direction |
| Fri | Calculated Columns | Add Profit Margin %, Full Name, Month-Year, Price Tier columns |
| Sat | Validation | Check model with simple visuals; confirm relationships work |
| Sun | Documentation | Draw the schema diagram; write table/column descriptions |

---

## 🏆 Deliverable
**Data Model (Star Schema)** — Power BI `.pbix` file containing:
- 4+ tables in Star Schema (1 fact + 3+ dimensions)
- All relationships correctly defined
- 5+ calculated columns added
- Clean column names, correct data types, hidden technical keys
- A screenshot of the Model View diagram

**File:** `18_Star_Schema_Model.pbix` + `18_Model_Documentation.md`

---

## 📚 References
- [Microsoft Learn — Model Data in Power BI](https://learn.microsoft.com/en-us/training/modules/design-model-power-bi/)
- [SQLBI — Introduction to Data Modeling](https://www.sqlbi.com/articles/introduction-to-data-modeling-for-power-bi/)
- [Guy in a Cube — Star Schema Explained](https://www.youtube.com/watch?v=a7yxKxVenHg)
- [Power BI Desktop Download](https://powerbi.microsoft.com/en-us/desktop/)
