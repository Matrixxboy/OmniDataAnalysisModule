# ============================================================
# MATPLOTLIB — Complete Notes & Code
# Topic 16 | Week 16
# ============================================================
# Run in Jupyter Notebook or any Python environment
# Dataset: Kaggle Superstore Sales (superstore.csv)
# ============================================================

# ── Setup — run this cell first in every notebook
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('superstore.csv', encoding='latin-1')
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Month'] = df['Order Date'].dt.to_period('M')

print(df.shape)
print(df.columns.tolist())
print(df.head(3))


# ════════════════════════════════════════════════════════════
#  MATPLOTLIB ARCHITECTURE — MUST UNDERSTAND FIRST
# ════════════════════════════════════════════════════════════

# Matplotlib has TWO interfaces:
#
# 1. PYPLOT interface (quick, stateless — fine for simple plots)
#    plt.plot(x, y)
#    plt.show()
#
# 2. OBJECT-ORIENTED interface (recommended for production)
#    fig, ax = plt.subplots()
#    ax.plot(x, y)
#    plt.show()
#
# The OO interface gives you full control.
# ALWAYS use fig, ax = plt.subplots() for anything non-trivial.

# Key objects:
#   Figure  — the entire canvas (like a page)
#   Axes    — one plot area within the figure (has x-axis, y-axis, title)
#   Artist  — everything drawn (lines, text, patches)


# ════════════════════════════════════════════════════════════
#  1. LINE CHART — Trends Over Time
# ════════════════════════════════════════════════════════════

# CONCEPT:
# Line charts show change over a continuous variable (usually time).
# Best for: revenue trends, stock prices, traffic over days/months.

# Prepare data: monthly revenue
monthly_sales = (
    df.groupby('Month')['Sales']
    .sum()
    .reset_index()
)
monthly_sales['Month_str'] = monthly_sales['Month'].astype(str)

# ── Basic line chart (OO style)
fig, ax = plt.subplots(figsize=(12, 5))

ax.plot(
    monthly_sales['Month_str'],
    monthly_sales['Sales'],
    color='#2563EB',       # hex color
    linewidth=2,
    marker='o',            # dot at each data point
    markersize=5,
    label='Monthly Revenue'
)

# Formatting
ax.set_title('Monthly Revenue Trend', fontsize=16, fontweight='bold', pad=15)
ax.set_xlabel('Month', fontsize=12)
ax.set_ylabel('Revenue (₹)', fontsize=12)
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))
ax.tick_params(axis='x', rotation=45)
ax.legend()
ax.grid(axis='y', linestyle='--', alpha=0.5)

# Annotation — mark the peak month
peak_idx = monthly_sales['Sales'].idxmax()
ax.annotate(
    f"Peak: ${monthly_sales.loc[peak_idx,'Sales']:,.0f}",
    xy=(monthly_sales.loc[peak_idx,'Month_str'], monthly_sales.loc[peak_idx,'Sales']),
    xytext=(peak_idx - 3, monthly_sales['Sales'].max() * 0.95),
    arrowprops=dict(arrowstyle='->', color='red'),
    fontsize=10,
    color='red'
)

plt.tight_layout()
plt.savefig('01_monthly_revenue_line.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Multi-line chart (multiple series)
segment_monthly = (
    df.groupby(['Month', 'Segment'])['Sales']
    .sum()
    .unstack()
    .reset_index()
)
segment_monthly['Month_str'] = segment_monthly['Month'].astype(str)

colors = {'Consumer': '#2563EB', 'Corporate': '#16A34A', 'Home Office': '#DC2626'}

fig, ax = plt.subplots(figsize=(13, 5))
for segment in ['Consumer', 'Corporate', 'Home Office']:
    ax.plot(
        segment_monthly['Month_str'],
        segment_monthly[segment],
        label=segment,
        color=colors[segment],
        linewidth=2,
        marker='o',
        markersize=4
    )

ax.set_title('Monthly Revenue by Customer Segment', fontsize=15, fontweight='bold')
ax.set_xlabel('Month')
ax.set_ylabel('Sales ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x:,.0f}'))
ax.tick_params(axis='x', rotation=45)
ax.legend(title='Segment')
ax.grid(axis='y', linestyle='--', alpha=0.4)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  2. BAR CHART — Comparing Categories
# ════════════════════════════════════════════════════════════

