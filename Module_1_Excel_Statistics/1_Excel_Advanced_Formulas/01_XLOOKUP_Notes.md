# XLOOKUP — Notes & Examples

## Syntax
```
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

## Key Arguments
| Argument | Required | Description |
|----------|----------|-------------|
| lookup_value | ✅ | The value to search for |
| lookup_array | ✅ | The column/row to search in |
| return_array | ✅ | The column/row to return from |
| if_not_found | ❌ | Value to show if not found (use instead of IFERROR) |
| match_mode | ❌ | 0=exact, -1=exact/next smaller, 1=exact/next larger, 2=wildcard |
| search_mode | ❌ | 1=first to last, -1=last to first, 2=binary ascending |

---

## Examples

### Example 1 — Basic Lookup (Find employee salary by ID)
```
=XLOOKUP(A2, EmployeeID_Col, Salary_Col, "Not Found")
```

### Example 2 — Lookup to the LEFT (not possible in VLOOKUP!)
```
=XLOOKUP(D2, C:C, A:A)
```

### Example 3 — Return Multiple Columns at once
```
=XLOOKUP(A2, A:A, B:D)
```

### Example 4 — Last match (useful for latest transaction)
```
=XLOOKUP(A2, A:A, B:B, "Not Found", 0, -1)
```

### Example 5 — Nested XLOOKUP (2D lookup)
```
=XLOOKUP(B1, B2:E2, XLOOKUP(A3, A4:A10, B4:E10))
```

---

## ⚡ XLOOKUP vs VLOOKUP — Key Differences

| Feature | VLOOKUP | XLOOKUP |
|---------|---------|---------|
| Lookup direction | Left-to-right only | Any direction |
| Return multiple cols | ❌ | ✅ |
| If not found arg | Needs IFERROR | Built-in |
| Last match | ❌ | ✅ |
| Horizontal search | ❌ (use HLOOKUP) | ✅ |

---

## 🧪 Practice Exercises
1. Create a product table (ID, Name, Price, Category). Use XLOOKUP to retrieve Name and Price from ID.
2. Reverse lookup — find the product ID given a name.
3. Use wildcard match_mode to find products starting with "Pro*".
4. Build a 2D table and use nested XLOOKUP to retrieve intersection values.
5. Return "Product not available" when ID doesn't exist.

---

## ⚠️ Common Mistakes
- Forgetting that XLOOKUP requires Microsoft 365 or Excel 2021+
- Not locking arrays with `$` when copying formula across rows
- Confusing lookup_array with return_array order
