import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "DATE, YEAR, MONTH, DAY",
  purpose: "Builds a valid date from separate components, or extracts components from a valid date.",
  syntax: "=DATE(year, month, day) | =YEAR(date) | =MONTH(date) | =DAY(date)",
  parameters: [
    { name: "year/month/day", meaning: "Numbers representing the date components.", example: "2024, 12, 25" },
    { name: "date", meaning: "A valid Excel date serial number or cell reference.", example: "A2" }
  ],
  initialDataset: {
    headers: ["Year", "Month", "Day"],
    rows: [
      ["2023", "10", "31"],
      ["2024", "2", "29"], // Leap year
      ["2025", "1", "1"]
    ]
  },
  initialUserInput: {
    headers: ["Target Row (1-3)"],
    rows: [["1"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    let rowIdx = parseInt(userInput.rows[0][0]) - 1;
    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= dataset.rows.length) rowIdx = 0;
    
    const yStr = dataset.rows[rowIdx][0];
    const mStr = dataset.rows[rowIdx][1];
    const dStr = dataset.rows[rowIdx][2];
    
    const formulaUsed = `=DATE(${yStr}, ${mStr}, ${dStr})`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start DATE"];
    
    visualSteps.push({
      title: "Step 1: Gather Components",
      description: `Reading Year: ${yStr}, Month: ${mStr}, Day: ${dStr}.`,
      table: { ...dataset, highlightRow: rowIdx }
    });
    flowDiagram.push(`Y:${yStr}, M:${mStr}, D:${dStr}`, "Combine into Date");
    
    const finalDateStr = `${mStr}/${dStr}/${yStr}`; // Standard US format for display
    
    visualSteps.push({
      title: "Step 2: Construct Date",
      description: `Excel calculates the serial number for this date and formats it. Result: ${finalDateStr}`,
      table: { ...dataset, highlightRow: rowIdx }
    });
    flowDiagram.push(`Format Date`, "Return Result");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Combined Date"], rows: [[finalDateStr]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Standardizing Formats", description: "Taking CSV exports where dates are split into 3 columns and combining them into a usable Date column." }
  ],
  commonMistakes: [
    "Not realizing Excel stores dates as serial numbers (e.g. 45000) under the hood. If you see a weird number instead of a date, you just need to change the cell format to 'Short Date'."
  ],
  practiceExercise: {
    question: "Write a formula to create the date Jan 15, 2024.",
    table: { headers: ["A"], rows: [[""]] },
    expectedFormula: "=DATE(2024, 1, 15)",
    expectedResult: "1/15/2024"
  },
  interviewQuestions: [
    { question: "What happens if you type =DATE(2024, 13, 1)?", answer: "Excel will roll the month over into the next year. It will return January 1, 2025." }
  ],
  challengeQuestion: "How do you calculate the exact number of working days between two dates?"
};

export const DateBasicsLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
