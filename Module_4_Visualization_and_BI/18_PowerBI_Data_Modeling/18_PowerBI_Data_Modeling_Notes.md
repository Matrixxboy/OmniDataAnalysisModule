# Power BI — Data Modeling: Complete Notes
## Topic 18 | Week 18 | Instructor Teaching Guide

---

## PART 1: WHAT IS POWER BI?

Power BI is Microsoft's business intelligence platform. It has three parts:
- **Power BI Desktop** — free Windows app where you build everything
- **Power BI Service** — cloud portal to publish and share dashboards
- **Power BI Mobile** — view dashboards on phone/tablet

### The Three Layers of Power BI Desktop

```
┌───────────────────────────────────────────────────┐
│  3. REPORT VIEW   → Visuals, charts, dashboards   │
│  2. DATA VIEW     → See loaded tables and rows    │
│  1. MODEL VIEW    → Tables, relationships, schema │
└───────────────────────────────────────────────────┘
         ↑ All three sit on top of ↓
┌───────────────────────────────────────────────────┐
│  POWER QUERY EDITOR  → Clean and shape data first │
└───────────────────────────────────────────────────┘
```

**Teaching order:** Power Query → Model View → Data View → Report View

---

## PART 2: CONNECTING DATA SOURCES

### Step-by-Step: Import a CSV File
1. Open Power BI Desktop
2. Click **Home → Get Data → Text/CSV**
3. Browse to `Superstore.csv` → **Load** (or **Transform Data** to clean first)
4. The table appears in the **Data pane** (right side)

### Other Common Connectors

| Source | Path | Notes |
|--------|------|-------|
| Excel | Get Data → Excel Workbook | Imports sheets and named tables |
| SQL Server | Get Data → SQL Server | Enter server name + database |
| PostgreSQL | Get Data → PostgreSQL | Requires PostgreSQL connector |
| Web | Get Data → Web | Scrape HTML tables from URLs |
| Folder | Get Data → Folder | Import multiple files at once |
| SharePoint | Get Data → SharePoint | Team file access |
| Dataverse | Get Data → Dataverse | Microsoft 365 data |

### Choosing Load vs Transform
- **Load** → data goes straight into the model as-is
- **Transform Data** → opens Power Query Editor — ALWAYS do this first to inspect and clean

---

## PART 3: POWER QUERY IN POWER BI

Power Query is the **ETL (Extract, Transform, Load)** layer of Power BI.
Every step is recorded and replays automatically on refresh.

### Power Query Editor — Key Areas
```
┌─────────────────────────────────────────────────────┐
│  Queries Pane (left) │ Preview Grid │ Applied Steps  │
│  (all your tables)   │ (data rows)  │ (right side)   │
└─────────────────────────────────────────────────────┘
```

### Essential Transformations — Step by Step

#### 1. Change Data Type
- Click the **type icon** left of column header
- Or: Home tab → Data Type dropdown
- Common types: Text, Whole Number, Decimal Number, Date, True/False

#### 2. Rename a Column
- Double-click column header → type new name

#### 3. Remove Columns
- Select column(s) → right-click → Remove Columns
- Or: Home → Remove Columns → Remove Other Columns (keep selected only)

#### 4. Filter Rows
- Click dropdown arrow on column header → uncheck values to exclude
- E.g. remove test orders: filter `Order ID` → "does not start with TEST"

#### 5. Replace Values
- Right-click column → Replace Values
- Example: Replace "Printers & Faxes" → "Printers"

#### 6. Split Column
- Right-click column → Split Column → By Delimiter
- Example: Split "John Smith" → "John" | "Smith"

#### 7. Add Custom Column
- Add Column → Custom Column
- Write an M formula: `= [Sales] * (1 - [Discount])`

#### 8. Merge Queries (JOIN)
- Home → Merge Queries
- Select join columns from both tables → choose join type
- This is equivalent to SQL JOIN

#### 9. Append Queries (UNION)
- Home → Append Queries
- Stack two tables with the same columns vertically

### The M Language (basics)
Power Query formulas are written in **M language**.
```
// Add a Net Sales column
= Table.AddColumn(#"Previous Step", "Net Sales",
    each [Sales] * (1 - [Discount]), type number)

// Filter rows where Sales > 100
= Table.SelectRows(#"Previous Step", each [Sales] > 100)

// Change column to Date type
= Table.TransformColumnTypes(#"Changed Type",
    {{"Order Date", type date}})
```
> Teaching tip: Students rarely need to write M manually — the GUI generates it. But reading M helps debug complex transformations.

