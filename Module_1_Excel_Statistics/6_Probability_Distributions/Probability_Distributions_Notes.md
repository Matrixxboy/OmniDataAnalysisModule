# Probability Distributions — Notes & Excel Formulas

---

## 1. Normal Distribution (Gaussian / Bell Curve)

### Characteristics
- Symmetric around the mean
- Defined by: μ (mean) and σ (standard deviation)
- 68-95-99.7 rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ

### Excel Functions
```excel
' Probability density (y-value for bell curve)
=NORM.DIST(x, mean, std_dev, FALSE)

' Cumulative probability P(X ≤ x)
=NORM.DIST(x, mean, std_dev, TRUE)

' Probability between two values P(a ≤ X ≤ b)
=NORM.DIST(b, mean, std, TRUE) - NORM.DIST(a, mean, std, TRUE)

' Find x given cumulative probability (inverse)
=NORM.INV(probability, mean, std_dev)

' Standard Normal (Z-distribution, mean=0, std=1)
=NORM.S.DIST(z, TRUE)
```

### Real-World Example
- Exam scores: Mean = 70, Std Dev = 10
- P(score > 85) = 1 - NORM.DIST(85, 70, 10, TRUE) = 6.68%
- P(60 < score < 80) = NORM.DIST(80,70,10,TRUE) - NORM.DIST(60,70,10,TRUE) = 68.27%

### How to Plot Bell Curve in Excel
1. Create x values: from (mean - 4σ) to (mean + 4σ) in small steps (0.1)
2. Calculate y = NORM.DIST(x, mean, std, FALSE) for each x
3. Insert → Line Chart (or Scatter with smooth lines)

---

## 2. Binomial Distribution

### When to use
- Fixed number of trials (n)
- Each trial is success/failure (binary)
- Probability of success (p) is constant
- Trials are independent

### Parameters: n (trials), p (probability of success)

### Excel Functions
```excel
' P(X = k) — exactly k successes
=BINOM.DIST(k, n, p, FALSE)

' P(X ≤ k) — at most k successes (cumulative)
=BINOM.DIST(k, n, p, TRUE)

' Inverse — find k given cumulative probability
=BINOM.INV(n, p, probability)
```

### Real-World Example
- Quality control: n=20 items, p=0.05 defect rate
- P(exactly 2 defects) = BINOM.DIST(2, 20, 0.05, FALSE) = 18.87%
- P(≤ 3 defects) = BINOM.DIST(3, 20, 0.05, TRUE) = 98.4%

### How to Plot in Excel
1. k values: 0 to n in column A
2. Probability: =BINOM.DIST(A2, n, p, FALSE) in column B
3. Insert → Column Chart

---

## 3. Poisson Distribution

### When to use
- Count of events in a fixed interval (time, space, volume)
- Events occur independently
- Average rate (λ) is known and constant

### Parameter: λ (lambda) = average number of events per interval

### Excel Functions
```excel
' P(X = k) — exactly k events
=POISSON.DIST(k, lambda, FALSE)

' P(X ≤ k) — at most k events
=POISSON.DIST(k, lambda, TRUE)
```

### Real-World Example
- Customer support: λ = 5 calls per hour
- P(exactly 3 calls in one hour) = POISSON.DIST(3, 5, FALSE) = 14.04%
- P(more than 8 calls) = 1 - POISSON.DIST(8, 5, TRUE) = 6.81%

### How to Plot in Excel
1. k values: 0 to 15 (or 3× lambda) in column A
2. Probability: =POISSON.DIST(A2, lambda, FALSE) in column B
3. Insert → Column Chart

---

## Choosing the Right Distribution

| Scenario | Distribution |
|----------|-------------|
| Continuous measurement (height, weight, price) | Normal |
| Count of successes in fixed trials (defects, clicks) | Binomial |
| Count of events in fixed time/space (arrivals, emails) | Poisson |
| When p is very small and n is large | Poisson approximates Binomial |
| When n is large and p ≈ 0.5 | Normal approximates Binomial |

---

## 🧪 Practice Exercises
1. Plot a Normal distribution for exam scores (μ=65, σ=12)
   - What % of students scored above 80?
   - What is the cut-off for the top 10%?
2. Binomial: A factory has 2% defect rate; 50 items inspected
   - P(0 defects)? P(more than 3 defects)?
3. Poisson: Average 8 website orders per hour
   - P(exactly 10 orders next hour)? P(fewer than 5)?
4. Create a side-by-side comparison chart of all 3 distributions
