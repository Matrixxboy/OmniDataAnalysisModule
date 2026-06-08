# ============================================================
# MATPLOTLIB — Practice Solutions
# Topic 16 | Week 16
# ============================================================

import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import numpy as np

plt.rcParams.update({
    'figure.dpi': 120, 'axes.spines.top': False,
    'axes.spines.right': False, 'axes.grid': True,
    'grid.alpha': 0.3, 'grid.linestyle': '--',
})

df = pd.read_csv('superstore.csv', encoding='latin-1')
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Year']  = df['Order Date'].dt.year
df['Month'] = df['Order Date'].dt.to_period('M')


# ── Exercise 1: Total sales per year as a bar chart
yearly = df.groupby('Year')['Sales'].sum()

fig, ax = plt.subplots(figsize=(7, 4))
bars = ax.bar(yearly.index.astype(str), yearly.values, color='#2563EB', edgecolor='white')
for b in bars:
    ax.text(b.get_x() + b.get_width()/2, b.get_height() + 5000,
            f'${b.get_height()/1000:.0f}K', ha='center', fontsize=9, fontweight='bold')
ax.set_title('Total Sales by Year', fontsize=14, fontweight='bold')
ax.set_xlabel('Year'); ax.set_ylabel('Sales ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))
plt.tight_layout(); plt.savefig('ex01_sales_by_year.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 2: Monthly profit trend as a line chart
monthly_profit = df.groupby('Month')['Profit'].sum()
months_str = [str(m) for m in monthly_profit.index]

fig, ax = plt.subplots(figsize=(13, 4))
ax.plot(months_str, monthly_profit.values, color='#16A34A', linewidth=2, marker='o', markersize=4)
ax.axhline(0, color='red', linestyle='--', linewidth=1, alpha=0.6)
ax.fill_between(months_str, monthly_profit.values, 0,
                where=[v >= 0 for v in monthly_profit.values], alpha=0.15, color='#16A34A', label='Profit')
ax.fill_between(months_str, monthly_profit.values, 0,
                where=[v < 0 for v in monthly_profit.values], alpha=0.15, color='#DC2626', label='Loss')
ax.set_title('Monthly Profit Trend', fontsize=14, fontweight='bold')
ax.set_xlabel('Month'); ax.set_ylabel('Profit ($)')
ax.tick_params(axis='x', rotation=45); ax.legend()
plt.tight_layout(); plt.savefig('ex02_monthly_profit.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 3: Histogram of order quantities
fig, ax = plt.subplots(figsize=(8, 4))
ax.hist(df['Quantity'], bins=range(1, 16), color='#7C3AED', edgecolor='white', alpha=0.85, rwidth=0.85)
ax.set_title('Distribution of Order Quantities', fontsize=14, fontweight='bold')
ax.set_xlabel('Quantity'); ax.set_ylabel('Number of Orders')
ax.set_xticks(range(1, 15))
plt.tight_layout(); plt.savefig('ex03_quantity_histogram.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 4: Sales by Ship Mode — horizontal bar
ship_sales = df.groupby('Ship Mode')['Sales'].sum().sort_values()

fig, ax = plt.subplots(figsize=(8, 4))
bars = ax.barh(ship_sales.index, ship_sales.values, color='#F59E0B', edgecolor='white')
for b in bars:
    ax.text(b.get_width() + 3000, b.get_y() + b.get_height()/2,
            f'${b.get_width()/1000:.0f}K', va='center', fontsize=10, fontweight='bold')
ax.set_title('Total Sales by Ship Mode', fontsize=14, fontweight='bold')
ax.set_xlabel('Sales ($)')
ax.xaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))
plt.tight_layout(); plt.savefig('ex04_shipmode_bar.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 5: Scatter — Sales vs Profit colored by Region
region_colors = {'West': '#2563EB', 'East': '#16A34A', 'Central': '#F59E0B', 'South': '#DC2626'}

fig, ax = plt.subplots(figsize=(9, 6))
for region, grp in df.groupby('Region'):
    ax.scatter(grp['Sales'], grp['Profit'], label=region,
               color=region_colors[region], alpha=0.4, s=25, edgecolors='none')
ax.axhline(0, color='black', linewidth=0.8, linestyle='--', alpha=0.4)
ax.set_title('Sales vs Profit by Region', fontsize=14, fontweight='bold')
ax.set_xlabel('Sales ($)'); ax.set_ylabel('Profit ($)')
ax.legend(title='Region')
plt.tight_layout(); plt.savefig('ex05_scatter_region.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 6: Grouped bar — Sales by Region AND Segment
grp = df.groupby(['Region', 'Segment'])['Sales'].sum().unstack()
regions = grp.index; x = np.arange(len(regions)); width = 0.25
colors = ['#2563EB', '#16A34A', '#DC2626']

fig, ax = plt.subplots(figsize=(11, 5))
for i, (seg, col) in enumerate(zip(grp.columns, colors)):
    offset = (i - 1) * width
    bars = ax.bar(x + offset, grp[seg], width, label=seg, color=col, edgecolor='white')
ax.set_xticks(x); ax.set_xticklabels(regions)
ax.set_title('Sales by Region & Segment', fontsize=14, fontweight='bold')
ax.set_ylabel('Sales ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))
ax.legend(title='Segment')
plt.tight_layout(); plt.savefig('ex06_grouped_bar.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 7: Stacked bar — Revenue by Category and Sub-Category (Top 10 sub-cats)
top_subcat = df.groupby('Sub-Category')['Sales'].sum().nlargest(10).index
sub_df = df[df['Sub-Category'].isin(top_subcat)]
stacked = sub_df.pivot_table(index='Sub-Category', columns='Category', values='Sales', aggfunc='sum').fillna(0)

fig, ax = plt.subplots(figsize=(11, 5))
bottom = np.zeros(len(stacked))
for cat, col in zip(stacked.columns, ['#F59E0B', '#2563EB', '#DC2626']):
    ax.bar(stacked.index, stacked[cat], bottom=bottom, label=cat, color=col, edgecolor='white')
    bottom += stacked[cat].values
ax.set_title('Revenue by Sub-Category (Stacked by Category)', fontsize=14, fontweight='bold')
ax.set_ylabel('Sales ($)')
ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))
ax.tick_params(axis='x', rotation=35); ax.legend(title='Category')
plt.tight_layout(); plt.savefig('ex07_stacked_bar.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 8: Line with ±1 std dev shaded area
monthly_sales = df.groupby('Month')['Sales'].agg(['mean','std']).reset_index()
monthly_sales['Month_str'] = monthly_sales['Month'].astype(str)
x_idx = range(len(monthly_sales))

fig, ax = plt.subplots(figsize=(13, 5))
ax.plot(monthly_sales['Month_str'], monthly_sales['mean'], color='#2563EB', linewidth=2, label='Mean Sales')
ax.fill_between(monthly_sales['Month_str'],
                monthly_sales['mean'] - monthly_sales['std'],
                monthly_sales['mean'] + monthly_sales['std'],
                alpha=0.2, color='#2563EB', label='±1 Std Dev')
ax.set_title('Monthly Average Sales ± 1 Standard Deviation', fontsize=14, fontweight='bold')
ax.set_xlabel('Month'); ax.set_ylabel('Sales ($)')
ax.tick_params(axis='x', rotation=45); ax.legend()
plt.tight_layout(); plt.savefig('ex08_stddev_band.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 9: 3×2 Subplot — 6 Key Metrics Dashboard
fig, axes = plt.subplots(3, 2, figsize=(14, 14))
fig.suptitle('Superstore — 6 Key Metrics Overview', fontsize=18, fontweight='bold')

# 1. Revenue by Category
cat = df.groupby('Category')['Sales'].sum()
axes[0,0].bar(cat.index, cat.values, color=['#2563EB','#16A34A','#DC2626'], edgecolor='white')
axes[0,0].set_title('Revenue by Category'); axes[0,0].set_ylabel('Sales ($)')
axes[0,0].yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))

# 2. Profit Margin by Segment
df['Margin'] = df['Profit'] / df['Sales']
seg = df.groupby('Segment')['Margin'].mean() * 100
axes[0,1].bar(seg.index, seg.values, color='#7C3AED', edgecolor='white')
axes[0,1].set_title('Avg Profit Margin by Segment'); axes[0,1].set_ylabel('Margin (%)')

# 3. Monthly Revenue Trend
monthly = df.groupby('Month')['Sales'].sum()
axes[1,0].plot(range(len(monthly)), monthly.values, color='#2563EB', linewidth=2)
axes[1,0].set_title('Monthly Revenue Trend'); axes[1,0].set_ylabel('Sales ($)')

# 4. Orders by Ship Mode
ship = df.groupby('Ship Mode')['Order ID'].nunique().sort_values()
axes[1,1].barh(ship.index, ship.values, color='#F59E0B', edgecolor='white')
axes[1,1].set_title('Orders by Ship Mode'); axes[1,1].set_xlabel('Number of Orders')

# 5. Sales Distribution
axes[2,0].hist(df['Sales'], bins=40, color='#2563EB', edgecolor='white', alpha=0.8)
axes[2,0].axvline(df['Sales'].median(), color='red', linestyle='--', label=f"Median: ${df['Sales'].median():.0f}")
axes[2,0].set_title('Sales Distribution'); axes[2,0].set_xlabel('Sales ($)'); axes[2,0].legend()

# 6. Discount vs Profit
axes[2,1].scatter(df['Discount'], df['Profit'], alpha=0.25, s=15, color='#16A34A', edgecolors='none')
axes[2,1].axhline(0, color='red', linestyle='--', linewidth=1, alpha=0.6)
axes[2,1].set_title('Discount vs Profit'); axes[2,1].set_xlabel('Discount'); axes[2,1].set_ylabel('Profit ($)')

for row in axes:
    for ax in row:
        ax.spines[['top','right']].set_visible(False)

plt.tight_layout()
plt.savefig('ex09_6metric_dashboard.png', dpi=150, bbox_inches='tight'); plt.show()


# ── Exercise 10: Same dashboard with consistent theme
THEME = {
    'bg':      '#F8FAFC',
    'primary': '#1E3A5F',
    'accent':  '#2563EB',
    'green':   '#16A34A',
    'red':     '#DC2626',
    'yellow':  '#F59E0B',
    'purple':  '#7C3AED',
}

plt.rcParams.update({
    'figure.facecolor':  THEME['bg'],
    'axes.facecolor':    THEME['bg'],
    'font.family':       'DejaVu Sans',
    'axes.titlesize':    13,
    'axes.titleweight':  'bold',
    'axes.titlecolor':   THEME['primary'],
    'axes.labelcolor':   THEME['primary'],
    'xtick.color':       THEME['primary'],
    'ytick.color':       THEME['primary'],
    'axes.spines.top':   False,
    'axes.spines.right': False,
    'grid.alpha':        0.25,
    'grid.linestyle':    '--',
})

fig, axes = plt.subplots(3, 2, figsize=(14, 14), facecolor=THEME['bg'])
fig.suptitle('Superstore — Executive Summary', fontsize=18, fontweight='bold', color=THEME['primary'])

# (same 6 charts re-drawn with theme colors)
axes[0,0].bar(cat.index, cat.values, color=THEME['accent'],  edgecolor='white')
axes[0,0].set_title('Revenue by Category'); axes[0,0].set_ylabel('Sales ($)')
axes[0,0].yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x/1000:.0f}K'))

axes[0,1].bar(seg.index, seg.values, color=THEME['purple'], edgecolor='white')
axes[0,1].set_title('Avg Profit Margin by Segment'); axes[0,1].set_ylabel('Margin (%)')

axes[1,0].plot(range(len(monthly)), monthly.values, color=THEME['accent'], linewidth=2)
axes[1,0].set_title('Monthly Revenue Trend'); axes[1,0].set_ylabel('Sales ($)')

axes[1,1].barh(ship.index, ship.values, color=THEME['yellow'], edgecolor='white')
axes[1,1].set_title('Orders by Ship Mode'); axes[1,1].set_xlabel('Number of Orders')

axes[2,0].hist(df['Sales'], bins=40, color=THEME['accent'], edgecolor='white', alpha=0.8)
axes[2,0].set_title('Sales Distribution'); axes[2,0].set_xlabel('Sales ($)')

axes[2,1].scatter(df['Discount'], df['Profit'], alpha=0.25, s=15,
                  color=THEME['green'], edgecolors='none')
axes[2,1].axhline(0, color=THEME['red'], linestyle='--', linewidth=1, alpha=0.7)
axes[2,1].set_title('Discount vs Profit')
axes[2,1].set_xlabel('Discount'); axes[2,1].set_ylabel('Profit ($)')

for row in axes:
    for ax in row:
        ax.set_facecolor(THEME['bg'])

plt.tight_layout()
plt.savefig('ex10_themed_dashboard.png', dpi=150, bbox_inches='tight'); plt.show()
plt.rcParams.update(plt.rcParamsDefault)   # reset after themed chart


# ── Exercise 11: Export all 8 portfolio charts as PNGs
# Already done inline above with plt.savefig() calls.
# To batch-export programmatically:
output_files = [
    'ex01_sales_by_year.png',
    'ex02_monthly_profit.png',
    'ex03_quantity_histogram.png',
    'ex04_shipmode_bar.png',
    'ex05_scatter_region.png',
    'ex06_grouped_bar.png',
    'ex07_stacked_bar.png',
    'ex08_stddev_band.png',
]
print("✅ All 8 portfolio charts exported:")
for f in output_files:
    print(f"   • {f}")
