# Nested IFS — Notes & Examples

## IFS Function (Excel 2019+)
```
=IFS(condition1, value1, condition2, value2, ..., TRUE, default_value)
```
Checks multiple conditions in order — no nesting needed.

### Example — Grade Calculator
```
=IFS(A2>=90, "A", A2>=80, "B", A2>=70, "C", A2>=60, "D", TRUE, "F")
```

### Example — Sales Commission Tier
```
=IFS(B2>100000, "Platinum", B2>50000, "Gold", B2>20000, "Silver", TRUE, "Bronze")
```

---

## Nested IF (Works in all versions)
```
=IF(condition1, value1, IF(condition2, value2, IF(condition3, value3, default)))
```

### Example — Shipping Cost by Weight
```
=IF(A2<1, 50, IF(A2<5, 100, IF(A2<10, 200, 350)))
```

---

## 🧪 Practice Exercises
1. Grade calculator with 5 letter grades using IFS
2. Employee bonus tiers: >120% target → 20%, >100% → 10%, else 0%
3. Regional discount: North=15%, South=10%, East=5%, else=0%
4. Nested IF age category: Child (<13), Teen (13-17), Adult (18-64), Senior (65+)

---

## ⚠️ Common Mistakes
- Conditions not mutually exclusive (overlap causes wrong result)
- Missing TRUE fallback in IFS (causes #N/A error)
- Too many nested IFs (>7 becomes hard to read — use IFS instead)
