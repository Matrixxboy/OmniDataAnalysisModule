import React from 'react';
import { InteractiveSQLSandbox } from '../../engines/InteractiveSQLSandbox';

export const SQLJoinsLesson: React.FC = () => {
  return (
    <InteractiveSQLSandbox 
      lessonTitle="Joins & Aggregations"
      lessonDescription="Combine data from multiple tables using JOINs, and summarize data using GROUP BY and aggregate functions like SUM(), COUNT(), and AVG()."
      initialQuery={"-- Calculate total sales revenue by category\nSELECT p.category, SUM(o.total_amount) as total_revenue, COUNT(o.order_id) as total_orders\nFROM orders o\nJOIN order_items oi ON o.order_id = oi.order_id\nJOIN products p ON oi.product_id = p.product_id\nWHERE o.status = 'Delivered'\nGROUP BY p.category\nORDER BY total_revenue DESC;\n"}
      explanations={[
        {
          concept: 'INNER JOIN',
          description: 'Combines rows from two or more tables based on a related column between them. Returns records that have matching values in both tables.',
          syntax: 'SELECT * FROM table1 JOIN table2 ON table1.id = table2.id;'
        },
        {
          concept: 'GROUP BY',
          description: 'Groups rows that have the same values into summary rows, like "find the number of customers in each country". Often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG).',
          syntax: 'SELECT column, SUM(sales) FROM table GROUP BY column;'
        }
      ]}
    />
  );
};
