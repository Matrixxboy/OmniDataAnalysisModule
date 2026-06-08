# Power BI — DAX & Dashboards: Complete Notes
## Topic 19 | Week 19 | Instructor Teaching Guide

---

## PART 1: WHAT IS DAX?

**DAX (Data Analysis Expressions)** is the formula language of Power BI, Power Pivot, and SSAS Tabular.

### DAX vs. Excel Formulas vs. SQL

| Feature | Excel | SQL | DAX |
|---------|-------|-----|-----|
| Scope | Cell by cell | Rows in a table | Entire columns + filter context |
| Works with | Cells | Tables | Tabular models |
| Key concept | Cell reference (A1) | WHERE clause | Filter context |
| Aggregation | SUM(A:A) | SUM(col) | SUM([Sales]) |
| Conditional | IF(A1>0,...) | CASE WHEN | IF() / SWITCH() |

### Two Types of DAX
| Type | Where written | Purpose |
|------|--------------|---------|
| **Measure** | Measure table or any table | Aggregated KPIs. Calculated on demand. |
| **Calculated Column** | In a table row | Row-level attributes. Stored in model. |

---

## PART 2: HOW TO CREATE A MEASURE

### Option A — From Report View
1. Click an empty area in the report canvas
2. **Home → New Measure** (or right-click a table in the Fields pane → New Measure)
3. Type your DAX in the formula bar
4. Press Enter

### Option B — Measure Table (Best Practice)
Create a dedicated table for all measures (keeps the model clean):
1. **Home → Enter Data** → name the table `_Measures` → click Load
2. Delete the auto-created "Column1"
3. Right-click `_Measures` table → **New Measure**
4. All measures live in one place

### Measure Naming Conventions
```
Total Sales          → use "Total" prefix for SUM measures
# Orders             → use "#" prefix for COUNT measures
% Profit Margin      → use "%" prefix for ratio measures
YTD Revenue          → use "YTD" prefix for year-to-date
LY Revenue           → use "LY" prefix for last year
MoM Revenue %        → use "MoM" for month-over-month
```

---

## PART 3: BASIC MEASURES

```dax
-- ── FUNDAMENTAL AGGREGATIONS ────────────────────────────

-- Total Revenue
Total Revenue =
    SUM(FactSales[Sales])

-- Total Profit
Total Profit =
    SUM(FactSales[Profit])

-- Total Discount Amount
Total Discount =
    SUMX(FactSales, FactSales[Sales] * FactSales[Discount])
-- SUMX iterates row by row, then sums the result

-- Total Quantity Sold
Total Quantity =
    SUM(FactSales[Quantity])

-- Number of Orders (distinct Order IDs)
# Orders =
    DISTINCTCOUNT(FactSales[Order ID])

-- Number of Customers
# Customers =
    DISTINCTCOUNT(FactSales[Customer ID])

-- Number of Products Sold
# Products Sold =
    DISTINCTCOUNT(FactSales[Product ID])

-- Average Order Value
Avg Order Value =
    DIVIDE([Total Revenue], [# Orders], 0)
-- DIVIDE(numerator, denominator, alternate_result_if_zero)
-- NEVER use / operator directly — causes errors on zero

-- Overall Profit Margin %
% Profit Margin =
    DIVIDE([Total Profit], [Total Revenue], 0) * 100

-- Average Profit Margin per Order
Avg Profit Margin =
    AVERAGEX(FactSales, DIVIDE(FactSales[Profit], FactSales[Sales], 0))

-- Minimum and Maximum Sale
Min Sale =  MIN(FactSales[Sales])
Max Sale =  MAX(FactSales[Sales])
```

---

## PART 4: CALCULATE — THE MOST IMPORTANT DAX FUNCTION

### What CALCULATE Does
CALCULATE evaluates an expression in a **modified filter context**.
It is the single most important function in DAX.

```
CALCULATE( <expression>, <filter1>, <filter2>, ... )
```

- **Expression** — any measure or aggregation (SUM, COUNT, etc.)
- **Filters** — conditions that ADD, REPLACE, or REMOVE filters on the model

### Mental Model
```
Without CALCULATE:      SUM(Sales) respects whatever slicers/filters are active
With CALCULATE:         SUM(Sales) in a BRAND NEW context you define
```

### Examples

