## 1. The Original Table: Employees
Imagine you start with a simple table containing four columns.

| EmployeeID | FirstName | LastName | HourlyRate |
|---|---|---|---|
| 101 | Sam | Patel | 25.00 |
| 102 | Alex | Kim | 30.00 |

------------------------------
## 2. Common ALTER Queries
Here is how you use ALTER to change this table's structure.
## Add a New Column
Add an email column to store contact information.
```sql
ALTER TABLE Employees ADD Email VARCHAR(100);
```
## Modify an Existing Column
Change the data type of HourlyRate to allow for larger decimal numbers. [2] 
```sql
ALTER TABLE Employees 
MODIFY COLUMN HourlyRate DECIMAL(10, 2);
```

(Note: Use ALTER COLUMN instead of MODIFY COLUMN if you are using SQL Server). [3] 
## Delete a Column
Remove the LastName column from the table structure entirely.
```sql
ALTER TABLE Employees DROP COLUMN LastName;
```
------------------------------
## 3. The Final Table Structure
After running the three ALTER queries above, the structural "blueprint" of your table changes. The rows adjust automatically to fit the new design. [4] 

| EmployeeID | FirstName | HourlyRate | Email |
|---|---|---|---|
| 101 | Sam | 25.00 | NULL |
| 102 | Alex | 30.00 | NULL |

Notice that the new Email column values default to NULL because no data has been added to those rows yet. [5, 6] 
Do you want to see how to add a foreign key constraint using ALTER, or should we look at how to rename a table?

[1] [https://www.tutorialgateway.org](https://www.tutorialgateway.org/sql-create-table/)
[2] [https://www.slideshare.net](https://www.slideshare.net/slideshow/class-xiiunit-iii-sql-and-mysql-notes0pdf/267578555)
[3] [https://www.quackit.com](https://www.quackit.com/sql/tutorial/sql_alter_table.cfm)
[4] [https://retool.com](https://retool.com/blog/how-to-build-a-sql-gui)
[5] [https://www.scaler.com](https://www.scaler.com/topics/describe-table-in-sql/)
[6] [https://www.geeksforgeeks.org](https://www.geeksforgeeks.org/mysql/mysql-alter-table-statement/)
