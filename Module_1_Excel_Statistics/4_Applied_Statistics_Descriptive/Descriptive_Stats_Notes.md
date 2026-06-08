# Descriptive Statistics — Notes & Excel Formulas

## Central Tendency

### Mean (Average)
```excel
=AVERAGE(A2:A100)
```
- Best for: Symmetric, no-outlier data
- Weakness: Pulled by extreme values

### Median
```excel
=MEDIAN(A2:A100)
```
- Best for: Skewed data, incomes, prices
- Not affected by outliers

### Mode
```excel
=MODE(A2:A100)         ' Single mode (older)
=MODE.MULT(A2:A100)    ' Multiple modes (array formula)
```
- Best for: Categorical or discrete data

---

## Spread / Variability

### Standard Deviation
```excel
=STDEV(A2:A100)     ' Sample std dev (use this for data samples)
=STDEVP(A2:A100)    ' Population std dev (use only for full population)
```
- Interpretation: "On average, values deviate ±X from the mean"

### Variance
```excel
=VAR(A2:A100)       ' Sample variance
=VARP(A2:A100)      ' Population variance
```
- Variance = Std Dev²
- Less intuitive (squared units) but used in many statistical tests

---

## Shape

### Skewness
```excel
=SKEW(A2:A100)
```
| Value | Meaning |
|-------|---------|
| > 0 | Right-skewed (long tail to right; mean > median) |
| = 0 | Symmetric (normal distribution) |
| < 0 | Left-skewed (long tail to left; mean < median) |

**Business example:** Income data is usually right-skewed (a few very high earners pull the mean up).

### Kurtosis
```excel
=KURT(A2:A100)
```
| Value | Meaning |
|-------|---------|
| > 0 | Leptokurtic — heavy tails, sharp peak (more outliers) |
| = 0 | Mesokurtic — normal distribution |
| < 0 | Platykurtic — thin tails, flat peak (fewer outliers) |

---

## Data Analysis ToolPak — Descriptive Statistics
**Data → Data Analysis → Descriptive Statistics**
- Input Range: your data column
- Tick: Summary statistics, Confidence Level, Kth Largest/Smallest
- Output: auto-generates Mean, Std Dev, Variance, Skew, Kurt, Min, Max, Range, Count

---

## Quick Reference — All Formulas Table

| Statistic | Formula |
|-----------|---------|
| Mean | `=AVERAGE(range)` |
| Median | `=MEDIAN(range)` |
| Mode | `=MODE(range)` |
| Std Dev (sample) | `=STDEV(range)` |
| Variance (sample) | `=VAR(range)` |
| Skewness | `=SKEW(range)` |
| Kurtosis | `=KURT(range)` |
| Min | `=MIN(range)` |
| Max | `=MAX(range)` |
| Range | `=MAX(range)-MIN(range)` |
| Count | `=COUNT(range)` |
| 25th Percentile | `=PERCENTILE(range, 0.25)` |
| 75th Percentile | `=PERCENTILE(range, 0.75)` |
| IQR | `=PERCENTILE(range,0.75)-PERCENTILE(range,0.25)` |

---

## 🧪 Practice Exercises
1. Load any Kaggle numeric dataset (e.g. house prices)
2. Compute all 7 statistics manually using formulas
3. Run ToolPak "Descriptive Statistics" — compare output
4. Create a histogram (Data → Data Analysis → Histogram)
5. Write a paragraph: "The data shows that the average is X, but the median is Y, suggesting the distribution is [skewed/symmetric]..."