```dax
-- ── CALCULATE WITH FIXED FILTERS ────────────────────────

-- Revenue for Technology only (hardcoded filter)
Technology Revenue =
    CALCULATE(
        [Total Revenue],
        DimProduct[Category] = "Technology"
    )

-- Revenue for Delivered orders only
Delivered Revenue =
    CALCULATE(
        [Total Revenue],
        FactSales[Status] = "Delivered"
    )
-- Note: Status column needs to exist in your model

-- Revenue for a specific region
West Revenue =
    CALCULATE(
        [Total Revenue],
        DimGeography[Region] = "West"
    )

-- Profit for Corporate Segment
Corporate Profit =
    CALCULATE(
        [Total Profit],
        DimCustomer[Segment] = "Corporate"
    )

-- Count of high-value orders (Sales > 1000)
# High Value Orders =
    CALCULATE(
        [# Orders],
        FactSales[Sales] > 1000
    )

-- ── CALCULATE WITH MULTIPLE FILTERS (AND logic) ─────────

-- Revenue in the West for Technology
West Technology Revenue =
    CALCULATE(
        [Total Revenue],
        DimGeography[Region] = "West",
        DimProduct[Category] = "Technology"
    )
-- Multiple filter arguments are combined with AND

-- ── CALCULATE WITH ALL() — Remove a Filter ──────────────

-- Total Revenue for ALL categories regardless of slicer
All Category Revenue =
    CALCULATE(
        [Total Revenue],
        ALL(DimProduct[Category])
    )
-- Useful for: % of total calculations

-- % of Total Revenue (per category row)
% of Total Revenue =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALL(DimProduct)),
        0
    ) * 100
-- ALL(DimProduct) removes ALL filters from the DimProduct table
-- Result: denominator is always the grand total
-- Numerator: respects current row/filter context (e.g. "Technology")

-- % of Region Revenue
% of Region Revenue =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALL(DimGeography[Region])),
        0
    ) * 100

-- ── CALCULATE WITH ALLSELECTED() ────────────────────────

-- % of visible total (respects other slicers but not current dimension)
% of Visible Total =
    DIVIDE(
        [Total Revenue],
        CALCULATE([Total Revenue], ALLSELECTED(DimProduct[Category])),
        0
    ) * 100
-- Use when you want % to be relative to what user has filtered
```

---

## PART 5: FILTER FUNCTION

```dax
-- FILTER returns a table (not a value)
-- Use inside CALCULATE as a filter argument

-- Syntax: FILTER(<table>, <condition>)

-- Revenue from orders with discount > 20%
Discounted Revenue =
    CALCULATE(
        [Total Revenue],
        FILTER(FactSales, FactSales[Discount] > 0.2)
    )

-- Revenue from top 10 customers by total spend
Top 10 Customer Revenue =
    CALCULATE(
        [Total Revenue],
        TOPN(10,
            SUMMARIZE(DimCustomer, DimCustomer[Customer ID], "Rev", [Total Revenue]),
            [Rev], DESC
        )
    )

-- Profit from orders with Sales > Average Sales
Above Avg Profit =
    CALCULATE(
        [Total Profit],
        FILTER(FactSales, FactSales[Sales] > AVERAGE(FactSales[Sales]))
    )
-- WARNING: FILTER + AVERAGE is expensive on large tables
-- Prefer: pre-calculate average as a measure and reference it

-- Better pattern:
Avg Sales Value = AVERAGE(FactSales[Sales])

Above Avg Orders =
    CALCULATE(
        [# Orders],
        FILTER(FactSales, FactSales[Sales] > [Avg Sales Value])
    )
```

---

## PART 6: TIME INTELLIGENCE FUNCTIONS

> **Prerequisite:** DimDate must be marked as a **Date Table** (right-click DimDate → Mark as Date Table → select the Date column).