# CONCEPT:
# Bar charts compare discrete categories.
# Vertical bars (plt.bar) → few categories, standard comparison
# Horizontal bars (plt.barh) → many categories, long labels

# ── Vertical bar — Sales by Category
cat_sales = df.groupby('Category')['Sales'].sum().sort_values(ascending=False)

fig, ax = plt.subplots(figsize=(8, 5))
bars = ax.bar(
    cat_sales.index,
    cat_sales.values,
    color=['#2563EB', '#16A34A', '#DC2626'],
    edgecolor='white',
    linewidth=0.5
)

# Add value labels on top of each bar
for bar in bars:
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 2000,
        f'${bar.get_height():,.0f}',
        ha='center', va='bottom', fontsize=10, fontweight='bold'
    )

ax.set_title('Total Sales by Category', fontsize=15, fontweight='bold')
ax.set_xlabel('Category')
ax.set_ylabel('Total Sales ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x/1000:.0f}K'))
ax.spines[['top', 'right']].set_visible(False)  # remove chart junk
plt.tight_layout()
plt.show()


# ── Horizontal bar — Top 10 Sub-Categories by Profit
subcat_profit = (
    df.groupby('Sub-Category')['Profit']
    .sum()
    .sort_values()
    .tail(10)
)

fig, ax = plt.subplots(figsize=(9, 6))
colors_bar = ['#DC2626' if v < 0 else '#16A34A' for v in subcat_profit.values]
bars = ax.barh(subcat_profit.index, subcat_profit.values, color=colors_bar)

# Value labels
for bar, val in zip(bars, subcat_profit.values):
    label_x = val + 500 if val >= 0 else val - 500
    ha = 'left' if val >= 0 else 'right'
    ax.text(label_x, bar.get_y() + bar.get_height()/2,
            f'${val:,.0f}', va='center', ha=ha, fontsize=9)

ax.axvline(0, color='black', linewidth=0.8)  # zero reference line
ax.set_title('Top 10 Sub-Categories by Profit', fontsize=14, fontweight='bold')
ax.set_xlabel('Total Profit ($)')
ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()


# ── Grouped bar — Sales & Profit by Region
region_stats = df.groupby('Region')[['Sales', 'Profit']].sum()

x = np.arange(len(region_stats.index))
width = 0.35

fig, ax = plt.subplots(figsize=(10, 5))
ax.bar(x - width/2, region_stats['Sales'],   width, label='Sales',  color='#2563EB')
ax.bar(x + width/2, region_stats['Profit'],  width, label='Profit', color='#16A34A')

ax.set_xticks(x)
ax.set_xticklabels(region_stats.index)
ax.set_title('Sales vs Profit by Region', fontsize=14, fontweight='bold')
ax.set_ylabel('Amount ($)')
ax.legend()
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x, _: f'${x/1000:.0f}K'))
ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  3. SCATTER PLOT — Correlation Between Two Variables
# ════════════════════════════════════════════════════════════

# CONCEPT:
# Scatter plots reveal relationships (correlations) between two numeric variables.
# Add color (hue) for a third dimension.
# Add size for a fourth dimension.

fig, ax = plt.subplots(figsize=(10, 6))

categories = df['Category'].unique()
palette = {'Furniture': '#F59E0B', 'Office Supplies': '#2563EB', 'Technology': '#DC2626'}

for cat in categories:
    subset = df[df['Category'] == cat]
    ax.scatter(
        subset['Discount'],
        subset['Profit'],
        label=cat,
        alpha=0.5,
        s=30,                     # dot size
        color=palette[cat],
        edgecolors='none'
    )

# Reference lines
ax.axhline(0, color='black', linewidth=0.8, linestyle='--', alpha=0.5)
ax.axvline(0.2, color='gray', linewidth=0.8, linestyle=':', alpha=0.5)
ax.text(0.21, ax.get_ylim()[0] * 0.9, '20% Discount', color='gray', fontsize=9)

# Trend line (linear regression)
z = np.polyfit(df['Discount'], df['Profit'], 1)
p = np.poly1d(z)
x_line = np.linspace(0, df['Discount'].max(), 100)
ax.plot(x_line, p(x_line), 'k--', linewidth=1.5, label='Trend')

ax.set_title('Discount vs. Profit by Category', fontsize=14, fontweight='bold')
ax.set_xlabel('Discount Rate', fontsize=11)
ax.set_ylabel('Profit ($)', fontsize=11)
ax.legend(title='Category')
ax.spines[['top', 'right']].set_visible(False)
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  4. HISTOGRAM — Distribution of a Single Variable
# ════════════════════════════════════════════════════════════