---

## PART 4: STAR SCHEMA — THE CORE CONCEPT

### What is a Star Schema?
A **Star Schema** is the recommended data model for BI tools.
It separates data into:
- **Fact Table** — numeric measurements (what happened): sales, revenue, quantity
- **Dimension Tables** — context/descriptors (who, what, where, when)

```
              DimDate
                 │
     DimCustomer─┤
                 │
    DimProduct──[FactSales]──DimShipper
                 │
           DimGeography
```

The Fact table is in the CENTER, surrounded by Dimensions like star points.

### Why Star Schema?

| Without Star Schema | With Star Schema |
|--------------------|-----------------|
| One giant flat table | Separate concern tables |
| Duplicate data everywhere | Each value stored once |
| Slow DAX calculations | Fast DAX (optimized engine) |
| Hard to maintain | Easy to extend |
| Confusing model | Clean, readable model |

### Fact Table Rules
- Contains **foreign keys** pointing to each dimension
- Contains **numeric measures** (Sales, Quantity, Discount, Profit)
- One row per transaction/event
- Should NOT contain descriptive text (names, addresses)

### Dimension Table Rules
- Contains a **primary key** (unique per row)
- Contains **descriptive attributes** (name, category, city)
- Relatively small (few hundred to few thousand rows)
- Changes infrequently

---

## PART 5: BUILDING THE STAR SCHEMA — SUPERSTORE EXAMPLE

### Step 1: Analyse the Flat File
The Superstore CSV has these columns:
```
Order ID, Order Date, Ship Date, Ship Mode,
Customer ID, Customer Name, Segment,
Country, City, State, Postal Code, Region,
Product ID, Category, Sub-Category, Product Name,
Sales, Quantity, Discount, Profit
```

### Step 2: Identify Tables

| Table | Type | Key Column | Columns |
|-------|------|-----------|---------|
| **FactSales** | Fact | Order ID + Product ID | Order ID, Customer ID, Product ID, Order Date, Ship Mode, Sales, Quantity, Discount, Profit |
| **DimCustomer** | Dimension | Customer ID | Customer ID, Customer Name, Segment |
| **DimProduct** | Dimension | Product ID | Product ID, Product Name, Category, Sub-Category |
| **DimGeography** | Dimension | Postal Code | Postal Code, City, State, Country, Region |
| **DimDate** | Dimension | Date | Date, Day, Month, Month Name, Quarter, Year, Weekday |

### Step 3: Create Tables in Power Query

**Create DimCustomer:**
1. Right-click query → Duplicate
2. Keep only: Customer ID, Customer Name, Segment
3. Home → Remove Duplicates
4. Rename query to "DimCustomer"

**Create DimProduct:**
1. Duplicate original query
2. Keep only: Product ID, Product Name, Category, Sub-Category
3. Remove Duplicates
4. Rename to "DimProduct"

**Create DimGeography:**
1. Duplicate original query
2. Keep only: Postal Code, City, State, Country, Region
3. Remove Duplicates
4. Rename to "DimGeography"

**Create FactSales:**
1. Duplicate original query
2. Keep only: Order ID, Customer ID, Product ID, Postal Code, Order Date, Ship Date, Ship Mode, Sales, Quantity, Discount, Profit
3. Rename to "FactSales"

**Create DimDate (Date Table):**
Every Power BI model should have a dedicated calendar table.
In Power Query → New Query → Blank Query → paste this M code:

```
let
    StartDate = #date(2020, 1, 1),
    EndDate   = #date(2026, 12, 31),
    NumDays   = Duration.Days(EndDate - StartDate) + 1,
    Dates     = List.Dates(StartDate, NumDays, #duration(1,0,0,0)),
    Table     = Table.FromList(Dates, Splitter.SplitByNothing(), {"Date"}),
    AddYear   = Table.AddColumn(Table,  "Year",       each Date.Year([Date]),   Int64.Type),
    AddQtr    = Table.AddColumn(AddYear,"Quarter",    each "Q" & Text.From(Date.QuarterOfYear([Date])), type text),
    AddMonth  = Table.AddColumn(AddQtr, "Month",      each Date.Month([Date]),  Int64.Type),
    AddMName  = Table.AddColumn(AddMonth,"Month Name",each Date.MonthName([Date]), type text),
    AddDay    = Table.AddColumn(AddMName,"Day",       each Date.Day([Date]),    Int64.Type),
    AddWDay   = Table.AddColumn(AddDay,  "Weekday",   each Date.DayOfWeekName([Date]), type text),
    SetDateType = Table.TransformColumnTypes(AddWDay, {{"Date", type date}})
in
    SetDateType
```