```dax
-- ── YEAR-TO-DATE ─────────────────────────────────────────

-- Revenue YTD (cumulative from Jan 1 to current date)
YTD Revenue =
    TOTALYTD([Total Revenue], DimDate[Date])

-- Profit YTD
YTD Profit =
    TOTALYTD([Total Profit], DimDate[Date])

-- YTD with custom fiscal year end (e.g. 31 March)
YTD Revenue FY =
    TOTALYTD([Total Revenue], DimDate[Date], "3/31")

-- ── SAME PERIOD LAST YEAR ────────────────────────────────

-- Revenue Last Year (same period)
LY Revenue =
    CALCULATE(
        [Total Revenue],
        SAMEPERIODLASTYEAR(DimDate[Date])
    )

-- Year-over-Year Growth Amount
YoY Revenue Change =
    [Total Revenue] - [LY Revenue]

-- Year-over-Year Growth %
YoY Revenue % =
    DIVIDE([YoY Revenue Change], [LY Revenue], 0) * 100

-- Profit Last Year
LY Profit =
    CALCULATE([Total Profit], SAMEPERIODLASTYEAR(DimDate[Date]))

-- ── PREVIOUS PERIOD ──────────────────────────────────────

-- Revenue in the Previous Month
PM Revenue =
    CALCULATE(
        [Total Revenue],
        PREVIOUSMONTH(DimDate[Date])
    )

-- Month-over-Month Growth %
MoM Revenue % =
    DIVIDE([Total Revenue] - [PM Revenue], [PM Revenue], 0) * 100

-- Revenue in the Previous Quarter
PQ Revenue =
    CALCULATE(
        [Total Revenue],
        PREVIOUSQUARTER(DimDate[Date])
    )

-- ── DATEADD — Shift by N Periods ────────────────────────

-- Revenue 3 months ago
Revenue 3M Ago =
    CALCULATE(
        [Total Revenue],
        DATEADD(DimDate[Date], -3, MONTH)
    )

-- Revenue same week last year
Revenue LY Week =
    CALCULATE(
        [Total Revenue],
        DATEADD(DimDate[Date], -1, YEAR)
    )

-- ── ROLLING / MOVING TOTALS ──────────────────────────────

-- Rolling 3-Month Revenue
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
-- DATESINPERIOD(date_column, start_date, number, interval)
-- Gives a date range: from 3 months before the last visible date

-- Rolling 12-Month Revenue
Rolling 12M Revenue =
    CALCULATE(
        [Total Revenue],
        DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -12, MONTH)
    )

-- ── PARALLEL PERIOD ──────────────────────────────────────

-- Revenue in the same quarter last year
Same Qtr LY =
    CALCULATE(
        [Total Revenue],
        PARALLELPERIOD(DimDate[Date], -1, YEAR)
    )
```

---

## PART 7: SWITCH & IF — Conditional Measures

```dax
-- ── IF — simple two-branch conditional ──────────────────

Profit Status =
    IF([Total Profit] > 0, "Profitable", "Loss")

-- ── SWITCH — multi-branch conditional ───────────────────

-- Classify regions
Region Group =
    SWITCH(
        SELECTEDVALUE(DimGeography[Region]),
        "West",    "Western US",
        "East",    "Eastern US",
        "Central", "Central US",
        "South",   "Southern US",
        "Other"
    )

-- Dynamic measure selector (connect to a slicer)
-- Create a disconnected table: What-If Parameter or manual table
-- "Metric Selector" table with values: "Revenue", "Profit", "Orders"

Selected Metric =
    SWITCH(
        SELECTEDVALUE('Metric Selector'[Metric]),
        "Revenue", [Total Revenue],
        "Profit",  [Total Profit],
        "Orders",  [# Orders],
        [Total Revenue]   -- default
    )
-- Connecting this measure to a slicer lets users switch metrics!
```

---

## PART 8: VARIABLES — WRITE CLEANER DAX

```dax
-- Use VAR to store intermediate results
-- Makes complex DAX readable and avoids repeating calculations

% Profit Margin (with VAR) =
    VAR vRevenue = [Total Revenue]
    VAR vProfit  = [Total Profit]
    VAR vMargin  = DIVIDE(vProfit, vRevenue, 0)
    RETURN
        vMargin * 100

-- MoM % with VAR (much cleaner)
MoM Revenue % (Clean) =
    VAR vCurrent = [Total Revenue]
    VAR vPrev    = CALCULATE([Total Revenue], PREVIOUSMONTH(DimDate[Date]))
    VAR vChange  = vCurrent - vPrev
    RETURN
        IF(
            ISBLANK(vPrev) || vPrev = 0,
            BLANK(),
            DIVIDE(vChange, vPrev) * 100
        )
```

---

## PART 9: BUILDING THE DASHBOARD

### Step 1 — Create the Report Page
1. In Power BI Desktop, click the **+** at the bottom to add a page
2. Rename it: double-click the tab → "Sales Dashboard"
3. Right-click → Page Size → 16:9 (standard) or custom

