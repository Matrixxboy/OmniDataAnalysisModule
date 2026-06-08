# 1. Nested VLOOKUP

### Scenario:

Find an employee's salary based on Employee ID and Department.

| EMP ID | HR    | IT    | Finance |
| ------ | ----- | ----- | ------- |
| E101   | 40000 | 42000 | 45000   |
| E102   | 60000 | 62000 | 65000   |
| E103   | 55000 | 58000 | 60000   |

Suppose:

* K2 = Employee ID
* L2 = Department

### Formula

```excel
=VLOOKUP(K2,Table1,MATCH(L2,Table1[#Headers],0),FALSE)
```

### How it works

* `MATCH()` finds the column number of the department.
* `VLOOKUP()` uses that column number dynamically.

---

# 2. Nested XLOOKUP

### Scenario:

Find the salary of an employee where:

* Employee ID is in K2
* Department name is in L2

**Table1:**

| EMP ID | HR    | IT    | Finance |
| ------ | ----- | ----- | ------- |
| E101   | 40000 | 42000 | 45000   |
| E102   | 60000 | 62000 | 65000   |
| E103   | 55000 | 58000 | 60000   |

### Formula

```excel
=XLOOKUP(K2,Table1[EMP ID],XLOOKUP(L2,Table1[#Headers],Table1))
```

Or a more common example:

```excel
=XLOOKUP(K2,Table1[EMP ID],
         XLOOKUP(L2,Table1[#Headers],Table1))
```

### Another Nested XLOOKUP Example

Find the manager of a department:

**Employees Table:**

| EMP ID | Name  | Department |
| ------ | ----- | ---------- |
| E101   | Alice | HR         |
| E102   | Bob   | IT         |

**Departments Table:**

| Department | Manager |
| ---------- | ------- |
| HR         | Dave    |
| IT         | Eve     |

```excel
=XLOOKUP(
    XLOOKUP(K2,Employees[EMP ID],Employees[Department]),
    Departments[Department],
    Departments[Manager]
)
```

### Flow

```
EMP ID → Department → Manager
```

---

# 3. IF + VLOOKUP

### Scenario:

Check whether a customer exists.

**Table1:**

| ID  | Type   | Name  |
| --- | ------ | ----- |
| C1  | Gold   | Alice |
| C2  | Silver | Bob   |
| C3  | Gold   | Carol |

### Formula

```excel
=IF(VLOOKUP(A2,Table1,2,FALSE)="Gold",
    "Premium Customer",
    "Regular Customer")
```

### Example Output

| Customer | Type             |
| -------- | ---------------- |
| Gold     | Premium Customer |
| Silver   | Regular Customer |

---

### Error Handling Example

```excel
=IF(ISNA(VLOOKUP(A2,Table1,2,FALSE)),
    "Not Found",
    VLOOKUP(A2,Table1,2,FALSE))
```

If the ID doesn't exist, it returns:

```
Not Found
```

instead of `#N/A`.

---

# 4. IF + XLOOKUP

### Scenario:

Classify customers based on membership type.

**Table1:**

| ID  | Membership | Status   |
| --- | ---------- | -------- |
| C1  | Gold       | Active   |
| C2  | Silver     | Inactive |
| C3  | Bronze     | Active   |

```excel
=IF(XLOOKUP(A2,Table1[ID],Table1[Membership])="Gold",
    "Premium Customer",
    "Regular Customer")
```

---

### XLOOKUP with Error Handling

```excel
=IF(
   XLOOKUP(A2,Table1[ID],Table1[Status],"Not Found")
   ="Active",
   "Allow Access",
   "Deny Access"
)
```

---

# 5. Nested IF + VLOOKUP

### Scenario:

Give bonus based on salary.

**Table1:**

| ID  | Name  | Salary |
| --- | ----- | ------ |
| E1  | Alice | 60000  |
| E2  | Bob   | 45000  |
| E3  | Carol | 55000  |

```excel
=IF(
    VLOOKUP(A2,Table1,3,FALSE)>50000,
    "10% Bonus",
    "5% Bonus"
)
```

---

# 6. Nested IF + XLOOKUP

### Scenario:

Assign performance grade.

**Table1:**

| EMP ID | Name  | Score |
| ------ | ----- | ----- |
| E1     | Alice | 92    |
| E2     | Bob   | 78    |
| E3     | Carol | 65    |

```excel
=IF(
    XLOOKUP(A2,Table1[EMP ID],Table1[Score])>=90,
    "A",
    IF(
       XLOOKUP(A2,Table1[EMP ID],Table1[Score])>=75,
       "B",
       "C"
    )
)
```

---

# Real Interview-Style Examples

### IF + XLOOKUP + AND

**Table1:**

| ID  | Sales | Rating |
| --- | ----- | ------ |
| S1  | 60000 | 4.5    |
| S2  | 40000 | 4.0    |
| S3  | 70000 | 3.5    |

```excel
=IF(
   AND(
      XLOOKUP(A2,Table1[ID],Table1[Sales])>50000,
      XLOOKUP(A2,Table1[ID],Table1[Rating])>=4
   ),
   "Eligible",
   "Not Eligible"
)
```

### Nested XLOOKUP (Department → Manager → Email)

**Employees Table:**

| ID  | Name  | Department |
| --- | ----- | ---------- |
| E1  | Alice | Sales      |
| E2  | Bob   | IT         |

**Departments Table:**

| Department | Manager |
| ---------- | ------- |
| Sales      | Dave    |
| IT         | Eve     |

**Managers Table:**

| Manager | Email           |
| ------- | --------------- |
| Dave    | dave@co.com     |
| Eve     | eve@co.com      |

```excel
=XLOOKUP(
   XLOOKUP(
      XLOOKUP(A2,Employees[ID],Employees[Department]),
      Departments[Department],
      Departments[Manager]
   ),
   Managers[Manager],
   Managers[Email]
)
```

Flow:

```
Employee ID
   ↓
Department
   ↓
Manager
   ↓
Manager Email
```

This type of multi-level nested XLOOKUP is commonly asked in Excel interviews and used in HR, CRM, and reporting dashboards.
