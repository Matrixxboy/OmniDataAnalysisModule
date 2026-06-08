# ============================================================
# SEABORN — Complete Notes & Code
# Topic 17 | Week 17
# ============================================================

import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import numpy as np

# Global theme — set once at the top of every notebook
sns.set_theme(style='whitegrid', palette='tab10', font_scale=1.1)

# Load dataset
df = pd.read_csv('superstore.csv', encoding='latin-1')
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Year']  = df['Order Date'].dt.year
df['Month'] = df['Order Date'].dt.month
df['Profit Margin'] = df['Profit'] / df['Sales']

print(df[['Sales','Profit','Discount','Quantity']].describe().round(2))


# ════════════════════════════════════════════════════════════
#  SEABORN FUNDAMENTALS
# ════════════════════════════════════════════════════════════

# CONCEPT: Every Seaborn function accepts:
#   data=  → the DataFrame
#   x=     → column for x-axis
#   y=     → column for y-axis
#   hue=   → column to split by color
#   col=   → column to split into columns (FacetGrid)
#   row=   → column to split into rows

# ALWAYS assign to fig, ax for polish:
#   fig, ax = plt.subplots(figsize=(10,5))
#   sns.boxplot(data=df, x='Category', y='Sales', ax=ax)
#   ax.set_title('My Title')


# ════════════════════════════════════════════════════════════
#  1. HEATMAP — Correlation Matrix
# ════════════════════════════════════════════════════════════

# CONCEPT:
# A heatmap colors cells in a matrix by value.
# The most common use: correlation matrix showing how numeric
# columns relate to each other.
# Values range from -1 (perfect negative) to +1 (perfect positive).
# Values near 0 mean no linear relationship.

# Step 1: compute correlation matrix
numeric_cols = ['Sales', 'Quantity', 'Discount', 'Profit']
corr_matrix  = df[numeric_cols].corr()
print(corr_matrix.round(2))

# Step 2: plot
fig, ax = plt.subplots(figsize=(7, 5))
sns.heatmap(
    corr_matrix,
    annot=True,           # show correlation values inside cells
    fmt='.2f',            # 2 decimal places
    cmap='RdYlGn',        # Red (negative) → Yellow (zero) → Green (positive)
    center=0,             # center color scale at 0
    vmin=-1, vmax=1,      # fixed scale
    square=True,          # square cells
    linewidths=0.5,       # cell borders
    ax=ax
)
ax.set_title('Correlation Matrix — Sales, Profit, Discount, Quantity',
             fontsize=13, fontweight='bold', pad=12)
plt.tight_layout()
plt.savefig('01_correlation_heatmap.png', dpi=150, bbox_inches='tight')
plt.show()

# KEY INSIGHT to teach:
# Discount ↔ Profit is strongly NEGATIVE → discounts hurt profit.
# Sales ↔ Profit is weakly positive → revenue doesn't guarantee margin.


# ── Extended heatmap: monthly × category revenue pivot
pivot = df.pivot_table(index='Category', columns='Year', values='Sales', aggfunc='sum')
fig, ax = plt.subplots(figsize=(8, 4))
sns.heatmap(pivot, annot=True, fmt=',.0f', cmap='Blues', ax=ax, linewidths=0.5)
ax.set_title('Total Sales by Category & Year', fontsize=13, fontweight='bold')
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  2. BOXPLOT — Distribution + Outliers per Category
# ════════════════════════════════════════════════════════════

# CONCEPT:
# A boxplot (box-and-whisker) summarises:
#   Box:      25th – 75th percentile (IQR)
#   Line:     Median (50th percentile)
#   Whiskers: 1.5 × IQR from box edges
#   Dots:     Outliers beyond the whiskers
# Best for: comparing spreads across multiple categories.

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Sales by Region
sns.boxplot(
    data=df,
    x='Region', y='Sales',
    palette='Set2',
    order=['West','East','Central','South'],
    ax=axes[0]
)
axes[0].set_title('Sales Distribution by Region', fontsize=13, fontweight='bold')
axes[0].set_ylabel('Sales ($)')
axes[0].yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x:,.0f}'))

