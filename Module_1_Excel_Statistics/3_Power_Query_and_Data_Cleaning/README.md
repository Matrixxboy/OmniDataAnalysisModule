# 📘 Topic 3 — Power Query & Data Cleaning
**Week:** 3 | **Daily Hours:** 2 hrs | **Tools:** Excel, Kaggle CSV Datasets

---

## 🎯 Learning Objectives
Import, transform, and clean messy datasets using Excel's Power Query Editor — without writing a single formula manually.

---

## 📋 Sub-Topics

| # | Sub-Topic | Description |
|---|-----------|-------------|
| 1 | **Power Query Editor** | Import data from CSV/Web/SQL; transform with a GUI |
| 2 | **Text-to-Columns** | Split one column into multiple (comma, space, delimiter) |
| 3 | **Flash Fill** | Smart auto-fill that detects patterns (names, emails, codes) |
| 4 | **Remove Duplicates** | Find and delete exact or partial duplicate rows |
| 5 | **Merge Queries** | JOIN two tables in Power Query (like SQL JOIN) |

---

## 📝 Daily Practice Plan (Week 3)

| Day | Focus | Task |
|-----|-------|------|
| Mon | Power Query Intro | Import 2 CSVs; explore the interface; apply basic transforms |
| Tue | Text & Column Cleanup | Split full name → first/last; fix inconsistent text case |
| Wed | Flash Fill | Extract domain from email; format phone numbers |
| Thu | Remove Duplicates & Nulls | Identify and remove dupes; handle missing values |
| Fri | Merge Queries | Join orders table with customers table on ID |
| Sat | Full pipeline | Import → Clean → Merge → Load to Sheet |
| Sun | Review | Document each step; save the query as a template |

---

## 🏆 Deliverable
**Cleaned Dataset Report** — Excel file with:
- Raw data sheet (untouched original)
- Power Query steps visible in Query Editor
- Final cleaned + merged output sheet
- Notes on what was cleaned and why

**File to create:** `Cleaned_Dataset_Report.xlsx`

---

## 📚 References
- [Power Query Guide — Microsoft Docs](https://learn.microsoft.com/en-us/power-query/)
- [Flash Fill — ExcelJet](https://exceljet.net/excel-functions/excel-flash-fill)
- [Kaggle CSV Datasets](https://www.kaggle.com/datasets) — search "dirty data" or "data cleaning"

---

## 💡 Tips
- Every Power Query step is logged — you can undo/modify any step later
- Use **Close & Load To** → "Only Create Connection" to avoid cluttering sheets
- Power Query refreshes with one click when source data updates
