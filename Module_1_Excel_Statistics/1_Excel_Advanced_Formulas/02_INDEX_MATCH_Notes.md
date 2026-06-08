# INDEX-MATCH — Notes & Examples

## Why INDEX-MATCH?
- Works in ALL Excel versions (unlike XLOOKUP)
- Can look LEFT (VLOOKUP cannot)
- More flexible — works with dynamic arrays
- Faster on very large datasets

---

## Syntax

### INDEX
```
=INDEX(return_range, row_num, [col_num])
```
Returns the value at a given row/column position.

### MATCH
```
=MATCH(lookup_value, lookup_array, [match_type])
```
Returns the **position** of a value in a range.
- match_type: 0 = exact, 1 = less than, -1 = greater than

### Combined
```
=INDEX(return_range, MATCH(lookup_value, lookup_array, 0))
```

---

## Examples

### Example 1 — Basic Lookup (same as VLOOKUP)
```
=INDEX(B:B, MATCH(E2, A:A, 0))
```

### Example 2 — Lookup to the LEFT
```
=INDEX(A:A, MATCH(D2, C:C, 0))
```

### Example 3 — Two-Way (Row + Column) Lookup
```
=INDEX(B2:E10, MATCH(H1, A2:A10, 0), MATCH(H2, B1:E1, 0))
```
*Find value where a row and column header both match.*

### Example 4 — Return entire row
```
=INDEX(A:E, MATCH("Sales", A:A, 0), 0)
```

### Example 5 — Multiple criteria (using MATCH + array)
```
=INDEX(C:C, MATCH(1, (A:A=E1)*(B:B=F1), 0))
```
*Press Ctrl+Shift+Enter for older Excel (array formula)*

---

## 🧪 Practice Exercises
1. Build an employee table. Use INDEX-MATCH to find salary by name.
2. Look LEFT — find the department code given a department name.
3. Two-way lookup — find quarterly sales for a specific product in a specific region.
4. Multi-criteria match — find price where both Product AND Size match.
5. Compare result with XLOOKUP — same output, different formula.

---

## ⚠️ Common Mistakes
- Using MATCH with match_type=1 when data isn't sorted
- Wrong range size (INDEX range ≠ MATCH range length)
- Forgetting Ctrl+Shift+Enter for array formulas in older Excel
- Not using absolute references `$` when copying down