# Profit by Category
sns.boxplot(
    data=df,
    x='Category', y='Profit',
    palette={'Furniture':'#F59E0B','Office Supplies':'#2563EB','Technology':'#DC2626'},
    ax=axes[1]
)
axes[1].axhline(0, color='red', linestyle='--', linewidth=1, alpha=0.7)
axes[1].set_title('Profit Distribution by Category', fontsize=13, fontweight='bold')
axes[1].set_ylabel('Profit ($)')

for ax in axes:
    ax.spines[['top','right']].set_visible(False)

plt.suptitle('Distribution Analysis', fontsize=15, fontweight='bold')
plt.tight_layout()
plt.savefig('02_boxplots.png', dpi=150, bbox_inches='tight')
plt.show()

# ── Add individual data points on top of box (stripplot overlay)
fig, ax = plt.subplots(figsize=(9, 5))
sns.boxplot( data=df, x='Segment', y='Sales', palette='pastel',  ax=ax, width=0.5)
sns.stripplot(data=df, x='Segment', y='Sales', color='navy', alpha=0.2, size=3, jitter=True, ax=ax)
ax.set_title('Sales by Segment (Box + Points)', fontsize=13, fontweight='bold')
ax.set_ylabel('Sales ($)')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  3. VIOLIN PLOT — Full Distribution Shape
# ════════════════════════════════════════════════════════════

# CONCEPT:
# A violin plot combines a boxplot with a kernel density estimate (KDE).
# The width shows how many data points exist at each value.
# Better than boxplot when distribution shape matters (bimodal, skewed, etc.)

fig, axes = plt.subplots(1, 2, figsize=(14, 5))

# Side-by-side: boxplot vs violin — teach the difference
sns.boxplot(   data=df, x='Category', y='Sales', palette='Set2', ax=axes[0])
axes[0].set_title('Boxplot: Sales by Category', fontsize=12, fontweight='bold')

sns.violinplot(data=df, x='Category', y='Sales', palette='Set2', inner='quartile', ax=axes[1])
# inner='quartile' shows quartile lines inside the violin
axes[1].set_title('Violin Plot: Sales by Category', fontsize=12, fontweight='bold')

for ax in axes:
    ax.set_ylabel('Sales ($)')
    ax.spines[['top','right']].set_visible(False)

