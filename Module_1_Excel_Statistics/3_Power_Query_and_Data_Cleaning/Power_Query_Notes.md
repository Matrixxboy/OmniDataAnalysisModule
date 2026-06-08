# Power Query & Data Cleaning — Detailed Notes

## Opening Power Query
- **Data → Get Data → From File → From Text/CSV**
- Or: **Data → Get & Transform Data → From Table/Range** (for existing Excel table)

---

## Common Transformations in Power Query Editor

### 1. Remove Columns
Right-click column header → Remove Columns

### 2. Rename Columns
Double-click column header → type new name

### 3. Change Data Type
Click the data type icon (left of column name) → choose: Text, Number, Date, etc.

### 4. Filter Rows
Click dropdown arrow on column → uncheck values to exclude

### 5. Replace Values
Right-click column → Replace Values → (old value → new value)

### 6. Remove Duplicates
Select columns → **Home → Remove Rows → Remove Duplicates**

### 7. Fill Down / Fill Up
Handle null cells below a category label:
Right-click column → **Fill → Down**

### 8. Split Column by Delimiter
Right-click column → **Split Column → By Delimiter** (comma, space, custom)

### 9. Merge Columns
Select 2+ columns → **Transform → Merge Columns** → choose separator

### 10. Merge Queries (like SQL JOIN)
**Home → Merge Queries**
- Select join column from each table
- Choose join type: Left Outer, Inner, Full Outer, etc.

---

## Flash Fill (outside Power Query)
**How to use:**
1. Type the desired output pattern in first cell
2. Start typing in second cell
3. Press **Ctrl+E** OR Excel auto-suggests — press Enter to accept

### Flash Fill Examples
| Raw Data | Flash Fill Output | Pattern Detected |
|----------|------------------|-----------------|
| "John Smith" | "John" | Extract first name |
| "john@gmail.com" | "gmail.com" | Extract domain |
| "9876543210" | "(987) 654-3210" | Format phone |
| "01-Jan-2024" | "2024-01-01" | Reformat date |

---

## Text-to-Columns
**Data → Text to Columns**
- Step 1: Delimited (comma, tab, space) or Fixed Width
- Step 2: Choose delimiter character
- Step 3: Set data format for each column

### Use case: Split "City, State" into two columns
1. Select the column
2. Data → Text to Columns → Delimited → Comma
3. Result: City | State in separate columns

---

## Data Cleaning Checklist
- [ ] Remove completely blank rows/columns
- [ ] Standardise text case (PROPER, UPPER, LOWER)
- [ ] Trim extra spaces (TRIM function or Power Query trim)
- [ ] Remove duplicates
- [ ] Handle missing values (fill, replace with 0, or flag)
- [ ] Fix data types (numbers stored as text, dates as strings)
- [ ] Standardise category values ("NY" vs "New York" vs "new york")
- [ ] Remove special characters from numeric fields
- [ ] Validate date ranges (no future dates in historical data)

---

## 🧪 Practice Exercises
1. Download a dirty CSV from Kaggle (search "messy data")
2. Import into Power Query; fix at least 5 issues
3. Split a "Full Name" column into First and Last Name
4. Merge an orders table with a products table on Product ID
5. Load the cleaned data to a new sheet; document all steps taken