### Step 2 — Apply a Theme
- View → Themes → Browse for themes / choose built-in
- Or download a JSON theme from the Power BI Community gallery
- Recommended: "Accessible Default" or a custom brand theme

### Step 3 — Add KPI Cards (Top Row)
Insert → Card visual (or new Card visual)
Drag measures:
- Card 1: Total Revenue
- Card 2: Total Profit
- Card 3: % Profit Margin
- Card 4: # Orders
- Card 5: YoY Revenue %

Format cards: no title, large font size, units = "K" or "M", conditional formatting on YoY %

### Step 4 — Add Main Visuals

| Visual | X-axis / Category | Values | Purpose |
|--------|------------------|--------|---------|
| Line Chart | Month-Year (DimDate) | Total Revenue, LY Revenue | Revenue trend vs last year |
| Clustered Bar Chart | Category (DimProduct) | Total Revenue, Total Profit | Category comparison |
| Map (Filled Map) | State (DimGeography) | Total Revenue | Geographic distribution |
| Matrix | Category → Sub-Category | Total Revenue, Total Profit, % Profit Margin | Drill-down table |
| Donut Chart | Segment (DimCustomer) | Total Revenue | Revenue share by segment |
| Waterfall Chart | Sub-Category | Total Profit | Profit contribution by product |

### Step 5 — Add Slicers
Insert → Slicer:

| Slicer | Field | Style |
|--------|-------|-------|
| Date Range | DimDate[Date] | Between (date picker) |
| Region | DimGeography[Region] | Dropdown or Tile |
| Category | DimProduct[Category] | Tile / Checkbox list |
| Segment | DimCustomer[Segment] | Tile |

**Sync Slicers** (so they work across pages):
View → Sync Slicers → check all pages where the slicer should apply

### Step 6 — Bookmarks
Bookmarks save a snapshot of the current report state (which visuals are visible, what is selected).

**Create a Bookmark:**
1. View → Bookmarks pane
2. Set up your visual state (e.g. show "By Category" grouped bar)
3. Click **Add** in Bookmarks pane → rename "Category View"
4. Change visual (e.g. switch to "By Region")
5. Add another bookmark → "Region View"

**Add Bookmark Buttons:**
1. Insert → Buttons → Bookmark
2. Format button → Action → Bookmark → choose bookmark
3. Duplicate for the second bookmark
4. Tip: Use icons or text labels (e.g. "📊 Category" / "🗺️ Region")

### Step 7 — Tooltips

#### Built-in Tooltip
- Any visual → Format → Tooltip ON → add a field to "Tooltip" well
- E.g. drag `# Orders` to Tooltip → hovering a bar shows order count

#### Custom Tooltip Page
1. Add a new page → right-click page tab → Page Information → Toggle ON "Allow use as tooltip"
2. Build a mini-report on this page (small visuals)
3. Go to the main visual → Format → Tooltip → Type = Report Page → Page = [your tooltip page]
4. Now hovering over the visual shows the full tooltip page

### Step 8 — Drill-Through
Enable users to click a category in one visual and jump to a detail page:
1. Create a "Detail" report page
2. In the "Detail" page → Visualizations → Drill through → drag the field (e.g. Category)
3. On the main page, right-click a bar → Drill through → Detail page

### Step 9 — Conditional Formatting
Make visuals smarter with color rules:
- Matrix → select a value column → Format → Conditional Formatting → Background Color
- Use "Gradient" to shade by value, or "Rules" for custom thresholds
- E.g. Profit Margin: Red (<0%) → Yellow (0-10%) → Green (>10%)

---

## PART 10: DASHBOARD DESIGN CHECKLIST