plt.suptitle('Boxplot vs. Violin: Same Data, More Information', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.show()

# ── Split violin by hue
fig, ax = plt.subplots(figsize=(10, 5))
sns.violinplot(
    data=df,
    x='Region', y='Profit',
    hue='Segment',        # splits violin left/right by hue
    split=True,           # two segments share one violin
    palette='muted',
    inner='quartile',
    ax=ax
)
ax.axhline(0, color='red', linestyle='--', linewidth=1, alpha=0.6)
ax.set_title('Profit Distribution by Region and Segment', fontsize=13, fontweight='bold')
ax.set_ylabel('Profit ($)')
ax.spines[['top','right']].set_visible(False)
plt.legend(title='Segment', loc='upper right')
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  4. PAIRPLOT — All Variable Relationships at Once
# ════════════════════════════════════════════════════════════

# CONCEPT:
# Pairplot creates a grid where:
#   Diagonal:    distribution of each variable (histogram or KDE)
#   Off-diagonal: scatter plot of every pair of variables
# Invaluable for EDA (Exploratory Data Analysis) — spot correlations,
# outliers, and clusters in one shot.

# Sample for speed (pairplot on 10,000 rows is slow)
sample = df[['Sales','Profit','Discount','Quantity','Category']].sample(1000, random_state=42)

pairplot = sns.pairplot(
    sample,
    hue='Category',       # color points by category
    palette={'Furniture':'#F59E0B','Office Supplies':'#2563EB','Technology':'#DC2626'},
    diag_kind='kde',       # KDE on diagonal (or 'hist')
    plot_kws={'alpha': 0.4, 's': 20},
    diag_kws={'fill': True, 'alpha': 0.4}
)
pairplot.fig.suptitle('Pairplot: Sales, Profit, Discount, Quantity by Category',
                       fontsize=14, fontweight='bold', y=1.01)
plt.savefig('04_pairplot.png', dpi=100, bbox_inches='tight')
plt.show()

# KEY TEACHING POINTS:
# • Discount vs Profit (top right / bottom left): clear negative slope
# • Sales vs Profit: loose positive relationship, many outliers
# • Quantity: fairly uniform across all — no strong correlations


# ════════════════════════════════════════════════════════════
#  5. FACETGRID — Same Chart Repeated per Subgroup
# ════════════════════════════════════════════════════════════

# CONCEPT:
# FacetGrid creates a grid of subplots, one per unique value of a column.
# Perfect for: "Show me the revenue trend for EACH region."

# ── Monthly sales trend per region
monthly_region = (
    df.groupby([df['Order Date'].dt.to_period('M').dt.to_timestamp(), 'Region'])['Sales']
    .sum()
    .reset_index()
    .rename(columns={'Order Date': 'Month'})
)

g = sns.FacetGrid(
    monthly_region,
    col='Region',
    col_wrap=2,           # 2 charts per row
    height=4, aspect=1.5,
    sharey=False          # each panel has its own y-axis scale
)
g.map_dataframe(sns.lineplot, x='Month', y='Sales', color='#2563EB')
g.set_titles(col_template='Region: {col_name}', fontsize=12)
g.set_axis_labels('Month', 'Sales ($)')
g.figure.suptitle('Monthly Revenue Trend by Region', fontsize=15, fontweight='bold', y=1.02)
for ax in g.axes.flat:
    ax.tick_params(axis='x', rotation=45)
plt.tight_layout()
plt.savefig('05_facetgrid_regions.png', dpi=150, bbox_inches='tight')
plt.show()

# ── FacetGrid with histograms per segment
g2 = sns.FacetGrid(df, col='Segment', height=4, aspect=1.2)
g2.map(plt.hist, 'Sales', bins=30, color='#7C3AED', edgecolor='white', alpha=0.8)
g2.set_titles(col_template='{col_name}')
g2.set_axis_labels('Sales ($)', 'Count')
g2.figure.suptitle('Sales Distribution by Segment', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  6. REGRESSION PLOTS — Statistical Context
# ════════════════════════════════════════════════════════════

# CONCEPT:
# regplot:  scatter + linear regression line + confidence interval band
# lmplot:   same but with hue/col faceting support
# residplot: shows residuals from the regression (check model fit)

# ── regplot: Discount vs Profit
fig, ax = plt.subplots(figsize=(9, 5))
sns.regplot(
    data=df,
    x='Discount', y='Profit',
    scatter_kws={'alpha': 0.2, 's': 20, 'color': '#6B7280'},
    line_kws={'color': 'red', 'linewidth': 2},
    ci=95,               # 95% confidence interval shading
    ax=ax
)
ax.axhline(0, color='black', linestyle='--', linewidth=0.8, alpha=0.5)
ax.set_title('Discount vs Profit — Regression Analysis', fontsize=13, fontweight='bold')
ax.set_xlabel('Discount Rate')
ax.set_ylabel('Profit ($)')
ax.text(0.05, ax.get_ylim()[0]*0.7,
        'Every 10% increase in discount\ncorrelates with lower profit',
        fontsize=10, color='red',
        bbox=dict(boxstyle='round', facecolor='lightyellow'))
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.savefig('06_regplot.png', dpi=150, bbox_inches='tight')
plt.show()

# ── lmplot: same but split by Category
lm = sns.lmplot(
    data=df.sample(2000, random_state=1),
    x='Discount', y='Profit',
    hue='Category',
    palette='tab10',
    scatter_kws={'alpha': 0.3, 's': 20},
    line_kws={'linewidth': 2},
    ci=95,
    height=5, aspect=1.5
)
lm.figure.suptitle('Discount vs Profit by Category', fontsize=14, fontweight='bold', y=1.01)
plt.savefig('06b_lmplot_by_category.png', dpi=150, bbox_inches='tight')
plt.show()


# ════════════════════════════════════════════════════════════
#  ADDITIONAL USEFUL SEABORN PLOTS
# ════════════════════════════════════════════════════════════

# ── Bar plot (with error bars — shows mean + CI)
fig, ax = plt.subplots(figsize=(8, 5))
sns.barplot(data=df, x='Region', y='Sales', hue='Segment',
            palette='Set2', errorbar='sd', ax=ax)
ax.set_title('Average Sales by Region & Segment (with Std Dev)', fontsize=12, fontweight='bold')
ax.set_ylabel('Average Sales ($)')
ax.legend(title='Segment')
plt.tight_layout()
plt.show()

# ── Count plot — how many orders per Ship Mode
fig, ax = plt.subplots(figsize=(8, 4))
order = df['Ship Mode'].value_counts().index
sns.countplot(data=df, x='Ship Mode', order=order, palette='Blues_r', ax=ax)
ax.set_title('Order Count by Ship Mode', fontsize=13, fontweight='bold')
ax.set_ylabel('Number of Orders')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.show()

# ── KDE plot — smooth distribution curve
fig, ax = plt.subplots(figsize=(9, 5))
for cat in df['Category'].unique():
    sns.kdeplot(data=df[df['Category']==cat], x='Sales',
                label=cat, fill=True, alpha=0.3, ax=ax)
ax.set_title('Sales Distribution (KDE) by Category', fontsize=13, fontweight='bold')
ax.set_xlabel('Sales ($)')
ax.set_xlim(0, 3000)
ax.legend(title='Category')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  THEMES — sns.set_theme() Options
# ════════════════════════════════════════════════════════════

# style options:
#   'darkgrid'   – gray background with grid (default)
#   'whitegrid'  – white background with grid (clean)
#   'dark'       – dark background, no grid
#   'white'      – white background, no grid
#   'ticks'      – white background with tick marks

# palette options (pass to palette= argument):
#   'tab10', 'Set1', 'Set2', 'Set3'         → categorical
#   'Blues', 'Greens', 'Oranges', 'Reds'    → sequential
#   'RdYlGn', 'coolwarm', 'vlag'            → diverging
#   sns.color_palette("husl", 8)            → custom n colors

# font_scale: 0.8 (smaller) → 1.0 (default) → 1.5 (larger)

sns.set_theme(style='whitegrid', palette='tab10', font_scale=1.1)


# ════════════════════════════════════════════════════════════
#  PRACTICE EXERCISES — Week 17
# ════════════════════════════════════════════════════════════

# EASY:
# 1. Create a heatmap of average profit per Category × Region pivot.
# 2. Boxplot of Quantity ordered by Ship Mode.
# 3. Count plot of orders by Segment.
# 4. KDE plot comparing Sales distributions across all Regions.

# MEDIUM:
# 5. Violin plot: Profit by Category, split by high/low Discount (create a binary column).
# 6. Pairplot of Sales, Profit, Discount with hue='Region'.
# 7. FacetGrid: Sales vs Profit scatter for each Segment (col='Segment').
# 8. regplot: Sales vs Quantity — is there a relationship?

# CHALLENGE:
# 9. Build an EDA summary notebook: load data → heatmap → pairplot → 4 distribution plots.
# 10. Side-by-side: boxplot vs violin for the same data — write a 3-line interpretation.
# 11. lmplot: Sales vs Profit with col='Region' and hue='Segment'.