---

## PART 6: TABLE RELATIONSHIPS

### Setting Up Relationships — Step by Step
1. Switch to **Model View** (left rail icon)
2. Drag a column from one table onto the matching column in another
3. A line appears between tables — this is the relationship

**OR:** Home → Manage Relationships → New

### Relationship Properties

#### Cardinality
| Type | Meaning | Example |
|------|---------|---------|
| **Many-to-One (\*:1)** | Most common. Many fact rows → one dimension row | Many sales → one customer |
| **One-to-One (1:1)** | Rare. One row in each table matches exactly | Employee ↔ Employee Detail |
| **Many-to-Many (\*:\*)** | Complex. Avoid if possible | Products ↔ Promotions |

**Rule:** Fact → Dimension should always be Many-to-One.

#### Cross Filter Direction
| Direction | Meaning | Use Case |
|-----------|---------|---------|
| **Single** | Filter flows FROM dimension TO fact only | Standard — use this by default |
| **Both** | Filter flows both ways | Rare — can cause ambiguity |

**Rule:** Almost always use Single direction. Only use Both when required.

#### Active vs. Inactive
- **Active** — the default used by all DAX unless specified otherwise
- **Inactive** — for alternative date relationships (e.g. Ship Date vs Order Date)
- Activate with `USERELATIONSHIP()` in DAX

### Relationship Best Practices
- ✅ Each fact table column that references a dimension should have an active relationship
- ✅ Always have a DimDate table connected to your date column
- ✅ Mark DimDate as a "Date Table" (right-click table → Mark as Date Table)
- ❌ Avoid circular relationships (A → B → C → A)
- ❌ Avoid Many-to-Many unless absolutely necessary

### Reading the Model View Diagram
```
DimCustomer ──────────────── FactSales
(1)                              (*)
Customer ID ─────────────── Customer ID

DimProduct  ──────────────── FactSales
(1)                              (*)
Product ID  ─────────────── Product ID

DimGeography ─────────────── FactSales
(1)                               (*)
Postal Code  ─────────────── Postal Code

DimDate ──────────────────── FactSales
(1)                               (*)
Date         ─────────────── Order Date
```

---

## PART 7: CALCULATED COLUMNS

### Calculated Column vs. Measure — KEY DISTINCTION

| | Calculated Column | Measure |
|--|-------------------|---------|
| **Where stored** | In the table (row by row) | In memory, calculated on demand |
| **When calculated** | At data load/refresh | At query/visual render time |
| **References** | Current row context | Aggregation context |
| **Use for** | Row-level attributes | KPIs and aggregated metrics |
| **Example** | Profit Margin % per row | Total Profit for selected period |

**Rule:** If you need a value **per row** → Calculated Column. If you need a **summary** → Measure.

### Adding a Calculated Column
1. Click the table in Data View or Model View
2. **Table Tools → New Column** (or right-click column header → New Column)
3. Write DAX formula in the formula bar

### Calculated Column Examples

```dax
-- Profit Margin % (per order row)
Profit Margin % = DIVIDE([Profit], [Sales], 0) * 100

-- Full Customer Label
Customer Label = [Customer Name] & " (" & [Segment] & ")"

-- Month-Year label for time axis
Month-Year = FORMAT([Order Date], "MMM YYYY")

-- Month Number (for sorting)
Month Number = MONTH([Order Date])

-- Year
Year = YEAR([Order Date])

-- Quarter
Quarter = "Q" & QUARTER([Order Date])

-- Price Tier based on Sales
Price Tier =
    SWITCH(
        TRUE(),
        [Sales] >= 10000, "High Value",
        [Sales] >= 1000,  "Mid Value",
        "Low Value"
    )

-- Days to Ship
Days to Ship = DATEDIFF([Order Date], [Ship Date], DAY)

-- Is Late? (more than 5 days)
Is Late Ship = IF([Days to Ship] > 5, "Late", "On Time")

-- Net Revenue after Discount
Net Revenue = [Sales] * (1 - [Discount])
```

---

