# Inferential Statistics — Notes & Excel Formulas

## Core Concepts

### Hypothesis Testing Framework
1. **State hypotheses:**
   - H₀ (Null): No effect / no difference (default assumption)
   - H₁ (Alternative): There IS an effect / difference
2. **Choose significance level:** α = 0.05 (most common)
3. **Calculate test statistic** (Z, t, F)
4. **Find p-value**
5. **Decision:** If p < α → Reject H₀

### Type I & Type II Errors
| | H₀ True | H₀ False |
|--|---------|---------|
| **Reject H₀** | Type I Error (False Positive) | ✅ Correct |
| **Fail to Reject** | ✅ Correct | Type II Error (False Negative) |

---

## Z-scores

### Formula
```excel
=STANDARDIZE(x, mean, std_dev)
' or manually:
=(A2 - AVERAGE(A:A)) / STDEV(A:A)
```

### Find p-value from Z-score (two-tailed)
```excel
=2 * (1 - NORM.S.DIST(ABS(z_score), TRUE))
```

### Example
- Sales target = ₹50,000; Actual mean = ₹53,000; Std Dev = ₹8,000; n = 40
- Z = (53000 - 50000) / (8000/√40) = 2.37
- p-value = 0.018 → Reject H₀ → Significant difference

---

## T-tests

### When to use T-test vs Z-test
| | T-test | Z-test |
|--|--------|--------|
| Sample size | Small (n < 30) | Large (n ≥ 30) |
| Population std dev | Unknown | Known |

### Excel T.TEST Function
```excel
=T.TEST(array1, array2, tails, type)
```
- tails: 1 (one-tailed) or 2 (two-tailed)
- type: 1=paired, 2=two-sample equal variance, 3=two-sample unequal variance

### One-Sample T-test (compare to a known value)
```excel
' Manual approach:
t = (sample_mean - hypothesised_mean) / (std_dev / SQRT(n))
p = T.DIST.2T(ABS(t), n-1)
```

### Two-Sample T-test (ToolPak)
**Data → Data Analysis → t-Test: Two-Sample Assuming Unequal Variances**
- Input: Group 1 range, Group 2 range
- Hypothesised Mean Difference: 0
- Alpha: 0.05

---

## ANOVA (Analysis of Variance)

### Use case
Compare means of **3 or more groups** (e.g. sales across 4 regions)

### Via ToolPak (One-Way ANOVA)
**Data → Data Analysis → ANOVA: Single Factor**
- Input Range: all groups in adjacent columns
- Alpha: 0.05

### Interpreting ANOVA Output
| Value | Meaning |
|-------|---------|
| F statistic | Ratio of between-group variance to within-group variance |
| P-value | If < 0.05, at least one group mean is different |
| F critical | Compare to F — if F > F-crit, reject H₀ |

**Note:** ANOVA only tells you THAT groups differ, not WHICH ones. Use post-hoc tests (Tukey) for that.

---

## Business Hypothesis Examples

### Example 1 — T-test
- H₀: Average order value in Mumbai = Average order value in Delhi
- H₁: They are different
- Run two-sample T-test → if p < 0.05, pricing strategy should differ by city

### Example 2 — ANOVA
- H₀: Customer satisfaction is equal across all 4 product categories
- H₁: At least one category has different satisfaction
- Run One-Way ANOVA → identify which category needs improvement

---

## 🧪 Practice Exercises
1. Compute Z-scores for a dataset; flag values > 2 or < -2 as outliers
2. One-sample T-test: Is avg delivery time significantly different from 3 days?
3. Two-sample T-test: Do male and female customers spend the same?
4. ANOVA: Do 4 sales teams have the same avg monthly revenue?
5. For each test: state H₀, H₁, result, and business recommendation
