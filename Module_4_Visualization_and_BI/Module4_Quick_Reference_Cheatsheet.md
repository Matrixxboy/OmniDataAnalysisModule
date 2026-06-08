# ⚡ Module 4 — Quick Reference Cheat Sheet
## Visualization & BI | Topics 16–19

---

## 📌 MATPLOTLIB (Week 16)

```python
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import numpy as np

# Always use OO interface
fig, ax = plt.subplots(figsize=(10, 5))

# LINE:      ax.plot(x, y, color, linewidth, marker, linestyle, label)
# BAR:       ax.bar(x, height, color, edgecolor, width)
# HORIZ BAR: ax.barh(y, width, color)
# SCATTER:   ax.scatter(x, y, s=size, c=color, alpha, marker)
# HISTOGRAM: ax.hist(data, bins, color, edgecolor, alpha, density)
# AREA:      ax.fill_between(x, y1, y2, alpha, color)

# FORMATTING
ax.set_title('Title', fontsize=14, fontweight='bold')
ax.set_xlabel('Label'); ax.set_ylabel('Label')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))
ax.spines[['top','right']].set_visible(False)   # remove chart junk
ax.tick_params(axis='x', rotation=45)
ax.legend(title='Legend', frameon=False)
ax.grid(axis='y', linestyle='--', alpha=0.3)

# ANNOTATIONS
ax.annotate('Peak', xy=(x_pt, y_pt), xytext=(x_txt, y_txt),
            arrowprops=dict(arrowstyle='->', color='red'), fontsize=10)
ax.axhline(0, color='black', linestyle='--', linewidth=1)   # horizontal ref line
ax.axvline(val, color='gray', linestyle=':', linewidth=1)    # vertical ref line
ax.axvspan(x1, x2, alpha=0.1, color='green')                # shaded region
ax.text(x, y, 'note', bbox=dict(boxstyle='round', facecolor='lightyellow'))

# SUBPLOTS
fig, axes = plt.subplots(2, 2, figsize=(14, 10))   # 2×2 grid
axes[0, 0].plot(...)    # top-left
axes[0, 1].bar(...)     # top-right

# STYLE & THEME
plt.style.use('seaborn-v0_8-whitegrid')
plt.rcParams.update({'font.size': 11, 'axes.titlesize': 14})

# SAVE & SHOW
plt.tight_layout()
plt.savefig('chart.png', dpi=150, bbox_inches='tight')
plt.show()
```

---

## 📌 SEABORN (Week 17)

```python
import seaborn as sns
import matplotlib.pyplot as plt

sns.set_theme(style='whitegrid', palette='tab10', font_scale=1.1)

# CATEGORICAL PLOTS (use x= / y= / hue=)
sns.barplot(   data=df, x='Category', y='Sales', hue='Segment', ax=ax)
sns.boxplot(   data=df, x='Region',   y='Sales', palette='Set2', ax=ax)
sns.violinplot(data=df, x='Category', y='Profit', inner='quartile', ax=ax)
sns.countplot( data=df, x='Segment',  order=df['Segment'].value_counts().index, ax=ax)
sns.stripplot( data=df, x='Category', y='Sales', alpha=0.3, jitter=True, ax=ax)

# DISTRIBUTION PLOTS
sns.histplot(  data=df, x='Sales', bins=40, kde=True, ax=ax)
sns.kdeplot(   data=df, x='Sales', fill=True, alpha=0.3, ax=ax)

# RELATIONAL PLOTS
sns.scatterplot(data=df, x='Discount', y='Profit', hue='Category', ax=ax)
sns.lineplot(   data=df, x='Month',    y='Sales',  hue='Region',   ax=ax)

# REGRESSION
sns.regplot( data=df, x='Discount', y='Profit',
             scatter_kws={'alpha':0.2}, line_kws={'color':'red'}, ci=95, ax=ax)
sns.lmplot(  data=df, x='Discount', y='Profit', col='Region', hue='Segment',
             height=4, aspect=1.3)

# MATRIX PLOTS
corr = df[['Sales','Profit','Discount']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdYlGn', center=0, square=True, ax=ax)

# MULTI-PANEL
sns.pairplot(df[['Sales','Profit','Discount','Category']],
             hue='Category', diag_kind='kde')

g = sns.FacetGrid(df, col='Region', col_wrap=2, height=4, sharey=False)
g.map_dataframe(sns.lineplot, x='Month', y='Sales')
g.set_titles(col_template='Region: {col_name}')

# styles: 'darkgrid','whitegrid','dark','white','ticks'
# palettes (categorical): 'tab10','Set1','Set2','Set3'
# palettes (sequential):  'Blues','Greens','Oranges'
# palettes (diverging):   'RdYlGn','coolwarm','vlag'
```

---

## 📌 POWER BI DATA MODELING (Week 18)

