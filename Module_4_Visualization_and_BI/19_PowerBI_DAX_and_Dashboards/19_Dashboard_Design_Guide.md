# 🎨 Power BI Dashboard Design Guide
## Topic 19 | Week 19 | Layout, Visuals & Interactivity

---

## PART 1: DASHBOARD LAYOUT BLUEPRINT

```
╔══════════════════════════════════════════════════════════════════════╗
║  SUPERSTORE SALES DASHBOARD                          [Logo] [Date]  ║
╠══════╦══════╦══════╦══════╦══════════════════════════════════════════╣
║      ║      ║      ║      ║                                          ║
║  KPI ║  KPI ║  KPI ║  KPI ║         DATE SLICER                     ║
║ Card ║ Card ║ Card ║ Card ║  [Region Slicer] [Category Slicer]       ║
║      ║      ║      ║      ║                                          ║
╠══════╩══════╩══════════════╬═════════════════════════════════════════╣
║                            ║                                         ║
║   LINE CHART               ║      CLUSTERED BAR CHART                ║
║   Monthly Revenue          ║      Revenue & Profit by Category       ║
║   (This Year vs Last Year) ║                                         ║
║                            ║                                         ║
╠════════════════════════════╬══════════════╦══════════════════════════╣
║                            ║              ║                          ║
║   FILLED MAP               ║  DONUT CHART ║  MATRIX TABLE            ║
║   Revenue by State         ║  By Segment  ║  Category > Sub-Cat      ║
║                            ║              ║  Revenue | Profit | %    ║
╚════════════════════════════╩══════════════╩══════════════════════════╝
```

---

## PART 2: VISUAL SELECTION GUIDE

| Business Question | Best Visual | Why |
|------------------|-------------|-----|
| How has revenue changed over time? | Line Chart | Shows trends and direction |
| Which category/region performs best? | Bar / Column Chart | Compares discrete categories |
| Where are my customers / sales? | Map (Filled / Bubble) | Geographic distribution |
| What's the breakdown of a whole? | Donut / Pie Chart | Part-to-whole (max 5 segments) |
| How do metrics compare across hierarchy? | Matrix | Drill-down, multiple measures |
| What are the headline numbers? | KPI Card | Instant summary |
| Is performance above/below target? | KPI Visual (with target) | Shows trend + target gap |
| How do two variables correlate? | Scatter Plot | Correlation and outliers |
| What are the extreme values? | Waterfall Chart | Positive/negative contributions |
| What's the composition over time? | Stacked Area / Bar | Cumulative change |
| What are the top/bottom items? | Horizontal Bar (sorted) | Ranking |

---

## PART 3: KPI CARD CONFIGURATION

### 4 KPI Cards — Top Row Setup

#### Card 1: Total Revenue
- **Field:** `[Total Revenue]`
- **Display Units:** Thousands (K) or Millions (M)
- **Format:** `$#,##0.0,,` for millions; `$#,##0.0,` for thousands
- **Conditional Formatting:** None (or green if above target)

#### Card 2: Total Profit
- **Field:** `[Total Profit]`
- **Conditional Formatting:** Green if positive, Red if negative (Background Color → Rules)

#### Card 3: Profit Margin %
- **Field:** `[% Profit Margin]`
- **Format:** `0.0"%"`
- **Conditional Formatting:** Rules → <5% = Red, 5–15% = Yellow, >15% = Green

#### Card 4: YoY Revenue %
- **Field:** `[YoY Revenue %]`
- **Format:** `+0.0%;-0.0%`
- **Conditional Formatting:** Positive = Green, Negative = Red (Data Bars or Font Color)

---

## PART 4: LINE CHART — Revenue Trend Setup

**Visual:** Line Chart