## PART 8: DATA TYPES AND FORMATTING

### Setting Data Types (Data View → Column Tools)

| Column | Correct Type |
|--------|-------------|
| Order ID | Text |
| Order Date, Ship Date | Date |
| Sales, Profit, Discount | Decimal Number |
| Quantity | Whole Number |
| Customer Name, City, Category | Text |
| Postal Code | Text (NOT number — leading zeros!) |

### Formatting Display
- Select column → **Column Tools** tab → Format dropdown
- Currency: `$#,##0.00`
- Percentage: `0.00%`
- Integer: `#,##0`

### Hiding Columns
Right-click a column → **Hide in Report View**
- Hide all foreign key ID columns (Customer ID in FactSales, etc.)
- Users only see names, not raw IDs
- The relationship still works behind the scenes

### Sort by Column
If "Month Name" sorts alphabetically (April, August...) instead of chronologically:
1. Select "Month Name" column
2. Column Tools → **Sort by Column** → choose "Month Number"

---

## PART 9: MODEL DOCUMENTATION TEMPLATE

Use this structure in `18_Model_Documentation.md`:

```
## Model Name: Superstore Sales Model
## Created: [Date]  |  Data Source: Superstore.csv

### Tables

| Table | Type | Rows | Description |
|-------|------|------|-------------|
| FactSales | Fact | ~9,994 | One row per order line item |
| DimCustomer | Dimension | ~793 | Unique customers |
| DimProduct | Dimension | ~1,862 | Unique products |
| DimGeography | Dimension | ~631 | Unique postal codes |
| DimDate | Dimension | ~2,557 | Calendar table 2020-2026 |

### Relationships

| From Table.Column | To Table.Column | Cardinality | Direction |
|-------------------|----------------|-------------|-----------|
| FactSales.Customer ID | DimCustomer.Customer ID | *:1 | Single |
| FactSales.Product ID  | DimProduct.Product ID   | *:1 | Single |
| FactSales.Postal Code | DimGeography.Postal Code| *:1 | Single |
| FactSales.Order Date  | DimDate.Date            | *:1 | Single |

### Calculated Columns

| Table | Column Name | Formula | Purpose |
|-------|------------|---------|---------|
| FactSales | Profit Margin % | DIVIDE([Profit],[Sales],0)*100 | Row-level margin |
| FactSales | Price Tier | SWITCH(TRUE(),...) | Segment orders |
| FactSales | Days to Ship | DATEDIFF(...) | Shipping speed |
| DimDate | Month-Year | FORMAT([Date],"MMM YYYY") | Time axis label |
```

---

## PART 10: COMMON MISTAKES & HOW TO FIX THEM

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Many-to-Many relationship | Ambiguous relationship warning | Check for duplicate keys in dimension tables; use Remove Duplicates |
| Inactive relationship | Visual shows blank | Either activate the relationship or use USERELATIONSHIP() in DAX |
| Date column as Text | Can't use time intelligence DAX | Change column type to Date in Power Query |
| No date table | TOTALYTD, SAMEPERIODLASTYEAR fail | Add a DimDate table; mark as Date Table |
| Cross-filter Both | Circular dependency warning | Change to Single direction |
| Postal Code as number | Leading zeros lost (e.g. 06901 → 6901) | Change to Text type in Power Query |
| Calculated Column instead of Measure | Slow refresh, large file size | Move aggregations (SUM, AVERAGE) to Measures |

---

## PRACTICE EXERCISES — Week 18

**Easy:**
1. Open Power BI Desktop → Get Data → load `superstore.csv`.
2. In Power Query, rename columns: remove spaces (e.g. "Sub-Category" → "SubCategory").
3. Add a `Year` column and a `Month Number` column using Add Column → Date.

**Medium:**
4. Split the flat Superstore CSV into 4 tables: FactSales, DimCustomer, DimProduct, DimGeography.
5. Build all 4 relationships in Model View. Verify cardinality is \*:1 for each.
6. Add a DimDate table using the M code above; mark it as a Date Table.

**Challenge:**
7. Add 5 calculated columns to FactSales: Profit Margin %, Net Revenue, Days to Ship, Is Late Ship, Price Tier.
8. Hide all foreign key columns in the Fact table from Report View.
9. Verify your model: create a simple Matrix visual → Rows=Category, Values=Sum of Sales. Does it work?
10. Screenshot your Model View diagram and paste it into `18_Model_Documentation.md`.
