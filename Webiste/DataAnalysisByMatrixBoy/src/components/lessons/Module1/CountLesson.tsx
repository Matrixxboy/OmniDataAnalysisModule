import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "COUNT",
  purpose: "Counts the number of cells that contain numbers. Text, blanks, and errors are ignored.",
  syntax: "=COUNT(value1, [value2], ...)",
  parameters: [
    { name: "value1", meaning: "The first item, cell reference, or range you want to count.", example: "A1:A10" },
    { name: "[value2]", meaning: "Optional additional items, cell references, or ranges to count.", example: "B1:B10" }
  ],
  initialDataset: {
    headers: ["Product ID", "Quantity Sold"],
    rows: [
      ["P001", "45"],
      ["P002", "N/A"], // Text
      ["P003", ""],    // Blank
      ["P004", "12"]
    ]
  },
  initialUserInput: {
    headers: ["Range to Count"],
    rows: [["Quantity Sold"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const rangeColumn = userInput.rows[0][0];
    let colIdx = dataset.headers.findIndex(h => h === rangeColumn);
    
    if (colIdx === -1) colIdx = 1;
    
    const formulaUsed = `=COUNT(B2:B5)`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start COUNT"];
    
    visualSteps.push({
      title: "Step 1: Identify Range",
      description: `Excel targets the column "${dataset.headers[colIdx]}" to count numeric entries.`,
      table: { ...dataset, highlightCol: colIdx }
    });
    flowDiagram.push(`Target Col: ${dataset.headers[colIdx]}`, "Initialize Count = 0");
    
    let countTotal = 0;
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const cellValue = dataset.rows[i][colIdx];
      // Check if it's a number and not entirely blank
      const isNumber = !isNaN(parseFloat(cellValue)) && isFinite(Number(cellValue)) && cellValue.trim() !== "";
      
      if (isNumber) {
        countTotal += 1;
        visualSteps.push({
          title: `Step ${i + 2}: Found Number`,
          description: `Row ${i + 1} contains a number (${cellValue}). Count incremented. (Total Count: ${countTotal})`,
          table: { ...dataset, highlightRow: i, highlightCol: colIdx }
        });
        flowDiagram.push(`Increment Count`, `Count: ${countTotal}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: Ignore Text/Blank`,
          description: `Row ${i + 1} contains "${cellValue}" which is not a number. Excel ignores this cell.`,
          table: { ...dataset, highlightRow: i, highlightCol: colIdx }
        });
        flowDiagram.push(`Ignore "${cellValue}"`, `Count: ${countTotal}`);
      }
    }
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Total Count"], rows: [[countTotal.toString()]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Attendance Tracking", description: "Counting how many days a student was present (represented by a '1' or '0') vs 'Absent' (text)." },
    { title: "Survey Responses", description: "Counting how many respondents provided a numeric rating instead of skipping the question." }
  ],
  commonMistakes: [
    "Using COUNT when you meant to use COUNTA. COUNT only counts numbers. COUNTA counts any cell that is not empty.",
    "Expecting COUNT to count boolean values (TRUE/FALSE) when typed directly in cells. It generally ignores them unless they are typed directly into the formula."
  ],
  practiceExercise: {
    question: "Write a COUNT formula to count the numbers in the range A1:A3.",
    table: { headers: ["A"], rows: [["10"], ["Apple"], ["30"]] },
    expectedFormula: "=COUNT(A1:A3)",
    expectedResult: "2"
  },
  interviewQuestions: [
    { question: "What is the difference between COUNT and COUNTA?", answer: "COUNT only counts cells containing numbers. COUNTA counts cells containing any data type (text, numbers, booleans, errors) as long as it is not blank." },
    { question: "Does COUNT count cells containing a 0 (zero)?", answer: "Yes, 0 is a number, so COUNT will include it in the final tally. It only ignores text, errors, and empty cells." }
  ],
  challengeQuestion: "How would you count only the cells that meet a specific condition, like values greater than 50?"
};

export const CountLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