# CONCEPT:
# A histogram shows the frequency distribution of a continuous variable.
# Bins group values into ranges; the height shows how many values fall in each bin.
# Use to: identify skewness, outliers, gaps, and concentration of data.

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Sales distribution
axes[0].hist(df['Sales'], bins=50, color='#2563EB', edgecolor='white', alpha=0.8)
axes[0].axvline(df['Sales'].mean(),   color='red',    linestyle='--', linewidth=1.5, label=f"Mean: ${df['Sales'].mean():,.0f}")
axes[0].axvline(df['Sales'].median(), color='orange', linestyle='--', linewidth=1.5, label=f"Median: ${df['Sales'].median():,.0f}")
axes[0].set_title('Sales Distribution', fontsize=13, fontweight='bold')
axes[0].set_xlabel('Sales ($)')
axes[0].set_ylabel('Frequency')
axes[0].legend()

# Profit distribution
axes[1].hist(df['Profit'], bins=50, color='#16A34A', edgecolor='white', alpha=0.8)
axes[1].axvline(df['Profit'].mean(),   color='red',    linestyle='--', linewidth=1.5, label=f"Mean: ${df['Profit'].mean():,.0f}")
axes[1].axvline(df['Profit'].median(), color='orange', linestyle='--', linewidth=1.5, label=f"Median: ${df['Profit'].median():,.0f}")
axes[1].set_title('Profit Distribution', fontsize=13, fontweight='bold')
axes[1].set_xlabel('Profit ($)')
axes[1].set_ylabel('Frequency')
axes[1].legend()

plt.suptitle('Revenue & Profit Distributions', fontsize=15, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('04_distributions.png', dpi=150, bbox_inches='tight')
plt.show()


# ════════════════════════════════════════════════════════════
#  5. SUBPLOTS — Multiple Charts in One Figure
# ════════════════════════════════════════════════════════════

# CONCEPT:
# plt.subplots(rows, cols) creates a grid of Axes.
# Each ax in the grid is an independent chart.
# Use for dashboards, comparisons, and multi-metric reports.

fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Superstore Sales Dashboard', fontsize=18, fontweight='bold', y=1.01)

# ── Chart 1 (top-left): Revenue by Category
cat_rev = df.groupby('Category')['Sales'].sum()
axes[0, 0].bar(cat_rev.index, cat_rev.values, color=['#2563EB','#16A34A','#DC2626'])
axes[0, 0].set_title('Revenue by Category')
axes[0, 0].set_ylabel('Sales ($)')
axes[0, 0].yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))

# ── Chart 2 (top-right): Profit Margin by Segment
df['Profit Margin'] = df['Profit'] / df['Sales']
seg_margin = df.groupby('Segment')['Profit Margin'].mean() * 100
axes[0, 1].bar(seg_margin.index, seg_margin.values, color='#7C3AED')
axes[0, 1].set_title('Avg Profit Margin by Segment')
axes[0, 1].set_ylabel('Margin (%)')

# ── Chart 3 (bottom-left): Monthly Revenue Trend
monthly = df.groupby('Month')['Sales'].sum()
axes[1, 0].plot(range(len(monthly)), monthly.values, color='#2563EB', linewidth=2)
axes[1, 0].set_title('Monthly Revenue Trend')
axes[1, 0].set_ylabel('Sales ($)')
axes[1, 0].set_xlabel('Month')

# ── Chart 4 (bottom-right): Discount vs Profit
axes[1, 1].scatter(df['Discount'], df['Profit'], alpha=0.3, s=15, color='#F59E0B')
axes[1, 1].axhline(0, color='red', linestyle='--', linewidth=1)
axes[1, 1].set_title('Discount vs Profit')
axes[1, 1].set_xlabel('Discount')
axes[1, 1].set_ylabel('Profit ($)')

# Clean up all axes
for row in axes:
    for ax in row:
        ax.spines[['top', 'right']].set_visible(False)

plt.tight_layout()
plt.savefig('05_dashboard_subplots.png', dpi=150, bbox_inches='tight')
plt.show()


# ════════════════════════════════════════════════════════════
#  6. CUSTOM STYLING
# ════════════════════════════════════════════════════════════

# ── Built-in styles
print(plt.style.available)          # see all available styles

