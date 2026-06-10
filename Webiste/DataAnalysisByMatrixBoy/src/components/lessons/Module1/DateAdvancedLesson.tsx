import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "DATEDIF, EDATE, EOMONTH",
  purpose: "Advanced date calculations. DATEDIF finds the difference between two dates. EDATE adds months. EOMONTH finds the last day of a month.",
  syntax: "=DATEDIF(start, end, unit) | =EDATE(start, months) | =EOMONTH(start, months)",
  parameters: [
    { name: "start/end", meaning: "The starting and ending dates.", example: "\"1/1/2023\", \"12/31/2023\"" },
    { name: "unit", meaning: "For DATEDIF: \"Y\" (Years), \"M\" (Months), or \"D\" (Days).", example: "\"M\"" },
    { name: "months", meaning: "For EDATE/EOMONTH: Number of months to add (or subtract if negative).", example: "6" }
  ],
  initialDataset: {
    headers: ["Start Date", "End Date"],
    rows: [
      ["1/1/2020", "1/1/2025"],
      ["5/15/2023", "8/20/2023"]
    ]
  },
  initialUserInput: {
    headers: ["Target Row (1-2)"],
    rows: [["1"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    let rowIdx = parseInt(userInput.rows[0][0]) - 1;
    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= dataset.rows.length) rowIdx = 0;
    
    const startStr = dataset.rows[rowIdx][0];
    const endStr = dataset.rows[rowIdx][1];
    
    // Simulate DATEDIF(Y), EDATE(+6), EOMONTH(+0)
    const formulaUsed = `Various Advanced Date Functions`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Read Dates"];
    
    visualSteps.push({
      title: "Step 1: Read Dates",
      description: `Start Date: ${startStr}, End Date: ${endStr}.`,
      table: { ...dataset, highlightRow: rowIdx }
    });
    flowDiagram.push(`Start: ${startStr}`, `End: ${endStr}`);
    
    // DATEDIF Years
    const startD = new Date(startStr);
    const endD = new Date(endStr);
    let yearsDiff = endD.getFullYear() - startD.getFullYear();
    if (endD.getMonth() < startD.getMonth() || (endD.getMonth() === startD.getMonth() && endD.getDate() < startD.getDate())) {
      yearsDiff--; // hasn't reached the anniversary yet
    }
    
    visualSteps.push({
      title: "Step 2: DATEDIF(start, end, \"Y\")",
      description: `Calculates full years between the two dates. Result: ${yearsDiff} years.`,
      table: { ...dataset, highlightRow: rowIdx }
    });
    flowDiagram.push(`DATEDIF "Y" -> ${yearsDiff}`);
    
    // EDATE + 6 months
    const edateD = new Date(startD);
    edateD.setMonth(edateD.getMonth() + 6);
    const edateStr = `${edateD.getMonth()+1}/${edateD.getDate()}/${edateD.getFullYear()}`;
    
    visualSteps.push({
      title: "Step 3: EDATE(start, 6)",
      description: `Adds exactly 6 months to the Start Date. Result: ${edateStr}.`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`EDATE(6) -> ${edateStr}`);
    
    // EOMONTH + 0 months
    const eomonthD = new Date(startD.getFullYear(), startD.getMonth() + 1, 0); // day 0 of next month is last day of current
    const eomonthStr = `${eomonthD.getMonth()+1}/${eomonthD.getDate()}/${eomonthD.getFullYear()}`;
    
    visualSteps.push({
      title: "Step 4: EOMONTH(start, 0)",
      description: `Finds the End Of the MONTH for the Start Date (+0 months). Result: ${eomonthStr}.`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`EOMONTH(0) -> ${eomonthStr}`, "Return");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["DATEDIF(Y)", "EDATE(+6m)", "EOMONTH(+0m)"], rows: [[yearsDiff.toString(), edateStr, eomonthStr]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Employee Tenure", description: "Using DATEDIF to calculate exact years and months someone has worked at a company." },
    { title: "Invoice Due Dates", description: "Using EOMONTH to set due dates to 'the last day of the following month'." }
  ],
  commonMistakes: [
    "DATEDIF doesn't show up in Excel's formula autocomplete! It's a hidden, legacy function, but it still works perfectly.",
    "Forgetting to format EDATE/EOMONTH results as a Date. They often output a 5-digit serial number initially."
  ],
  practiceExercise: {
    question: "Calculate the last day of the month for Jan 15, 2024.",
    table: { headers: ["A"], rows: [["1/15/2024"]] },
    expectedFormula: "=EOMONTH(A1, 0)",
    expectedResult: "1/31/2024"
  },
  interviewQuestions: [
    { question: "What happens if you use DATEDIF with the unit 'MD'?", answer: "It calculates the difference in days, ignoring the months and years. E.g., difference between Jan 1 and Feb 5 is 4 days." }
  ],
  challengeQuestion: "How would you use DATEDIF to output 'X Years, Y Months'?"
};

export const DateAdvancedLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
