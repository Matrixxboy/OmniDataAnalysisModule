import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "INDEX & MATCH",
  purpose: "Combines two functions to perform two-way lookups and leftward lookups, overcoming the limitations of VLOOKUP.",
  syntax: "=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))",
  parameters: [
    { name: "return_array", meaning: "The range of cells containing the value you want to extract.", example: "B1:B10" },
    { name: "lookup_value", meaning: "The value you are searching for.", example: "\"Apple\"" },
    { name: "lookup_array", meaning: "The range of cells to search within.", example: "A1:A10" }
  ],
  initialDataset: {
    headers: ["Price", "Product", "Stock"], // Price is on the left to show leftward lookup
    rows: [
      ["$1.20", "Apple", "150"],
      ["$0.50", "Banana", "300"],
      ["$3.50", "Cherry", "0"],
      ["$2.00", "Date", "45"]
    ]
  },
  initialUserInput: {
    headers: ["Lookup Value (Product)"],
    rows: [["Cherry"]] // Default looks for Cherry, returns Price
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const lookupVal = userInput.rows[0][0];
    
    const formulaUsed = `=INDEX(A2:A5, MATCH("${lookupVal}", B2:B5, 0))`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start MATCH"];
    
    // Step 1: MATCH function
    visualSteps.push({
      title: "Step 1: Execute MATCH",
      description: `MATCH scans the 'Product' column (B2:B5) for "${lookupVal}" to find its relative row number.`,
      table: { ...dataset, highlightCol: 1 }
    });
    flowDiagram.push(`Scan for "${lookupVal}"`);
    
    let foundRowIdx = -1;
    for (let i = 0; i < dataset.rows.length; i++) {
      if (dataset.rows[i][1] === lookupVal) { // Product is col 1
        foundRowIdx = i;
        break;
      }
    }
    
    if (foundRowIdx !== -1) {
      visualSteps.push({
        title: "Step 2: MATCH Result",
        description: `MATCH found "${lookupVal}" at relative row ${foundRowIdx + 1}.`,
        table: { ...dataset, highlightRow: foundRowIdx, highlightCol: 1 }
      });
      flowDiagram.push(`Found Row ${foundRowIdx + 1}`, "Start INDEX");
      
      visualSteps.push({
        title: "Step 3: Execute INDEX",
        description: `INDEX takes the 'Price' column (A2:A5) and extracts the value at row ${foundRowIdx + 1}.`,
        table: { ...dataset, highlightRow: foundRowIdx, highlightCol: 0 } // Price is col 0
      });
      flowDiagram.push(`Extract from Col A`, "Return Result");
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result (Price)"], rows: [[dataset.rows[foundRowIdx][0]]] },
        flowDiagram
      };
    } else {
      visualSteps.push({
        title: "Step 2: No Match Found",
        description: `MATCH could not find "${lookupVal}" in the lookup array.`,
        table: { ...dataset, highlightCol: 1 }
      });
      flowDiagram.push(`No Match`, "Return Error");
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [["#N/A"]] },
        flowDiagram
      };
    }
  },
  realWorldExamples: [
    { title: "Leftward Lookups", description: "Looking up an Employee ID based on their Name, where ID is the first column." },
    { title: "Two-Way Lookups", description: "Finding sales figures for a specific month and specific product using INDEX with two MATCH functions." }
  ],
  commonMistakes: [
    "Forgetting the ', 0' at the end of the MATCH function to force an exact match.",
    "Selecting ranges of different sizes for the INDEX array and MATCH array (e.g., INDEX(A1:A10, MATCH(B1:B9)))."
  ],
  practiceExercise: {
    question: "Write an INDEX MATCH formula to find the Price of 'Banana'.",
    table: { headers: ["Price", "Product"], rows: [["$1.20", "Apple"], ["$0.50", "Banana"]] },
    expectedFormula: "=INDEX(A1:A2, MATCH(\"Banana\", B1:B2, 0))",
    expectedResult: "$0.50"
  },
  interviewQuestions: [
    { question: "Why use INDEX/MATCH over VLOOKUP?", answer: "INDEX/MATCH can look left, isn't affected if columns are inserted/deleted in the middle of your table, and processes faster on large datasets because it only evaluates two specific columns." }
  ],
  challengeQuestion: "How would you write a formula that uses MATCH twice inside INDEX to find a value at the intersection of a specific row and column?"
};

export const IndexMatchLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