plt.style.use('seaborn-v0_8-whitegrid')    # clean grid style
plt.style.use('ggplot')                    # R-style
plt.style.use('dark_background')           # dark mode
plt.style.use('default')                   # reset

# ── rcParams — global defaults
plt.rcParams.update({
    'figure.figsize':    (10, 5),
    'figure.dpi':        120,
    'font.family':       'DejaVu Sans',
    'font.size':         11,
    'axes.titlesize':    14,
    'axes.titleweight':  'bold',
    'axes.labelsize':    11,
    'axes.spines.top':   False,
    'axes.spines.right': False,
    'axes.grid':         True,
    'grid.alpha':        0.3,
    'grid.linestyle':    '--',
    'lines.linewidth':   2,
    'legend.frameon':    False,
    'savefig.bbox':      'tight',
    'savefig.dpi':       150,
})

# ── Custom color palette
COLORS = {
    'blue':   '#2563EB',
    'green':  '#16A34A',
    'red':    '#DC2626',
    'yellow': '#F59E0B',
    'purple': '#7C3AED',
    'gray':   '#6B7280',
}

# ── Annotations toolkit
fig, ax = plt.subplots(figsize=(10, 5))
ax.plot([1,2,3,4,5], [10,25,18,32,28], color=COLORS['blue'], linewidth=2, marker='o')

# Arrow annotation
ax.annotate(
    'Key Peak',
    xy=(4, 32),                            # point to annotate
    xytext=(3.5, 36),                      # where text goes
    fontsize=11,
    fontweight='bold',
    color='red',
    arrowprops=dict(arrowstyle='->', color='red', lw=1.5)
)

# Text box
ax.text(1, 28, 'Q1 Baseline',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='lightyellow', edgecolor='gray'),
        fontsize=9)

# Shaded region
ax.axvspan(3, 5, alpha=0.1, color='green', label='High Period')

ax.set_title('Custom Annotation Example')
ax.legend()
plt.tight_layout()
plt.show()


# ════════════════════════════════════════════════════════════
#  QUICK REFERENCE — ALL CHART TYPES
# ════════════════════════════════════════════════════════════

# LINE:       ax.plot(x, y, color, linewidth, marker, linestyle)
# BAR:        ax.bar(x, height, width, color, edgecolor)
# HORIZ BAR:  ax.barh(y, width, color)
# SCATTER:    ax.scatter(x, y, s, c, alpha, marker)
# HISTOGRAM:  ax.hist(data, bins, color, edgecolor, density)
# PIE:        ax.pie(values, labels, autopct, colors, startangle)
# BOX:        ax.boxplot(data, vert, patch_artist)
# AREA:       ax.fill_between(x, y1, y2, alpha)
# HEATMAP:    ax.imshow(matrix, cmap, aspect)
# ERROR BAR:  ax.errorbar(x, y, yerr, fmt, capsize)

# FORMATTING:
# ax.set_title('Title', fontsize, fontweight, pad)
# ax.set_xlabel('Label', fontsize)
# ax.set_ylabel('Label', fontsize)
# ax.set_xlim(min, max)
# ax.set_ylim(min, max)
# ax.set_xticks([...])
# ax.set_xticklabels([...], rotation=45)
# ax.legend(title, loc, frameon)
# ax.grid(True, axis, linestyle, alpha)
# ax.spines[['top','right']].set_visible(False)
# ax.yaxis.set_major_formatter(mticker.FuncFormatter(fn))
# fig.savefig('file.png', dpi=150, bbox_inches='tight')


# ════════════════════════════════════════════════════════════
#  PRACTICE EXERCISES — Week 16
# ════════════════════════════════════════════════════════════

# EASY:
# 1. Plot total sales per year as a bar chart.
# 2. Plot the monthly profit trend as a line chart.
# 3. Create a histogram of order quantities.
# 4. Plot sales by ship mode as a horizontal bar chart.

# MEDIUM:
# 5. Scatter plot: Sales vs Profit, colored by Region.
# 6. Grouped bar: Sales by Region AND Segment side by side.
# 7. Stacked bar: Revenue by Category and Sub-Category.
# 8. Line chart with shaded area showing ±1 std dev range.

# CHALLENGE:
# 9. Build a 3×2 subplot figure summarising 6 key metrics.
# 10. Recreate chart #9 with a consistent color theme and custom rcParams.
# 11. Export all 8 portfolio charts as high-res PNGs with clean filenames.