### Layout
- [ ] KPI cards in the top row (easy to scan)
- [ ] Largest / most important visual gets the most space
- [ ] Consistent margins and spacing (use Format → Align)
- [ ] All visuals aligned using the Format menu alignment tools
- [ ] Page background color set (soft gray #F3F4F6 works well)

### Visuals
- [ ] All charts have a title
- [ ] Axis labels are clear with units (e.g. "Revenue ($K)")
- [ ] Legend labels are human-readable (not raw column names)
- [ ] Dates on x-axis are formatted (Jan 2023, not 1/1/2023)
- [ ] Remove chart gridlines where not needed (declutter)
- [ ] Consistent font throughout (Segoe UI, 10–12pt)

### Interactivity
- [ ] At least 3 slicers (Date, Region, Category)
- [ ] Slicers synced across pages
- [ ] At least 1 bookmark with a toggle button
- [ ] At least 1 visual has a tooltip configured
- [ ] Drill-down or drill-through works on one visual

### Performance
- [ ] Unused queries disabled in Power Query (right-click → Enable Load → uncheck)
- [ ] No calculated columns that should be measures
- [ ] Large text columns not imported if not needed

---

## PART 11: DAX MEASURES LIBRARY — COMPLETE LIST FOR STUDENTS

```dax
-- ═══════════════════════════════════════════════════
--  CATEGORY: REVENUE & PROFIT
-- ═══════════════════════════════════════════════════

Total Revenue        = SUM(FactSales[Sales])
Total Profit         = SUM(FactSales[Profit])
Total Discount Amt   = SUMX(FactSales, FactSales[Sales] * FactSales[Discount])
Total Quantity       = SUM(FactSales[Quantity])
Net Revenue          = SUMX(FactSales, FactSales[Sales] * (1 - FactSales[Discount]))

-- ═══════════════════════════════════════════════════
--  CATEGORY: RATIOS & AVERAGES
-- ═══════════════════════════════════════════════════

% Profit Margin      = DIVIDE([Total Profit], [Total Revenue], 0) * 100
Avg Order Value      = DIVIDE([Total Revenue], [# Orders], 0)
Avg Profit per Order = DIVIDE([Total Profit], [# Orders], 0)
Avg Discount %       = AVERAGE(FactSales[Discount]) * 100

-- ═══════════════════════════════════════════════════
--  CATEGORY: COUNTS
-- ═══════════════════════════════════════════════════

# Orders             = DISTINCTCOUNT(FactSales[Order ID])
# Customers          = DISTINCTCOUNT(FactSales[Customer ID])
# Products Sold      = DISTINCTCOUNT(FactSales[Product ID])
# High Value Orders  = CALCULATE([# Orders], FactSales[Sales] > 1000)

-- ═══════════════════════════════════════════════════
--  CATEGORY: TIME INTELLIGENCE
-- ═══════════════════════════════════════════════════

YTD Revenue          = TOTALYTD([Total Revenue], DimDate[Date])
YTD Profit           = TOTALYTD([Total Profit], DimDate[Date])
LY Revenue           = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))
LY Profit            = CALCULATE([Total Profit], SAMEPERIODLASTYEAR(DimDate[Date]))
YoY Revenue %        = DIVIDE([Total Revenue] - [LY Revenue], [LY Revenue], 0) * 100
PM Revenue           = CALCULATE([Total Revenue], PREVIOUSMONTH(DimDate[Date]))
MoM Revenue %        = DIVIDE([Total Revenue] - [PM Revenue], [PM Revenue], 0) * 100
Rolling 3M Revenue   = CALCULATE([Total Revenue], DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH))

-- ═══════════════════════════════════════════════════
--  CATEGORY: CONDITIONAL / CALCULATE
-- ═══════════════════════════════════════════════════

Technology Revenue   = CALCULATE([Total Revenue], DimProduct[Category] = "Technology")
Consumer Revenue     = CALCULATE([Total Revenue], DimCustomer[Segment] = "Consumer")
West Revenue         = CALCULATE([Total Revenue], DimGeography[Region] = "West")
% of Total Revenue   = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(DimProduct[Category])), 0) * 100
% Visible Total Rev  = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALLSELECTED(DimProduct[Category])), 0) * 100
```

---

## PRACTICE EXERCISES — Week 19

**Easy:**
1. Create a Measure Table called `_Measures`. Add Total Revenue and Total Profit measures.
2. Create a Line Chart: X-axis = Month-Year, Y-axis = Total Revenue.
3. Add a Slicer for Region. Confirm it filters the line chart.

**Medium:**
4. Write a CALCULATE measure for "Technology Profit". Verify it in a Card visual.
5. Write `% of Total Revenue` and display it in a Matrix (rows=Category).
6. Write YTD Revenue and LY Revenue. Create a line chart showing both on one axis.

**Challenge:**
7. Write a full MoM Revenue % measure with VAR and ISBLANK check.
8. Build a 1-page dashboard with: 4 KPI cards, 1 line chart, 1 bar chart, 1 map, 3 slicers.
9. Add a bookmark toggle between "Category View" and "Region View".
10. Create a custom tooltip page showing 3 mini-visuals. Attach it to the main bar chart.
