Use this prompt if you want an AI (or a developer) to create a complete SQL practice script that demonstrates all JOIN operations.

---

### Prompt

```text
Create a complete MySQL SQL script that demonstrates all SQL JOIN operations using two related tables.

Requirements:

1. Create a database named:
   SQL_Joins_Practice

2. Create two tables:

Table 1: Employees
--------------------------------
employee_id (Primary Key)
employee_name
email
salary
department_id

Table 2: Departments
--------------------------------
department_id (Primary Key)
department_name
location

3. Insert at least 10 employee records and 6 department records.

The data should include:
- Employees whose department exists.
- Employees with NULL department_id.
- Employees whose department_id does not exist in the Departments table.
- Departments that have no employees.

This data should be designed specifically to demonstrate every type of JOIN.

4. Display the contents of both tables before performing any joins.

5. Perform the following SQL operations one by one:

A. INNER JOIN
- Write the SQL query.
- Execute it.
- Show the output table.
- Explain why only those rows appear.

B. LEFT JOIN
- Write the SQL query.
- Execute it.
- Show the output.
- Explain which rows contain NULL and why.

C. RIGHT JOIN
- Write the SQL query.
- Execute it.
- Show the output.
- Explain why departments without employees appear.

D. FULL OUTER JOIN
- Since MySQL does not support FULL OUTER JOIN directly, implement it using:
    LEFT JOIN
    UNION
    RIGHT JOIN
- Display the output.
- Explain how it works.

E. CROSS JOIN
- Write the SQL query.
- Show the total number of rows returned.
- Explain the Cartesian Product concept.

6. After each JOIN:
- Explain the result in simple beginner-friendly language.
- Mention which rows matched and which did not.

7. Add additional example queries such as:
- Employees working in the IT department.
- Employees without any department.
- Departments without employees.
- Total employees per department using GROUP BY.
- Average salary by department.
- Highest-paid employee in each department.
- Employees earning above the department average.

8. Comment every SQL statement using "--" so beginners can understand what each query does.

9. Ensure the SQL script runs from top to bottom without modification on MySQL 8.x.

10. Format the output cleanly with proper indentation and comments.

Goal:
The final SQL file should serve as a complete beginner-to-intermediate tutorial on SQL JOINs, demonstrating table creation, data insertion, every JOIN type, aggregate queries, and practical examples with expected outputs and explanations.
```

This prompt will generate a **fully executable MySQL practice script** that creates the tables, inserts sample data, performs every JOIN, displays the results, and explains each step in a beginner-friendly way.
