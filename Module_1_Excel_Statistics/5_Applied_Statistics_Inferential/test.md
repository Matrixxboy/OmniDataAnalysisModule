If you want a dataset that can be used to demonstrate **Z-Score, T-Test, and P-Value calculations**, here is a simple example.

## Sample Dataset: Student Exam Scores

| Student | Class A Score | Class B Score |
| ------- | ------------- | ------------- |
| 1       | 78            | 82            |
| 2       | 85            | 88            |
| 3       | 92            | 91            |
| 4       | 74            | 79            |
| 5       | 88            | 90            |
| 6       | 81            | 85            |
| 7       | 95            | 94            |
| 8       | 69            | 75            |
| 9       | 87            | 89            |
| 10      | 90            | 93            |

---

# 1. Z-Score Analysis

### Purpose

Used to determine how far a value is from the mean in terms of standard deviations.

### Formula

genui{"math_block_widget_always_prefetch_v2":{"content":"z=\frac{x-\mu}{\sigma}"}}

Where:

* **x** = Individual value
* **μ** = Mean
* **σ** = Standard deviation

### Example

For Student 7 in Class A:

| Value       | Score |
| ----------- | ----- |
| x           | 95    |
| Mean (μ)    | 83.9  |
| Std Dev (σ) | 8.09  |

Result:

[
z=\frac{95-83.9}{8.09}=1.37
]

**Interpretation:** Student 7 scored **1.37 standard deviations above the class average**.

---

# 2. Independent T-Test

### Purpose

Compare whether the average scores of Class A and Class B are significantly different.

### Hypotheses

* **H₀ (Null):** Mean of Class A = Mean of Class B
* **H₁ (Alternative):** Mean of Class A ≠ Mean of Class B

### Formula

t=\frac{\bar{x}_1-\bar{x}_2}{\sqrt{\frac{s_1^2}{n_1}+\frac{s_2^2}{n_2}}}

Where:

* (\bar{x}_1) = Mean of Class A
* (\bar{x}_2) = Mean of Class B
* (s_1,s_2) = Standard deviations
* (n_1,n_2) = Sample sizes

### Dataset Summary

| Statistic   | Class A | Class B |
| ----------- | ------- | ------- |
| Mean        | 83.9    | 86.6    |
| Sample Size | 10      | 10      |

---

# 3. P-Value

### Purpose

Measures the probability of observing the result if the null hypothesis is true.

### Decision Rule

| P-Value  | Conclusion                                    |
| -------- | --------------------------------------------- |
| p < 0.05 | Reject H₀ (Significant Difference)            |
| p ≥ 0.05 | Fail to Reject H₀ (No Significant Difference) |

### Example Interpretation

Suppose the t-test produces:

| Statistic   | Value |
| ----------- | ----- |
| t-statistic | -1.12 |
| p-value     | 0.276 |

**Conclusion:**

Since **0.276 > 0.05**, there is **no statistically significant difference** between the average scores of Class A and Class B.

---

# Summary Table

| Test    | Purpose                    | Output      | Interpretation                                     |
| ------- | -------------------------- | ----------- | -------------------------------------------------- |
| Z-Score | Measure distance from mean | z-value     | Detect unusual/high/low observations               |
| T-Test  | Compare two means          | t-statistic | Check if groups differ                             |
| P-Value | Measure significance       | probability | Decide whether result is statistically significant |

This dataset is small enough for manual calculations and is commonly used in Data Science, Statistics, and Research Methodology demonstrations.
