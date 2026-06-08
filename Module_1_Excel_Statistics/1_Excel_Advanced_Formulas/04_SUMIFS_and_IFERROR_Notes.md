# SUMIFS — Notes & Examples

## Syntax
```
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```
Sums values where ALL criteria match.

---

## Examples

### Example 1 — Single Condition
```
=SUMIFS(C:C, A:A, "North")
```
*Total sales where Region = "North"*

### Example 2 — Two Conditions
```
=SUMIFS(D:D, A:A, "North", B:B, "Q1")
```
*Total sales where Region="North" AND Quarter="Q1"*

### Example 3 — Dynamic criteria (from cell reference)
```
=SUMIFS(D:D, A:A, G1, B:B, H1)
```

### Example 4 — With comparison operators
```
=SUMIFS(C:C, B:B, ">"&DATE(2024,1,1), B:B, "<"&DATE(2024,4,1))
```
*Sum of sales in Q1 2024*

### Example 5 — Wildcard criteria
```
=SUMIFS(D:D, A:A, "Pro*")
```
*Sum where product name starts with "Pro"*

---

## Related Functions
| Function | Purpose |
|----------|---------|
| COUNTIFS | Count rows matching criteria |
| AVERAGEIFS | Average of matching rows |
| MAXIFS | Maximum of matching rows |
| MINIFS | Minimum of matching rows |

---

## 🧪 Practice Exercises
1. Total revenue by region from a sales table
2. Count orders above ₹5000 in a specific month
3. Average rating for a specific product category
4. Sum sales where salesperson name starts with "A"

---

# IFERROR — Notes & Examples

## Syntax
```
=IFERROR(value, value_if_error)
```
Returns `value_if_error` if the formula produces any error.

## Errors caught: #N/A, #VALUE!, #REF!, #DIV/0!, #NUM!, #NAME?, #NULL!

---

## Examples

### Example 1 — Wrap a VLOOKUP
```
=IFERROR(VLOOKUP(A2, B:C, 2, 0), "Not Found")
```

### Example 2 — Prevent division by zero
```
=IFERROR(B2/C2, 0)
```

### Example 3 — Show blank instead of error
```
=IFERROR(INDEX(A:A, MATCH(D2, B:B, 0)), "")
```

### Example 4 — IFERROR vs IFNA
- `IFERROR` catches ALL errors
- `IFNA` catches ONLY #N/A (recommended for lookups to avoid hiding real errors)
```
=IFNA(XLOOKUP(A2, B:B, C:C), "Not Found")
```

---

## 🧪 Practice Exercises
1. VLOOKUP a product list — show "Not in Catalogue" for missing items
2. Divide two columns — show 0 when denominator is 0
3. Prefer IFNA over IFERROR for a lookup — test why it matters
