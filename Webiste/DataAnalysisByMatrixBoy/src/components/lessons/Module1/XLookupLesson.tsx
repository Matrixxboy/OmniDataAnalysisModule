import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "XLOOKUP",
  purpose: "Searches a range or an array, and returns an item corresponding to the first match it finds. If a match doesn't exist, then XLOOKUP can return the closest (approximate) match.",
  syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
  parameters: [
    { name: "lookup_value", meaning: "The value you are searching for.", example: "\"Apple\"" },
    { name: "lookup_array", meaning: "The range or array to search.", example: "A1:A10" },
    { name: "return_array", meaning: "The range or array to return.", example: "B1:B10" },
    { name: "[if_not_found]", meaning: "Optional. Text to return if a valid match is not found.", example: "\"Not Found\"" }
  ],
  initialDataset: {
    headers: ["Product", "Stock", "Price"],
    rows: [
      ["Apple", "150", "$1.20"],
      ["Banana", "300", "$0.50"],
      ["Cherry", "0", "$3.50"],
      ["Date", "45", "$2.00"]
    ]
  },
  initialUserInput: {
    headers: ["Lookup Value (Product)", "If Not Found"],
    rows: [["Cherry", "Out of Stock"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const lookupVal = userInput.rows[0][0];
    const ifNotFound = userInput.rows[0][1];
    
    const formulaUsed = `=XLOOKUP("${lookupVal}", A2:A5, C2:C5, "${ifNotFound}")`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start XLOOKUP"];
    
    visualSteps.push({
      title: "Step 1: Scan Lookup Array",
      description: `Scanning the 'Product' column (lookup_array) for "${lookupVal}".`,
      table: { ...dataset, highlightCol: 0 }
    });
    flowDiagram.push(`Scan for "${lookupVal}"`, "Check Rows");
    
    let foundRowIdx = -1;
    for (let i = 0; i < dataset.rows.length; i++) {
      if (dataset.rows[i][0] === lookupVal) {
        foundRowIdx = i;
        break;
      }
    }
    
    if (foundRowIdx !== -1) {
      visualSteps.push({
        title: "Step 2: Match Found",
        description: `Found exact match for "${lookupVal}" at row ${foundRowIdx + 1}.`,
        table: { ...dataset, highlightRow: foundRowIdx, highlightCol: 0 }
      });
      flowDiagram.push(`Match Found`, "Map to Return Array");
      
      visualSteps.push({
        title: "Step 3: Extract Return Value",
        description: `Mapping directly to the 'Price' column (return_array) in the same row.`,
        table: { ...dataset, highlightRow: foundRowIdx, highlightCol: 2 }
      });
      flowDiagram.push(`Extract from Return Array`, "Return Result");
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result (Price)"], rows: [[dataset.rows[foundRowIdx][2]]] },
        flowDiagram
      };
    } else {
      visualSteps.push({
        title: "Step 2: No Match Found",
        description: `Could not find "${lookupVal}" in the lookup array.`,
        table: { ...dataset, highlightCol: 0 }
      });
      flowDiagram.push(`No Match`, "Check [if_not_found]");
      
      visualSteps.push({
        title: "Step 3: Use 'If Not Found'",
        description: `Using the provided fallback value: "${ifNotFound}".`,
        table: { ...userInput, highlightCol: 1, highlightRow: 0 }
      });
      flowDiagram.push(`Return Fallback`);
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [[ifNotFound || "#N/A"]] },
        flowDiagram
      };
    }
  },
  realWorldExamples: [
    { title: "Dynamic Product Search", description: "Looking up product prices without worrying about column order (unlike VLOOKUP)." },
    { title: "Clean Error Handling", description: "Returning 'Not Found' instead of an ugly #N/A error right inside the formula." }
  ],
  commonMistakes: [
    "Using mismatched sizes for lookup_array and return_array. They must be the same height (or width).",
    "Forgetting that XLOOKUP can search right-to-left, which VLOOKUP cannot do."
  ],
  practiceExercise: {
    question: "Write an XLOOKUP to find the Stock of 'Banana', returning 'No Data' if not found.",
    table: { headers: ["Product", "Stock"], rows: [["Apple", "10"], ["Banana", "20"]] },
    expectedFormula: "=XLOOKUP(\"Banana\", A1:A2, B1:B2, \"No Data\")",
    expectedResult: "20"
  },
  interviewQuestions: [
    { question: "Why is XLOOKUP considered better than VLOOKUP?", answer: "XLOOKUP can search in any direction (left or right), defaults to exact match, allows a built-in 'if not found' value, and performs faster on large datasets because it only evaluates the specific columns provided rather than the whole table array." }
  ],
  challengeQuestion: "How would you use XLOOKUP to return multiple columns (e.g., both Stock and Price) at once?"
};

export const XLookupLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
