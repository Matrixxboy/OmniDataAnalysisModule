import React from 'react';
import { InteractiveSQLSandbox } from '../../engines/InteractiveSQLSandbox';

export const SQLAdvancedLesson: React.FC = () => {
  return (
    <InteractiveSQLSandbox 
      lessonTitle="Advanced SQL: CTEs & Subqueries"
      lessonDescription="Master advanced analytical queries using Common Table Expressions (WITH clauses) and Subqueries for complex data pipelines. Note: In-browser SQL does not fully support Window Functions like RANK()."
      initialQuery={"-- Find employees who earn more than the average salary in their department\nWITH DeptAvg AS (\n  SELECT department, AVG(salary) as avg_salary\n  FROM employees\n  GROUP BY department\n)\nSELECT e.name, e.department, e.salary, ROUND(d.avg_salary, 2) as dept_avg\nFROM employees e\nJOIN DeptAvg d ON e.department = d.department\nWHERE e.salary > d.avg_salary\nORDER BY e.department, e.salary DESC;\n"}
      explanations={[
        {
          concept: 'CTE (WITH Clause)',
          description: 'A Common Table Expression (CTE) is a temporary result set that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement. It makes complex queries easier to read.',
          syntax: 'WITH CTE_Name AS (SELECT * FROM table) SELECT * FROM CTE_Name;'
        },
        {
          concept: 'Subqueries',
          description: 'A query nested inside another query. It can be used in SELECT, FROM, or WHERE clauses to perform operations based on dynamic results.',
          syntax: 'SELECT * FROM table WHERE id IN (SELECT id FROM other_table);'
        }
      ]}
    />
  );
};
