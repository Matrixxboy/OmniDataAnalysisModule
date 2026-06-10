import React from 'react';
import { InteractiveSQLSandbox } from '../../engines/InteractiveSQLSandbox';

export const SQLBasicsLesson: React.FC = () => {
  return (
    <InteractiveSQLSandbox 
      lessonTitle="SQL Basics: SELECT, WHERE, and ORDER BY"
      lessonDescription="Learn the fundamental building blocks of SQL. Use SELECT to pick columns, WHERE to filter rows, and ORDER BY to sort the results."
      initialQuery={"-- Try finding all customers from India, sorted by signup date\nSELECT name, city, signup_date \nFROM customers \nWHERE country = 'India' \nORDER BY signup_date DESC;\n"}
      explanations={[
        {
          concept: 'SELECT',
          description: 'Used to choose which columns you want to retrieve from a database table. Using * means "all columns".',
          syntax: 'SELECT column1, column2 FROM table_name;'
        },
        {
          concept: 'WHERE',
          description: 'Filters the records based on specific conditions. Only records fulfilling the condition are returned.',
          syntax: 'SELECT * FROM table_name WHERE condition;'
        },
        {
          concept: 'ORDER BY',
          description: 'Sorts the result set in ascending (ASC) or descending (DESC) order based on one or more columns.',
          syntax: 'SELECT * FROM table_name ORDER BY column1 DESC;'
        }
      ]}
    />
  );
};