### Star Schema — Key Rules
```
Fact Table:   numeric measures + foreign keys → many rows, one per transaction
Dimension:    descriptive attributes + primary key → unique rows per entity

Relationship: Fact(FK) → Dimension(PK) | Cardinality: Many-to-One (*:1)
Cross Filter: Single direction (Dimension filters Fact, NOT the reverse)
Date Table:   ALWAYS have one — mark it: right-click → Mark as Date Table
```

### Calculated Columns (DAX in model, stored per row)
```dax
Profit Margin %  = DIVIDE([Profit], [Sales], 0) * 100
Net Revenue      = [Sales] * (1 - [Discount])
Days to Ship     = DATEDIFF([Order Date], [Ship Date], DAY)
Is Late Ship     = IF([Days to Ship] > 5, "Late", "On Time")
Price Tier       = SWITCH(TRUE(), [Sales]>=10000,"High Value", [Sales]>=1000,"Mid Value","Low Value")
Month-Year       = FORMAT([Order Date], "MMM YYYY")
Year             = YEAR([Order Date])
Quarter          = "Q" & QUARTER([Order Date])
```

### Power Query Tips
```
• Always Transform Data first (never Load directly)
• Every step is logged — safe to undo and modify
• Change types BEFORE creating calculated columns
• Postal Code → Text (not number! leading zeros matter)
• Use Merge Queries for JOINs, Append Queries for UNIONs
• Disable unused queries: right-click → Enable Load → OFF
```

---

## 📌 DAX & DASHBOARDS (Week 19)

### Core Measures
```dax
Total Revenue    = SUM(FactSales[Sales])
Total Profit     = SUM(FactSales[Profit])
# Orders         = DISTINCTCOUNT(FactSales[Order ID])
% Profit Margin  = DIVIDE([Total Profit], [Total Revenue], 0) * 100
Avg Order Value  = DIVIDE([Total Revenue], [# Orders], 0)
```

### CALCULATE — The Most Important Function
```dax
-- Filter to specific value
Tech Revenue  = CALCULATE([Total Revenue], DimProduct[Category] = "Technology")
West Revenue  = CALCULATE([Total Revenue], DimGeography[Region] = "West")

-- Remove filter (for % of total)
% of Total    = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(DimProduct)), 0) * 100

-- % of visible selection
% Visible     = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALLSELECTED(DimProduct[Category])), 0) * 100
```

### Time Intelligence (requires DimDate marked as Date Table)
```dax
YTD Revenue   = TOTALYTD([Total Revenue], DimDate[Date])
LY Revenue    = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(DimDate[Date]))
YoY %         = DIVIDE([Total Revenue] - [LY Revenue], [LY Revenue], 0) * 100
PM Revenue    = CALCULATE([Total Revenue], PREVIOUSMONTH(DimDate[Date]))
MoM %         = DIVIDE([Total Revenue] - [PM Revenue], [PM Revenue], 0) * 100
Rolling 3M    = CALCULATE([Total Revenue], DATESINPERIOD(DimDate[Date], LASTDATE(DimDate[Date]), -3, MONTH))
```

### Variables — Cleaner DAX
```dax
MoM Revenue % =
    VAR vCurrent = [Total Revenue]
    VAR vPrev    = CALCULATE([Total Revenue], PREVIOUSMONTH(DimDate[Date]))
    RETURN
        IF(ISBLANK(vPrev) || vPrev = 0, BLANK(),
           DIVIDE(vCurrent - vPrev, vPrev) * 100)
```

### Dashboard Interactivity
```
Slicers:    Insert → Slicer → choose field → style: Tile/Dropdown/List
Sync:       View → Sync Slicers → tick pages
Bookmarks:  View → Bookmarks → Add → name it → attach to a Button
Tooltip:    New page → Page Info → Allow as tooltip ON → Format: 320×240
Drill-through: On detail page → Drill through field well → drag dimension field
```

### Measure vs Calculated Column
```
Measure:             aggregates (SUM, COUNT) → calculated on demand → use for KPIs
Calculated Column:   row-level values → stored in model → use for attributes
Rule: IF you need per-row value → Column. IF you need a total/ratio → Measure.
```

---

## 📚 Resource Quick Links

| Topic | Resource | URL |
|-------|---------|-----|
| Matplotlib | Official docs | matplotlib.org/stable/tutorials |
| Matplotlib | Real Python guide | realpython.com/python-matplotlib-guide |
| Seaborn | Official docs | seaborn.pydata.org |
| Seaborn | Example gallery | seaborn.pydata.org/examples |
| Power BI | Microsoft Learn | learn.microsoft.com/training/powerplatform/power-bi |
| Power BI | Download Desktop | powerbi.microsoft.com/desktop |
| DAX | Function reference | dax.guide |
| DAX | Patterns & recipes | daxpatterns.com |
| Power BI | Video tutorials | youtube.com/@GuyInACube |
| Dataset | Superstore CSV | kaggle.com/datasets/vivek468/superstore-dataset-final |
