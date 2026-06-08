# Pivot Tables — Detailed Notes

## Creating a Pivot Table
1. Click anywhere in your data range
2. Go to **Insert → PivotTable**
3. Choose "New Worksheet"
4. Use the Field List panel on the right

## Field Areas
| Area | Purpose | Example |
|------|---------|---------|
| **Rows** | Categories down the left | Product, Region |
| **Columns** | Categories across the top | Quarter, Year |
| **Values** | Numbers to aggregate | Sales, Profit |
| **Filters** | Top-level filter (whole table) | Year, Manager |

---

## Value Field Settings — Key Options
Right-click a value → "Value Field Settings"

| Setting | Use Case |
|---------|----------|
| Sum | Total revenue |
| Count | Number of orders |
| Average | Avg order value |
| % of Row Total | Regional share of total |
| % of Column Total | Product share per region |
| Running Total | Cumulative sales over months |
| Rank Smallest to Largest | Sales ranking |

---

## Grouping Dates
1. Click any date in the Row/Column area
2. Right-click → **Group**
3. Select: Days, Months, Quarters, Years

### Useful groupings for business analysis:
- Month + Year (seasonality)
- Quarter + Year (financial reporting)

---

## Slicers
1. Click inside Pivot Table
2. **PivotTable Analyze → Insert Slicer**
3. Tick the fields you want as slicers
4. Style them: **Slicer → Slicer Styles**

### Connecting one slicer to multiple pivot tables:
Right-click slicer → **Report Connections** → tick all related pivots

---

## Pivot Charts
1. Click inside Pivot Table
2. **Insert → PivotChart**
3. Choose chart type
4. Chart updates automatically when filters/slicers change

### Recommended chart types for dashboards:
- **Bar/Column** — comparing categories
- **Line** — trends over time
- **Donut** — share/proportion
- **KPI Cards** — single metric highlight (use a text box + formula)

---

## 🧪 Practice Exercises
1. Load the Kaggle Superstore dataset
2. Create: Total Sales by Category and Sub-Category
3. Create: Monthly Revenue trend (line chart)
4. Create: Top 10 Products by Profit (sorted bar)
5. Add slicers: Region, Category, Year
6. Combine into a single-page dashboard layout
