# ============================================================
# SEABORN — Practice Solutions
# Topic 17 | Week 17
# ============================================================

import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import pandas as pd
import numpy as np

sns.set_theme(style='whitegrid', palette='tab10', font_scale=1.1)

df = pd.read_csv('superstore.csv', encoding='latin-1')
df['Order Date'] = pd.to_datetime(df['Order Date'])
df['Year']  = df['Order Date'].dt.year
df['Month'] = df['Order Date'].dt.to_period('M')
df['Profit Margin'] = df['Profit'] / df['Sales']


# ── Exercise 1: Heatmap — avg profit per Category × Region
pivot = df.pivot_table(index='Category', columns='Region',
                       values='Profit', aggfunc='mean').round(0)

fig, ax = plt.subplots(figsize=(8, 4))
sns.heatmap(pivot, annot=True, fmt='.0f', cmap='RdYlGn', center=0,
            linewidths=0.5, ax=ax)
ax.set_title('Average Profit per Category × Region', fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig('s_ex01_heatmap_profit.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 2: Boxplot — Quantity by Ship Mode
fig, ax = plt.subplots(figsize=(8, 4))
order = df.groupby('Ship Mode')['Quantity'].median().sort_values(ascending=False).index
sns.boxplot(data=df, x='Ship Mode', y='Quantity', order=order, palette='Set2', ax=ax)
ax.set_title('Quantity Distribution by Ship Mode', fontsize=13, fontweight='bold')
ax.set_ylabel('Quantity per Order')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.savefig('s_ex02_boxplot_qty.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 3: Count plot — orders by Segment
fig, ax = plt.subplots(figsize=(7, 4))
order = df['Segment'].value_counts().index
sns.countplot(data=df, x='Segment', order=order, palette='pastel', ax=ax)
for p in ax.patches:
    ax.annotate(f'{int(p.get_height()):,}',
                (p.get_x() + p.get_width()/2, p.get_height() + 30),
                ha='center', fontsize=10, fontweight='bold')
ax.set_title('Number of Orders by Segment', fontsize=13, fontweight='bold')
ax.set_ylabel('Order Count')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.savefig('s_ex03_countplot_segment.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 4: KDE — Sales distributions by Region (overlapping)
fig, ax = plt.subplots(figsize=(10, 5))
for region, grp in df.groupby('Region'):
    sns.kdeplot(data=grp, x='Sales', label=region, fill=True, alpha=0.25, ax=ax)
ax.set_xlim(0, 3000)
ax.set_title('Sales Distribution (KDE) by Region', fontsize=13, fontweight='bold')
ax.set_xlabel('Sales ($)'); ax.set_ylabel('Density')
ax.legend(title='Region')
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.savefig('s_ex04_kde_regions.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 5: Violin — Profit by Category, split by High/Low Discount
df['Discount Level'] = pd.cut(df['Discount'],
                               bins=[-0.01, 0.2, 1.0],
                               labels=['Low (≤20%)', 'High (>20%)'])

fig, ax = plt.subplots(figsize=(10, 5))
sns.violinplot(data=df, x='Category', y='Profit',
               hue='Discount Level', split=True,
               palette={'Low (≤20%)': '#2563EB', 'High (>20%)': '#DC2626'},
               inner='quartile', ax=ax)
ax.axhline(0, color='black', linestyle='--', linewidth=0.8, alpha=0.5)
ax.set_title('Profit Distribution by Category — Low vs High Discount',
             fontsize=13, fontweight='bold')
ax.set_ylabel('Profit ($)')
ax.spines[['top','right']].set_visible(False)
plt.legend(title='Discount Level')
plt.tight_layout()
plt.savefig('s_ex05_violin_discount.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 6: Pairplot — Sales, Profit, Discount with hue=Region
sample = df[['Sales','Profit','Discount','Quantity','Region']].sample(800, random_state=42)
g = sns.pairplot(sample, hue='Region', diag_kind='kde',
                 plot_kws={'alpha': 0.4, 's': 20},
                 diag_kws={'fill': True, 'alpha': 0.4})
g.figure.suptitle('Pairplot: Sales, Profit, Discount, Qty by Region',
                   fontsize=14, fontweight='bold', y=1.01)
plt.savefig('s_ex06_pairplot_region.png', dpi=100, bbox_inches='tight')
plt.show()


# ── Exercise 7: FacetGrid — Sales vs Profit scatter per Segment
g = sns.FacetGrid(df.sample(2000, random_state=1),
                  col='Segment', col_wrap=3, height=4, aspect=1.2, sharey=False)
g.map_dataframe(sns.scatterplot, x='Sales', y='Profit', alpha=0.3, s=20, color='#2563EB')
g.map(plt.axhline, y=0, color='red', linestyle='--', linewidth=1, alpha=0.6)
g.set_titles(col_template='{col_name}')
g.set_axis_labels('Sales ($)', 'Profit ($)')
g.figure.suptitle('Sales vs Profit by Segment', fontsize=14, fontweight='bold', y=1.02)
plt.tight_layout()
plt.savefig('s_ex07_facet_scatter_segment.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 8: regplot — Sales vs Quantity
fig, ax = plt.subplots(figsize=(8, 5))
sns.regplot(data=df, x='Quantity', y='Sales',
            scatter_kws={'alpha': 0.2, 's': 20, 'color': '#6B7280'},
            line_kws={'color': '#2563EB', 'linewidth': 2},
            ci=95, ax=ax)
ax.set_title('Sales vs Quantity — Is There a Relationship?',
             fontsize=13, fontweight='bold')
ax.set_xlabel('Quantity Ordered')
ax.set_ylabel('Sales ($)')

corr_val = df['Sales'].corr(df['Quantity'])
ax.text(0.05, 0.92, f'Pearson r = {corr_val:.2f}',
        transform=ax.transAxes, fontsize=10,
        bbox=dict(boxstyle='round', facecolor='lightyellow', edgecolor='gray'))
ax.spines[['top','right']].set_visible(False)
plt.tight_layout()
plt.savefig('s_ex08_regplot_qty_sales.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 9: Full EDA Summary Notebook — combined 4-chart page
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('Superstore — EDA Summary', fontsize=16, fontweight='bold')

# Heatmap
corr = df[['Sales','Profit','Discount','Quantity']].corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='RdYlGn', center=0,
            ax=axes[0,0], square=True, linewidths=0.5)
axes[0,0].set_title('Correlation Matrix')

# Boxplot
sns.boxplot(data=df, x='Category', y='Sales', palette='Set2', ax=axes[0,1])
axes[0,1].set_title('Sales by Category')
axes[0,1].set_ylabel('Sales ($)')
axes[0,1].spines[['top','right']].set_visible(False)

# KDE — Profit by Segment
for seg, grp in df.groupby('Segment'):
    sns.kdeplot(data=grp, x='Profit', label=seg, fill=True, alpha=0.25, ax=axes[1,0])
axes[1,0].axvline(0, color='red', linestyle='--', linewidth=1)
axes[1,0].set_xlim(-500, 2000)
axes[1,0].set_title('Profit KDE by Segment')
axes[1,0].legend(title='Segment', fontsize=8)
axes[1,0].spines[['top','right']].set_visible(False)

# Regplot
sns.regplot(data=df.sample(1500, random_state=42),
            x='Discount', y='Profit',
            scatter_kws={'alpha': 0.2, 's': 15, 'color': '#6B7280'},
            line_kws={'color': '#DC2626', 'linewidth': 2},
            ax=axes[1,1])
axes[1,1].axhline(0, color='black', linestyle='--', linewidth=0.7, alpha=0.5)
axes[1,1].set_title('Discount vs Profit (Regression)')
axes[1,1].spines[['top','right']].set_visible(False)

plt.tight_layout()
plt.savefig('s_ex09_eda_summary.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 10: Side-by-side boxplot vs violin with interpretation
fig, axes = plt.subplots(1, 2, figsize=(13, 5))

sns.boxplot(   data=df, x='Region', y='Sales', palette='Set2', ax=axes[0])
axes[0].set_title('Boxplot: Sales by Region', fontweight='bold')
axes[0].set_ylabel('Sales ($)')

sns.violinplot(data=df, x='Region', y='Sales', palette='Set2',
               inner='quartile', ax=axes[1])
axes[1].set_title('Violin Plot: Sales by Region', fontweight='bold')
axes[1].set_ylabel('Sales ($)')

for ax in axes:
    ax.spines[['top','right']].set_visible(False)
    ax.yaxis.set_major_formatter(mticker.FuncFormatter(lambda x,_: f'${x:,.0f}'))

fig.text(0.5, -0.05,
    "Interpretation: Both charts show similar medians across regions.\n"
    "The violin reveals a right-skewed distribution with a long tail of high-value orders.\n"
    "West region has a wider spread, suggesting more variability in order size.",
    ha='center', fontsize=10, style='italic', wrap=True)

plt.suptitle('Boxplot vs Violin — Same Data, More Information', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('s_ex10_box_vs_violin.png', dpi=150, bbox_inches='tight')
plt.show()


# ── Exercise 11: lmplot — Sales vs Profit with col=Region and hue=Segment
lm = sns.lmplot(
    data=df.sample(2000, random_state=7),
    x='Discount', y='Profit',
    col='Region', hue='Segment',
    col_wrap=2, height=4, aspect=1.3,
    scatter_kws={'alpha': 0.3, 's': 20},
    line_kws={'linewidth': 2},
    ci=95
)
lm.set_titles(col_template='Region: {col_name}')
lm.set_axis_labels('Discount Rate', 'Profit ($)')
lm.figure.suptitle('Discount vs Profit — by Region & Segment',
                    fontsize=14, fontweight='bold', y=1.02)
plt.savefig('s_ex11_lmplot_region_segment.png', dpi=120, bbox_inches='tight')
plt.show()

print("\n✅ All Seaborn exercise solutions complete. Charts saved to current directory.")
