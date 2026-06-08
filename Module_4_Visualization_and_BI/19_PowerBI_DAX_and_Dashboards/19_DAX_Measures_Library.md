# 📐 DAX Measures Library
## Topic 19 | Week 19 | Complete Reference for All Measures

> Copy any measure into Power BI Desktop → formula bar.
> All measures assume the Star Schema from Topic 18.
> Create a dedicated `_Measures` table and store all measures there.

---

## 📋 Table of Contents
1. [Revenue & Sales](#1-revenue--sales)
2. [Profit & Margin](#2-profit--margin)
3. [Counts & Averages](#3-counts--averages)
4. [CALCULATE — Conditional Measures](#4-calculate--conditional-measures)
5. [% of Total Measures](#5--of-total-measures)
6. [Time Intelligence — YTD](#6-time-intelligence--ytd)
7. [Time Intelligence — Year-over-Year](#7-time-intelligence--year-over-year)
8. [Time Intelligence — Month-over-Month](#8-time-intelligence--month-over-month)
9. [Rolling / Moving Measures](#9-rolling--moving-measures)
10. [Dynamic Metric Selector](#10-dynamic-metric-selector)
11. [KPI Status Measures](#11-kpi-status-measures)
12. [Advanced Patterns](#12-advanced-patterns)

---

## 1. Revenue & Sales

```dax
Total Revenue =
    SUM(FactSales[Sales])

Total Net Revenue =
    SUMX(FactSales, FactSales[Sales] * (1 - FactSales[Discount]))

Total Discount Amount =
    SUMX(FactSales, FactSales[Sales] * FactSales[Discount])

Total Quantity =
    SUM(FactSales[Quantity])

Max Sale =
    MAX(FactSales[Sales])

Min Sale =
    MIN(FactSales[Sales])
```

---

## 2. Profit & Margin

```dax
Total Profit =
    SUM(FactSales[Profit])

% Profit Margin =
    DIVIDE([Total Profit], [Total Revenue], 0) * 100

Avg Profit Margin per Order =
    AVERAGEX(
        FactSales,
        DIVIDE(FactSales[Profit], FactSales[Sales], 0)
    ) * 100

Max Profit =
    MAX(FactSales[Profit])

Loss Amount =
    CALCULATE(
        SUM(FactSales[Profit]),
        FactSales[Profit] < 0
    )
-- Returns total profit from loss-making orders (negative value)
```

---

## 3. Counts & Averages

```dax
# Orders =
    DISTINCTCOUNT(FactSales[Order ID])

# Customers =
    DISTINCTCOUNT(FactSales[Customer ID])

# Products Sold =
    DISTINCTCOUNT(FactSales[Product ID])

# Line Items =
    COUNTROWS(FactSales)

Avg Order Value =
    DIVIDE([Total Revenue], [# Orders], 0)

Avg Profit per Order =
    DIVIDE([Total Profit], [# Orders], 0)

Avg Items per Order =
    DIVIDE([Total Quantity], [# Orders], 0)

Avg Discount % =
    AVERAGE(FactSales[Discount]) * 100

Avg Days to Ship =
    AVERAGE(FactSales[Days to Ship])
-- Requires "Days to Ship" calculated column from Topic 18
```

---

## 4. CALCULATE — Conditional Measures

```dax
-- ── By Category ─────────────────────────────────────────
Technology Revenue =
    CALCULATE([Total Revenue], DimProduct[Category] = "Technology")

Furniture Revenue =
    CALCULATE([Total Revenue], DimProduct[Category] = "Furniture")

Office Supplies Revenue =
    CALCULATE([Total Revenue], DimProduct[Category] = "Office Supplies")

Technology Profit =
    CALCULATE([Total Profit], DimProduct[Category] = "Technology")

-- ── By Segment ───────────────────────────────────────────
Consumer Revenue =
    CALCULATE([Total Revenue], DimCustomer[Segment] = "Consumer")

Corporate Revenue =
    CALCULATE([Total Revenue], DimCustomer[Segment] = "Corporate")

Home Office Revenue =
    CALCULATE([Total Revenue], DimCustomer[Segment] = "Home Office")

-- ── By Region ────────────────────────────────────────────
West Revenue =
    CALCULATE([Total Revenue], DimGeography[Region] = "West")

East Revenue =
    CALCULATE([Total Revenue], DimGeography[Region] = "East")

Central Revenue =
    CALCULATE([Total Revenue], DimGeography[Region] = "Central")

South Revenue =
    CALCULATE([Total Revenue], DimGeography[Region] = "South")

-- ── By Ship Mode ─────────────────────────────────────────
Standard Class Revenue =
    CALCULATE([Total Revenue], FactSales[Ship Mode] = "Standard Class")

Same Day Revenue =
    CALCULATE([Total Revenue], FactSales[Ship Mode] = "Same Day")

-- ── By Value Range ───────────────────────────────────────
# High Value Orders =
    CALCULATE(
        [# Orders],
        FactSales[Sales] > 1000
    )

# Discounted Orders =
    CALCULATE(
        [# Orders],
        FactSales[Discount] > 0
    )

# Loss Orders =
    CALCULATE(
        DISTINCTCOUNT(FactSales[Order ID]),
        FactSales[Profit] < 0
    )

Revenue from Loss Orders =
    CALCULATE(
        [Total Revenue],
        FILTER(FactSales, FactSales[Profit] < 0)
    )

# Late Shipments =
    CALCULATE(
        [# Orders],
        FactSales[Is Late Ship] = "Late"
    )
-- Requires "Is Late Ship" calculated column from Topic 18
```

---

## 5. % of Total Measures

```dax
-- % of total (ignores all filters on the dimension)
% of Total Revenue =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALL(DimProduct)),
        0
    ) * 100

-- % of category total (ignores sub-category filter, respects other filters)
% of Category Revenue =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALL(DimProduct[Sub-Category])),
        0
    ) * 100

-- % of visible total (respects what's selected in OTHER slicers)
% of Visible Revenue =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALLSELECTED(DimProduct[Category])),
        0
    ) * 100

-- Profit % of total
% of Total Profit =
    DIVIDE(
        [Total Profit],
        CALCULATE([Total Profit], ALL(DimProduct)),
        0
    ) * 100

-- Rank by Revenue (useful in tables/matrices)
Revenue Rank =
    RANKX(
        ALL(DimProduct[Category]),
        [Total Revenue],
        ,
        DESC,
        Dense
    )
```

---

## 6. Time Intelligence — YTD

> **Requires:** DimDate marked as a Date Table.

```dax
YTD Revenue =
    TOTALYTD([Total Revenue], DimDate[Date])

YTD Profit =
    TOTALYTD([Total Profit], DimDate[Date])

YTD Orders =
    TOTALYTD([# Orders], DimDate[Date])

YTD Quantity =
    TOTALYTD([Total Quantity], DimDate[Date])

-- Fiscal year ending March 31
YTD Revenue FY (Mar) =
    TOTALYTD([Total Revenue], DimDate[Date], "3/31")

-- QTD — Quarter to date
QTD Revenue =
    TOTALQTD([Total Revenue], DimDate[Date])

-- MTD — Month to date
MTD Revenue =
    TOTALMTD([Total Revenue], DimDate[Date])
```

---

## 7. Time Intelligence — Year-over-Year

```dax
LY Revenue =
    CALCULATE(
        [Total Revenue],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

LY Profit =
    CALCULATE(
        [Total Profit],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

LY Orders =
    CALCULATE(
        [# Orders],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

YoY Revenue Change =
    [Total Revenue] - [LY Revenue]

YoY Revenue % =
    VAR vCurrent = [Total Revenue]
    VAR vLast    = [LY Revenue]
    RETURN
        IF(
            ISBLANK(vLast) || vLast = 0,
            BLANK(),
            DIVIDE(vCurrent - vLast, vLast) * 100
        )

YoY Profit % =
    VAR vCurrent = [Total Profit]
    VAR vLast    = [LY Profit]
    RETURN
        IF(
            ISBLANK(vLast) || vLast = 0,
            BLANK(),
            DIVIDE(vCurrent - vLast, vLast) * 100
        )

YTD LY Revenue =
    CALCULATE(
        [YTD Revenue],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

YoY YTD Revenue % =
    VAR vCurrent = [YTD Revenue]
    VAR vLast    = [YTD LY Revenue]
    RETURN
        IF(
            ISBLANK(vLast) || vLast = 0,
            BLANK(),
            DIVIDE(vCurrent - vLast, vLast) * 100
        )
```

---

## 8. Time Intelligence — Month-over-Month

```dax
PM Revenue =
    CALCULATE(
        [Total Revenue],
        PREVIOUSMONTH(DimDate[Date])
    )

PM Profit =
    CALCULATE(
        [Total Profit],
        PREVIOUSMONTH(DimDate[Date])
    )

MoM Revenue Change =
    [Total Revenue] - [PM Revenue]

MoM Revenue % =
    VAR vCurrent = [Total Revenue]
    VAR vPrev    = [PM Revenue]
    RETURN
        IF(
            ISBLANK(vPrev) || vPrev = 0,
            BLANK(),
            DIVIDE(vCurrent - vPrev, vPrev) * 100
        )

MoM Profit % =
    VAR vCurrent = [Total Profit]
    VAR vPrev    = CALCULATE([Total Profit], PREVIOUSMONTH(DimDate[Date]))
    RETURN
        IF(
            ISBLANK(vPrev) || vPrev = 0,
            BLANK(),
            DIVIDE(vCurrent - vPrev, vPrev) * 100
        )

-- Previous Quarter
PQ Revenue =
    CALCULATE(
        [Total Revenue],
        PREVIOUSQUARTER(DimDate[Date])
    )

QoQ Revenue % =
    VAR vCurrent = [Total Revenue]
    VAR vPrev    = [PQ Revenue]
    RETURN
        IF(
            ISBLANK(vPrev) || vPrev = 0,
            BLANK(),
            DIVIDE(vCurrent - vPrev, vPrev) * 100
        )
```

---

## 9. Rolling / Moving Measures

```dax
Rolling 3M Revenue =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(
            DimDate[Date],
            LASTDATE(DimDate[Date]),
            -3,
            MONTH
        )
    )

Rolling 6M Revenue =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -6, MONTH)
    )

Rolling 12M Revenue =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -12, MONTH)
    )

Rolling 3M Avg Revenue =
    DIVIDE([Rolling 3M Revenue], 3, 0)

-- Date range shift: revenue from 3 months ago
Revenue 3M Ago =
    CALCULATE(
        [Total Revenue],
        DATEADD(DimDate[Date], -3, MONTH)
    )

-- Cumulative Revenue (from the very first date in context)
Cumulative Revenue =
    CALCULATE(
        [Total Revenue],
        FILTER(
            ALL(DimDate[Date]),
            DimDate[Date] <= MAX(DimDate[Date])
        )
    )
```

---

## 10. Dynamic Metric Selector

```dax
-- Step 1: Create a disconnected table called "Metric Selector"
-- Columns: MetricID (1,2,3), MetricName ("Revenue","Profit","Orders")
-- Do NOT create a relationship to any other table

-- Step 2: Create this measure
Selected Metric =
    SWITCH(
        SELECTEDVALUE('Metric Selector'[MetricName]),
        "Revenue", [Total Revenue],
        "Profit",  [Total Profit],
        "Orders",  [# Orders],
        "Margin",  [% Profit Margin],
        [Total Revenue]   -- default
    )

-- Step 3: Add a Slicer on 'Metric Selector'[MetricName]
-- Step 4: Use [Selected Metric] in charts — they will update with the slicer!
```

---

## 11. KPI Status Measures

```dax
-- Revenue vs Target (define target as a constant or parameter)
Revenue Target = 500000   -- change this value as needed

Revenue vs Target =
    [Total Revenue] - [Revenue Target]

Revenue vs Target % =
    DIVIDE([Total Revenue] - [Revenue Target], [Revenue Target], 0) * 100

Revenue Status =
    IF([Total Revenue] >= [Revenue Target], "✅ On Track", "⚠️ Below Target")

-- Traffic light status for Profit Margin
Margin Status =
    SWITCH(
        TRUE(),
        [% Profit Margin] >= 15, "🟢 Good",
        [% Profit Margin] >= 5,  "🟡 Watch",
        "🔴 Critical"
    )

-- Late shipment rate
Late Shipment Rate =
    DIVIDE([# Late Shipments], [# Orders], 0) * 100

-- Customer Retention (repeat buyers)
# Repeat Customers =
    CALCULATE(
        DISTINCTCOUNT(FactSales[Customer ID]),
        FILTER(
            VALUES(FactSales[Customer ID]),
            CALCULATE(DISTINCTCOUNT(FactSales[Order ID])) > 1
        )
    )

% Repeat Customers =
    DIVIDE([# Repeat Customers], [# Customers], 0) * 100
```

---

## 12. Advanced Patterns

```dax
-- ── TOP N PATTERN ────────────────────────────────────────

-- Revenue from Top 5 Customers
Top 5 Customer Revenue =
    CALCULATE(
        [Total Revenue],
        TOPN(
            5,
            ALL(DimCustomer[Customer ID]),
            [Total Revenue],
            DESC
        )
    )

-- ── PARETO — 80/20 Analysis ──────────────────────────────

Cumulative Revenue % =
    VAR vCurrentRev = [Total Revenue]
    VAR vTotalRev   = CALCULATE([Total Revenue], ALL(DimProduct[Sub-Category]))
    VAR vCumRev     = CALCULATE(
                        [Total Revenue],
                        FILTER(
                            ALL(DimProduct[Sub-Category]),
                            CALCULATE([Total Revenue],
                                      ALL(DimProduct[Sub-Category]))
                            >= vCurrentRev
                        )
                    )
    RETURN
        DIVIDE(vCumRev, vTotalRev, 0) * 100
-- Use in a line chart over Sub-Category sorted by Revenue DESC
-- Draw a reference line at 80% to show Pareto boundary

-- ── WHAT-IF PARAMETER — Discount Simulation ──────────────
-- Create a What-If Parameter (Modeling tab) called "Discount Rate"
-- Range: 0 to 50, increment 1, default 10

Simulated Net Revenue =
    [Total Revenue] * (1 - 'Discount Rate'[Discount Rate Value] / 100)

Simulated Profit Impact =
    [Total Profit] - (
        [Total Revenue] * ('Discount Rate'[Discount Rate Value] / 100)
    )

-- ── LAST N DAYS ───────────────────────────────────────────

Revenue Last 30 Days =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(
            DimDate[Date],
            LASTDATE(DimDate[Date]),
            -30,
            DAY
        )
    )

-- ── NEW vs RETURNING CUSTOMERS ────────────────────────────

New Customers =
    CALCULATE(
        DISTINCTCOUNT(FactSales[Customer ID]),
        FILTER(
            VALUES(FactSales[Customer ID]),
            CALCULATE(
                MIN(FactSales[Order Date])
            ) = MIN(DimDate[Date])
        )
    )
```

---

## 📊 Recommended Measure Groups in Power BI

Organise measures into **Display Folders** (right-click measure → Properties → Display Folder):

```
_Measures/
├── 📦 Core/
│   ├── Total Revenue
│   ├── Total Profit
│   ├── % Profit Margin
│   ├── # Orders
│   └── # Customers
├── 📅 Time Intelligence/
│   ├── YTD Revenue
│   ├── LY Revenue
│   ├── YoY Revenue %
│   ├── PM Revenue
│   └── MoM Revenue %
├── 🔢 Ratios & Averages/
│   ├── Avg Order Value
│   ├── % of Total Revenue
│   └── Revenue Rank
├── 🎯 Conditional/
│   ├── Technology Revenue
│   ├── West Revenue
│   └── # High Value Orders
└── 📈 KPI/
    ├── Revenue Status
    ├── Margin Status
    └── Late Shipment Rate
```

---

## ⚠️ Common DAX Mistakes & Fixes

| Mistake | Wrong | Correct |
|---------|-------|---------|
| Division by zero | `[Profit] / [Revenue]` | `DIVIDE([Profit], [Revenue], 0)` |
| Blank vs zero confusion | `IF([Measure]=0, ...)` | `IF(ISBLANK([Measure]) \|\| [Measure]=0, ...)` |
| Wrong filter context | `SUM([Sales])` in CALCULATE | Wrap in a measure first, then call it |
| ALL removes all filters | `ALL(Table)` | `ALL(Table[Column])` to remove only one dimension |
| MoM on first month | Returns huge % | Add `IF(ISBLANK([PM Revenue]), BLANK(), ...)` |
| Time intelligence not working | DAX returns blank | Mark DimDate as Date Table; check relationship is active |
| FILTER on large tables | Slow dashboard | Pre-filter in Power Query instead |
| Calculated column doing aggregation | `SUM([Sales])` in a column | Move to a Measure; columns use row context only |
