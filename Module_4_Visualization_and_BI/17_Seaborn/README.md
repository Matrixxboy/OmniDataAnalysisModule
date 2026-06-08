# 📘 Topic 17 — Seaborn
**Week:** 17 | **Daily Hours:** 2 hrs | **Tools:** Seaborn, Matplotlib, Pandas

---

## 🎯 Learning Objectives
Use Seaborn to create statistical visualizations with less code and more insight — including distribution comparisons, correlation matrices, and multi-panel categorical plots.

---

## 📋 Sub-Topics

| # | Sub-Topic | Function | Use Case |
|---|-----------|---------|---------|
| 1 | **Heatmap** | `sns.heatmap()` | Correlation matrix, confusion matrix |
| 2 | **Boxplot** | `sns.boxplot()` | Distribution spread + outliers per category |
| 3 | **Violin Plot** | `sns.violinplot()` | Full distribution shape per category |
| 4 | **Pairplot** | `sns.pairplot()` | All variable relationships in one grid |
| 5 | **FacetGrid** | `sns.FacetGrid()` | Same chart repeated per subgroup |
| 6 | **Statistical context** | `sns.regplot()`, `sns.lmplot()` | Add regression lines and confidence intervals |

---

## 🆚 Seaborn vs Matplotlib

| Feature | Matplotlib | Seaborn |
|---------|-----------|---------|
| Code verbosity | More lines | Far fewer lines |
| Statistical plots | Manual | Built-in (boxplot, violin, regplot) |
| Theming | Manual rcParams | `sns.set_theme()` one-liner |
| Pandas integration | Good | Excellent (native `data=df, x=, y=`) |
| Custom control | Maximum | Less (use Matplotlib underneath) |

**Best practice:** Use Seaborn for the plot type, then use `ax.set_title()` etc. for polish.

---

## 📝 Daily Practice Plan (Week 17)

| Day | Focus | Task |
|-----|-------|------|
| Mon | Heatmap | Correlation matrix on numeric Superstore columns |
| Tue | Boxplot | Sales distribution by Region and Segment |
| Wed | Violin | Profit distribution by Category — compare to boxplot |
| Thu | Pairplot | Pairwise scatter + histograms on numeric columns |
| Fri | FacetGrid + regplot | Sales vs Profit per Region; regression lines |
| Sat | Portfolio Build | Assemble all plots in final notebook |
| Sun | Review | Write business interpretation for each chart |

---

## 🏆 Deliverable
**Statistical Plots Portfolio** — Jupyter Notebook containing:
1. Correlation Heatmap (numeric columns)
2. Boxplot — Sales by Region
3. Boxplot — Profit by Category
4. Violin Plot — Sales by Segment
5. Pairplot — Sales, Profit, Discount, Quantity
6. FacetGrid — Monthly Revenue per Region
7. regplot — Discount vs Profit with CI band
8. Annotated Combined Summary (2×4 subplot grid)

**File:** `17_Seaborn_Portfolio.ipynb`

---

## 📚 References
- [Seaborn Official Docs](https://seaborn.pydata.org)
- [Seaborn Gallery](https://seaborn.pydata.org/examples/index.html)
- [Towards Data Science — Seaborn Guide](https://towardsdatascience.com/seaborn-lets-make-beautiful-graphs-83c06d7e0dd0)