| Field Well | Value |
|-----------|-------|
| X-Axis | DimDate[Month-Year] (sort by Month Number) |
| Y-Axis | [Total Revenue] |
| Secondary Y-Axis | [LY Revenue] |
| Legend | Leave empty (use line color to distinguish) |
| Tooltips | [# Orders], [% Profit Margin] |

**Formatting checklist:**
- [ ] Line colors: Current Year = `#2563EB`, Last Year = `#9CA3AF` (gray)
- [ ] Markers ON (small circles)
- [ ] Data labels OFF (too cluttered)
- [ ] X-axis: rotate labels 45°, show every 3rd label for dense dates
- [ ] Y-axis: display units = K, format `$#,##0.0,`
- [ ] Add a constant line at the average: Analytics pane → Average Line

---

## PART 5: CLUSTERED BAR CHART — Category Comparison

**Visual:** Clustered Bar Chart

| Field Well | Value |
|-----------|-------|
| Y-Axis | DimProduct[Category] |
| X-Axis | [Total Revenue], [Total Profit] |
| Legend | Auto (Revenue vs Profit) |
| Tooltips | [% Profit Margin], [# Orders] |

**Formatting checklist:**
- [ ] Revenue bars: `#2563EB`, Profit bars: `#16A34A`
- [ ] Data labels ON → inside end → format `$#,##0.0,`
- [ ] Sort bars: descending by Total Revenue
- [ ] Remove gridlines (too noisy with grouped bars)
- [ ] Title: "Revenue & Profit by Category"

---

## PART 6: FILLED MAP — Geographic Revenue

**Visual:** Filled Map (or Azure Maps)

| Field Well | Value |
|-----------|-------|
| Location | DimGeography[State] |
| Color Saturation | [Total Revenue] |
| Tooltips | [Total Revenue], [Total Profit], [# Orders] |

**Formatting checklist:**
- [ ] Color scale: Light blue (low) → Dark blue (high) → `Blues` palette
- [ ] Show labels: State abbreviations ON
- [ ] Map zoom: set default to show the full US
- [ ] Title: "Revenue by State"

> **Tip:** If map isn't showing correctly, add Country to the Location field first, then State.

---

## PART 7: MATRIX TABLE — Drill-Down by Category

**Visual:** Matrix

| Field Well | Value |
|-----------|-------|
| Rows | DimProduct[Category] → DimProduct[Sub-Category] (hierarchy) |
| Values | [Total Revenue], [Total Profit], [% Profit Margin], [# Orders] |

**Formatting checklist:**
- [ ] Stepped layout ON (shows indented hierarchy)
- [ ] Expand all rows: click the expand icon in the header
- [ ] Conditional formatting on `% Profit Margin`: gradient Red → Green
- [ ] Conditional formatting on `Total Profit`: data bars
- [ ] Column widths: drag manually to fit content
- [ ] Grand total: ON (bottom row)
- [ ] Subtotals: ON (per category)
- [ ] Values format: Revenue = `$#,##0.0,`, Margin = `0.0%`

---

## PART 8: SLICERS — Full Configuration

### Slicer 1: Date Range
- **Field:** DimDate[Date]
- **Slicer Style:** Between (shows two date pickers)
- **Relative Date option:** "In the last 12 months" (good default)
- **Format:** Header "Select Date Range" | Border: none

### Slicer 2: Region (Tile style)
- **Field:** DimGeography[Region]
- **Slicer Style:** Tile
- **Multi-select:** ON
- **Format:** Tile: `Filled`, Selected = `#2563EB` text white, Unselected = light gray

### Slicer 3: Category (Dropdown)
- **Field:** DimProduct[Category]
- **Slicer Style:** Dropdown
- **Show Select All:** ON

### Slicer 4: Segment (List)
- **Field:** DimCustomer[Segment]
- **Slicer Style:** List with checkboxes
- **Show Select All:** ON

### Sync Slicers Across Pages
`View → Sync Slicers` → for each slicer, tick all pages where it should apply.

---

## PART 9: BOOKMARKS — Toggle Setup

### Bookmark 1: "By Category View"
1. Show: Category bar chart (visible)
2. Hide: Region bar chart (invisible)
3. Open Bookmarks pane → Add → Rename "By Category"

### Bookmark 2: "By Region View"
1. Show: Region bar chart (visible)
2. Hide: Category bar chart (invisible)
3. Add bookmark → Rename "By Region"

### Create Toggle Buttons
1. `Insert → Buttons → Blank`
2. Add text: "📊 Category"
3. Format → Action: ON → Type: Bookmark → Bookmark: "By Category"
4. Duplicate button → change text to "🗺️ Region" → Action → "By Region"
5. Group both buttons and place in top-right corner

### Bookmark Tips
- Right-click bookmark → **Update** if you change the visual state
- Tick "Data" ON and "Display" ON for full state capture
- Tick "Current Page" to limit scope to one page

---

## PART 10: CUSTOM TOOLTIP PAGE

### Setup Steps
1. Add a new report page → rename "Tooltip Detail"
2. Right-click page tab → **Page Information**
3. Toggle ON: **"Allow use as tooltip"**
4. Set canvas size: Format → Canvas Settings → Type = Tooltip (320×240px)

### Tooltip Page Content (mini-dashboard for one category/product)
Add these 3 visuals on the tooltip page:
- **Card:** Total Revenue for hovered item
- **Card:** % Profit Margin for hovered item
- **Sparkline (small Line Chart):** Monthly Revenue trend (6 months)

### Attach Tooltip to Main Visual
1. Click your main Bar Chart
2. Format → Tooltip → Type: **Report Page**
3. Page: select "Tooltip Detail"
4. Now hovering over a bar shows the full tooltip page!

---

## PART 11: DRILL-THROUGH PAGE

### Setup
1. Add a new page → rename "Product Detail"
2. In the Visualizations pane → **Drill through** field well
3. Drag `DimProduct[Sub-Category]` into the Drill through well
4. Power BI auto-adds a back button

### Add Visuals on Drill-Through Page
- **Title Card:** showing the selected Sub-Category name using `SELECTEDVALUE(DimProduct[Sub-Category])`
- **Line Chart:** monthly revenue for this sub-category
- **Bar Chart:** top 10 products in this sub-category
- **KPI Cards:** Revenue, Profit, Margin %, # Orders

### How to Use
Right-click any Sub-Category value in the main report → Drill through → Product Detail

---

## PART 12: CONDITIONAL FORMATTING IN VISUALS

### Matrix: Color % Profit Margin Column
1. Click Matrix visual → Format → Conditional Formatting → `% Profit Margin`
2. Format by: Color scale
3. Minimum: 0% → Red `#DC2626`
4. Center: 10% → Yellow `#F59E0B`
5. Maximum: 25% → Green `#16A34A`

### KPI Card: YoY % Color by Sign
1. Click KPI card → Format → Conditional Formatting → Font Color
2. Rules:
   - If value < 0 → `#DC2626` (red)
   - If value >= 0 → `#16A34A` (green)

### Bar Chart: Highlight bars above average
1. Format → Data colors → Conditional Formatting (fx button)
2. Format by: Rules
   - If [Total Revenue] < [Average Revenue Measure] → Light gray
   - If [Total Revenue] >= [Average Revenue Measure] → `#2563EB`

---

## PART 13: THEME & BRANDING

### Applying a Custom Theme
1. View → Themes → Customize Current Theme
2. OR: View → Themes → Browse for themes (import JSON)

### Recommended Color Palette (Professional Blue Theme)
```json
{
  "name": "Analytics Course Theme",
  "dataColors": [
    "#2563EB", "#16A34A", "#DC2626", "#F59E0B",
    "#7C3AED", "#0891B2", "#BE185D", "#D97706"
  ],
  "background": "#F8FAFC",
  "foreground": "#1E293B",
  "tableAccent": "#2563EB",
  "visualStyles": {
    "*": {
      "*": {
        "fontFamily": [{"value": "Segoe UI"}],
        "fontSize": [{"value": 11}]
      }
    }
  }
}
```
Save as `course_theme.json` → import via Browse for themes.

---

## PART 14: PUBLISHING & SHARING

### Publish to Power BI Service
1. Sign in: File → Sign In → use your Microsoft account (free account works)
2. Home → **Publish** → choose "My Workspace"
3. Open Power BI Service (app.powerbi.com)
4. Your report appears under "My Workspace"

### Share Options
| Method | Audience | Requirements |
|--------|---------|-------------|
| Share link | Internal users | Pro license or Premium |
| Publish to web | Public (anyone with link) | Free, no login needed |
| Export PDF | Anyone | No Power BI license needed |
| Embed in website | Custom app | Requires Azure AAD setup |

### Export PDF
File → Export → PDF → saves current view of all pages

### Download as .pbix
File → Save → .pbix file is the editable project file (share with students)

---

## FINAL DASHBOARD CHECKLIST

### Data & Model
- [ ] All 4 relationships verified (Star Schema complete)
- [ ] DimDate marked as Date Table
- [ ] At least 10 measures created and tested
- [ ] Measure descriptions filled in (right-click → Properties → Description)
- [ ] Unused queries disabled in Power Query

### Visuals
- [ ] KPI cards: 4 top-row cards showing headline metrics
- [ ] Line chart: revenue trend with LY comparison
- [ ] Bar chart: category or region comparison
- [ ] Map: geographic revenue distribution
- [ ] Matrix: drill-down by category/sub-category with conditional formatting

### Interactivity
- [ ] 3 slicers (Date, Region, Category) synced across pages
- [ ] 2 bookmarks with toggle buttons
- [ ] Tooltip page attached to at least one visual
- [ ] Drill-through page created for sub-category detail

### Design
- [ ] Consistent color palette throughout
- [ ] All chart titles are descriptive (not "Chart 1")
- [ ] Axis labels show units (e.g. "Revenue ($K)")
- [ ] No overlapping visuals
- [ ] Report tested at 100% zoom and on mobile layout
