import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "SUMIF",
  purpose: "Adds all numbers in a range of cells based on one single criteria.",
  syntax: "=SUMIF(range, criteria, [sum_range])",
  parameters: [
    { name: "range", meaning: "The range of cells that you want evaluated by criteria.", example: "A2:A5 (Region)" },
    { name: "criteria", meaning: "The condition that determines which cells to add.", example: "\"North\"" },
    { name: "[sum_range]", meaning: "Optional. The actual cells to sum, if they are different from the range. If omitted, Excel sums the 'range'.", example: "B2:B5 (Sales)" }
  ],
  initialDataset: {
    headers: ["Department", "Expenses ($)"],
    rows: [
      ["HR", "1500"],
      ["IT", "3000"],
      ["HR", "1200"],
      ["Sales", "4000"]
    ]
  },
  initialUserInput: {
    headers: ["Criteria (Department)"],
    rows: [["HR"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetDept = userInput.rows[0][0];
    
    const formulaUsed = `=SUMIF(A2:A5, "${targetDept}", B2:B5)`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start SUMIF"];
    
    visualSteps.push({
      title: "Step 1: Identify Criteria & Ranges",
      description: `Scanning 'Department' (range) for "${targetDept}". If matched, sum from 'Expenses' (sum_range).`,
      table: { ...dataset }
    });
    flowDiagram.push(`Criteria: "${targetDept}"`, "Initialize Total = 0");
    
    let runningTotal = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const dept = dataset.rows[i][0];
      const expense = parseFloat(dataset.rows[i][1]) || 0;
      
      if (dept === targetDept) {
        runningTotal += expense;
        visualSteps.push({
          title: `Step ${i + 2}: Match Found`,
          description: `Row ${i + 1} matches "${targetDept}". Adding $${expense} to total. (Current Total: $${runningTotal})`,
          table: { ...dataset, highlightRow: i, highlightCol: 1 }
        });
        flowDiagram.push(`Match Row ${i+1}`, `Add ${expense}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: No Match`,
          description: `Row ${i + 1} is "${dept}", which is not "${targetDept}". Ignored.`,
          table: { ...dataset, highlightRow: i, highlightCol: 0 }
        });
        flowDiagram.push(`Skip Row ${i+1}`);
      }
    }
    
    visualSteps.push({
      title: `Final Step: Return Total`,
      description: `Excel has evaluated all rows and returns the final accumulated total of $${runningTotal}.`,
      table: { ...dataset }
    });
    flowDiagram.push(`Return Total`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Total Expenses"], rows: [[runningTotal.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Basic Accounting", description: "Summing up all invoices that have a status of 'Paid'." },
    { title: "Inventory", description: "Calculating the total stock count for a specific category of items." }
  ],
  commonMistakes: [
    "Mixing up the arguments. SUMIF is (Criteria Range, Criteria, Sum Range). SUMIFS is (Sum Range, Criteria Range, Criteria). They are opposite!"
  ],
  practiceExercise: {
    question: "Write a SUMIF to add Sales (B1:B3) where Region (A1:A3) is 'West'.",
    table: { headers: ["A", "B"], rows: [["West", "500"]] },
    expectedFormula: "=SUMIF(A1:A3, \"West\", B1:B3)",
    expectedResult: "500"
  },
  interviewQuestions: [
    { question: "Can SUMIF evaluate multiple conditions?", answer: "No, SUMIF only supports one condition. For multiple conditions, you must use SUMIFS." }
  ],
  challengeQuestion: "How would you use SUMIF to add all values that are greater than 1000 without using a separate criteria cell?"
};

export const SumifLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
