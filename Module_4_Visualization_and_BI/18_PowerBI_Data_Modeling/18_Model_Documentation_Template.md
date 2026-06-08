# 📐 Data Model Documentation
## Superstore Sales — Star Schema Model
**File:** `18_Star_Schema_Model.pbix`
**Data Source:** Superstore.csv (Kaggle)
**Created:** [Your Name] | Week 18

---

## 🗂️ Tables Overview

| Table | Type | ~Rows | Description |
|-------|------|-------|-------------|
| `FactSales` | Fact | 9,994 | One row per order line item — all numeric measures |
| `DimCustomer` | Dimension | 793 | Unique customers with segment info |
| `DimProduct` | Dimension | 1,862 | Unique products with category and sub-category |
| `DimGeography` | Dimension | 631 | Unique locations by postal code |
| `DimDate` | Dimension | 2,557 | Calendar table from 2020–2026 |

---

## 📋 Column Inventory

### FactSales (Fact Table)
| Column | Type | Role | Hidden? |
|--------|------|------|---------|
| Order ID | Text | Row identifier | No |
| Customer ID | Whole Number | Foreign Key → DimCustomer | Yes |
| Product ID | Text | Foreign Key → DimProduct | Yes |
| Postal Code | Text | Foreign Key → DimGeography | Yes |
| Order Date | Date | Foreign Key → DimDate | No |
| Ship Date | Date | Secondary date | No |
| Ship Mode | Text | Shipping method | No |
| Sales | Decimal | Measure | No |
| Quantity | Whole Number | Measure | No |
| Discount | Decimal | Measure | No |
| Profit | Decimal | Measure | No |
| Profit Margin % | Decimal | Calculated Column | No |
| Net Revenue | Decimal | Calculated Column | No |
| Days to Ship | Whole Number | Calculated Column | No |
| Is Late Ship | Text | Calculated Column | No |
| Price Tier | Text | Calculated Column | No |

### DimCustomer
| Column | Type | Role |
|--------|------|------|
| Customer ID | Whole Number | Primary Key |
| Customer Name | Text | Descriptor |
| Segment | Text | Descriptor |

### DimProduct
| Column | Type | Role |
|--------|------|------|
| Product ID | Text | Primary Key |
| Product Name | Text | Descriptor |
| Category | Text | Descriptor |
| Sub-Category | Text | Descriptor |

### DimGeography
| Column | Type | Role |
|--------|------|------|
| Postal Code | Text | Primary Key |
| City | Text | Descriptor |
| State | Text | Descriptor |
| Country | Text | Descriptor |
| Region | Text | Descriptor |

### DimDate (Calendar Table)
| Column | Type | Role |
|--------|------|------|
| Date | Date | Primary Key (marked as Date Table) |
| Year | Whole Number | Descriptor |
| Quarter | Text | Descriptor |
| Month | Whole Number | Sort column for Month Name |
| Month Name | Text | Descriptor |
| Day | Whole Number | Descriptor |
| Weekday | Text | Descriptor |

---

## 🔗 Relationships

| From | Column | → | To | Column | Cardinality | Direction | Active |
|------|--------|---|------|--------|-------------|-----------|--------|
| FactSales | Customer ID | → | DimCustomer | Customer ID | Many-to-One (*:1) | Single | ✅ |
| FactSales | Product ID | → | DimProduct | Product ID | Many-to-One (*:1) | Single | ✅ |
| FactSales | Postal Code | → | DimGeography | Postal Code | Many-to-One (*:1) | Single | ✅ |
| FactSales | Order Date | → | DimDate | Date | Many-to-One (*:1) | Single | ✅ |

---

## 🧮 Calculated Columns

| Table | Column | DAX Formula | Purpose |
|-------|--------|-------------|---------|
| FactSales | Profit Margin % | `DIVIDE([Profit],[Sales],0)*100` | Row-level profit margin |
| FactSales | Net Revenue | `[Sales] * (1 - [Discount])` | Revenue after discount applied |
| FactSales | Days to Ship | `DATEDIFF([Order Date],[Ship Date],DAY)` | Shipping speed per order |
| FactSales | Is Late Ship | `IF([Days to Ship] > 5, "Late", "On Time")` | Flag slow shipments |
| FactSales | Price Tier | `SWITCH(TRUE(), [Sales]>=10000,"High Value", [Sales]>=1000,"Mid Value","Low Value")` | Segment orders by value |

---

## 📸 Model View Diagram

> **[Paste your screenshot of the Power BI Model View here]**

```
              ┌─────────────┐
              │  DimDate    │
              │  Date (PK)  │
              └──────┬──────┘
                     │ 1
                     │
 ┌──────────────┐    │    ┌──────────────────┐
 │ DimCustomer  │    │    │  DimGeography    │
 │ CustomerID(PK)│   │    │  PostalCode (PK) │
 └──────┬───────┘    │    └────────┬─────────┘
        │ 1          │             │ 1
        │            │ *           │
        └────────────┤             │
                     │ FactSales   │
                     │ (Fact Table)│
                     │             │
        ┌────────────┤             │
        │ 1          │ *           │
 ┌──────┴───────┐    └─────────────┘
 │ DimProduct   │
 │ ProductID(PK)│
 └──────────────┘
```

---

## ✅ Model Health Checklist

- [ ] All relationships are Many-to-One (not Many-to-Many)
- [ ] All relationships use Single cross-filter direction
- [ ] DimDate is marked as a Date Table
- [ ] All foreign key columns are hidden in Report View
- [ ] All columns have correct data types
- [ ] Postal Code is stored as Text (not number)
- [ ] Month Name has "Sort by Column" = Month Number
- [ ] Model validates with a simple Matrix visual (Category × Sales)

---

## 📝 Notes & Decisions

> Use this section to record any data issues found or design decisions made during modeling.

- **[Example]:** Removed 11 rows with null Postal Code values in Power Query.
- **[Example]:** Customer ID re-created as a sequential integer since original IDs were non-unique.
- **[Add your own notes here]**
