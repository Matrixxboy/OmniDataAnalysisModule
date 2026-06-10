import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "FILTER",
  purpose: "Extracts multiple records from a range of data that meet one or more conditions. It 'spills' the results into adjacent cells.",
  syntax: "=FILTER(array, include, [if_empty])",
  parameters: [
    { name: "array", meaning: "The range or array to filter.", example: "A2:C10" },
    { name: "include", meaning: "A boolean array (TRUE/FALSE) indicating which rows to keep.", example: "B2:B10=\"Sales\"" },
    { name: "[if_empty]", meaning: "Optional value to return if no rows match the criteria.", example: "\"No Results\"" }
  ],
  initialDataset: {
    headers: ["Name", "Department", "Performance"],
    rows: [
      ["Alice", "Sales", "High"],
      ["Bob", "IT", "Medium"],
      ["Charlie", "Sales", "Medium"],
      ["Diana", "HR", "High"],
      ["Eve", "Sales", "High"]
    ]
  },
  initialUserInput: {
    headers: ["Target Department", "Target Performance"],
    rows: [["Sales", "High"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetDept = userInput.rows[0][0];
    const targetPerf = userInput.rows[0][1];
    
    const formulaUsed = `=FILTER(A2:C6, (B2:B6="${targetDept}") * (C2:C6="${targetPerf}"), "No Results")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start FILTER"];
    
    visualSteps.push({
      title: "Step 1: Identify Criteria",
      description: `Excel will scan the dataset and KEEP only rows where Department="${targetDept}" AND Performance="${targetPerf}".`,
      table: { ...dataset }
    });
    flowDiagram.push(`Set Criteria`, "Scan Rows");
    
    const filteredRows: string[][] = [];
    
    for (let i = 0; i < dataset.rows.length; i++) {
      const row = dataset.rows[i];
      const dept = row[1];
      const perf = row[2];
      
      if (dept === targetDept && perf === targetPerf) {
        filteredRows.push([...row]);
        visualSteps.push({
          title: `Step ${i + 2}: Match Found (Include)`,
          description: `Row ${i + 1} matches BOTH criteria. It will be INCLUDED in the final array.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Include Row ${i+1}`);
      } else {
        visualSteps.push({
          title: `Step ${i + 2}: No Match (Exclude)`,
          description: `Row ${i + 1} does not match all criteria. It will be EXCLUDED.`,
          table: { ...dataset, highlightRow: i }
        });
        flowDiagram.push(`Exclude Row ${i+1}`);
      }
    }
    
    if (filteredRows.length === 0) {
      filteredRows.push(["No Results", "", ""]);
      flowDiagram.push("No Rows Matched", "Return [if_empty]");
    } else {
      flowDiagram.push("Spill Results");
    }
    
    visualSteps.push({
      title: `Final Step: Spill Array`,
      description: `Excel returns the new filtered array, which "spills" down and across the necessary cells.`,
      table: { ...dataset }
    });
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: dataset.headers, rows: filteredRows },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Dynamic Reports", description: "Extracting a list of all employees in a specific department without hiding rows." },
    { title: "Error Checking", description: "Filtering for all transactions that have missing or #N/A values." }
  ],
  commonMistakes: [
    "Spill Errors (#SPILL!). If the cells where FILTER wants to output its results aren't completely empty, it will block the formula.",
    "Using AND/OR functions inside the 'include' argument. You must use multiplication (*) for AND logic, and addition (+) for OR logic."
  ],
  practiceExercise: {
    question: "Write a FILTER formula to extract rows from A1:B3 where B1:B3 is 'Yes'.",
    table: { headers: ["Name", "Done"], rows: [["A", "Yes"], ["B", "No"], ["C", "Yes"]] },
    expectedFormula: "=FILTER(A1:B3, B1:B3=\"Yes\")",
    expectedResult: "A, C"
  },
  interviewQuestions: [
    { question: "How do you apply multiple criteria in a FILTER function?", answer: "By multiplying arrays for AND logic: (Range1=Criteria1) * (Range2=Criteria2)." }
  ],
  challengeQuestion: "How would you use FILTER to return only the 'Name' column instead of all columns?"
};

export const FilterLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
