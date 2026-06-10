import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "SUM",
  purpose: "Adds all the numbers in a range of cells, ignoring text or empty cells.",
  syntax: "=SUM(number1, [number2], ...)",
  parameters: [
    { name: "number1", meaning: "The first item or range of cells you want to add.", example: "A1:A10 or 50" },
    { name: "[number2]", meaning: "Optional additional numbers or ranges to add.", example: "B1:B10" }
  ],
  initialDataset: {
    headers: ["Expense Category", "Amount ($)"],
    rows: [
      ["Office Supplies", "450"],
      ["Software Subscriptions", "1200"],
      ["Travel", "N/A"], // Text value to show it ignores text
      ["Meals", "350"]
    ]
  },
  initialUserInput: {
    headers: ["Range to Sum"],
    rows: [["Amount ($)"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const rangeColumn = userInput.rows[0][0]; // the column name
    let colIdx = dataset.headers.findIndex(h => h === rangeColumn);
    
    // Default to the last column if they type something invalid
    if (colIdx === -1) colIdx = 1;
    
    const formulaUsed = `=SUM(B2:B5)`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start SUM"];
    
    visualSteps.push({
      title: "Step 1: Identify Range",
      description: `Excel targets the column "${dataset.headers[colIdx]}" to sum its values.`,
      table: { ...dataset, highlightCol: colIdx }
    });
    flowDiagram.push(`Target Col: ${dataset.headers[colIdx]}`, "Initialize Total = 0");
    
    let runningTotal = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const cellValue = dataset.rows[i][colIdx];
      const parsedValue = parseFloat(cellValue);
      
      if (!isNaN(parsedValue)) {
        runningTotal += parsedValue;
        visualSteps.push({
          title: `Step ${i + 2}: Add Numeric Value`,
          description: `Row ${i + 1} contains a number (${parsedValue}). Added to running total. (Total: ${runningTotal})`,
          table: { ...dataset, highlightRow: i, highlightCol: colIdx }
        });
        flowDiagram.push(`Add ${parsedValue}`, `Total: ${runningTotal}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: Ignore Text/Empty`,
          description: `Row ${i + 1} contains text ("${cellValue}"). Excel ignores this value.`,
          table: { ...dataset, highlightRow: i, highlightCol: colIdx }
        });
        flowDiagram.push(`Ignore "${cellValue}"`, `Total: ${runningTotal}`);
      }
    }
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Total Sum"], rows: [[runningTotal.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Financial Reporting", description: "Calculating total monthly expenses or revenue." },
    { title: "Inventory Management", description: "Summing up the total number of items in stock across different warehouses." }
  ],
  commonMistakes: [
    "Using + instead of SUM for large ranges (e.g. =A1+A2+A3 instead of =SUM(A1:A3)).",
    "Not realizing that SUM ignores text, which can be confusing if numbers are formatted as text."
  ],
  practiceExercise: {
    question: "Write a SUM formula to add the values 10, 20, and 30.",
    table: { headers: ["A"], rows: [["10"], ["20"], ["30"]] },
    expectedFormula: "=SUM(A1:A3)",
    expectedResult: "60"
  },
  interviewQuestions: [
    { question: "What happens if a cell in your SUM range contains text?", answer: "The SUM function automatically ignores cells with text or booleans and only adds the numeric values." },
    { question: "How is SUM different from simply using the + operator?", answer: "The + operator will return a #VALUE! error if it encounters text, whereas SUM safely ignores text." }
  ],
  challengeQuestion: "How would you sum values that meet a certain condition (e.g., only sum expenses over $1000)?"
};

export const SumLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
