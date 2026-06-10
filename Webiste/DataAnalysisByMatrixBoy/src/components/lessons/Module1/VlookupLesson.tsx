import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "VLOOKUP",
  purpose: "Search for a specific value in the first column of a table and return a value in the same row from a column you specify.",
  syntax: "=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])",
  parameters: [
    { name: "lookup_value", meaning: "The value you want to search for in the first column.", example: "\"E103\" or A2" },
    { name: "table_array", meaning: "The range of cells containing the data.", example: "A1:D5" },
    { name: "col_index_num", meaning: "The column number in the table_array containing the return value.", example: "4 (for the 4th column)" },
    { name: "[range_lookup]", meaning: "TRUE (approximate match) or FALSE (exact match). Default is usually TRUE, but FALSE is most common.", example: "FALSE" }
  ],
  initialDataset: {
    headers: ["Emp ID", "Name", "Department", "Salary"],
    rows: [
      ["E101", "Alice", "HR", "60000"],
      ["E102", "Bob", "IT", "85000"],
      ["E103", "Charlie", "Sales", "75000"],
      ["E104", "Diana", "IT", "90000"]
    ]
  },
  initialUserInput: {
    headers: ["Lookup Value (Emp ID)", "Return Col Index"],
    rows: [["E103", "4"]] // Default looks for E103, returns Salary (col 4)
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const lookupVal = userInput.rows[0][0];
    const colIndexStr = userInput.rows[0][1];
    const colIndex = parseInt(colIndexStr);
    
    const formulaUsed = `=VLOOKUP("${lookupVal}", A1:D5, ${colIndex}, FALSE)`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start VLOOKUP"];
    
    // Step 1: Initialization
    visualSteps.push({
      title: "Step 1: Scan First Column",
      description: `Excel looks at the first column of the table array for the exact match to "${lookupVal}".`,
      table: { ...dataset, highlightCol: 0 }
    });
    flowDiagram.push(`Scan for "${lookupVal}"`, "Check Rows");
    
    // Step 2: Find the match
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
        description: `Found an exact match for "${lookupVal}" at row ${foundRowIdx + 1}. Excel will now lock onto this row.`,
        table: { ...dataset, highlightRow: foundRowIdx }
      });
      flowDiagram.push(`Match Found`, "Lock Row");
      
      // Step 3: Extract column value
      const targetColIdx = colIndex - 1; // 1-based index to 0-based array index
      
      if (targetColIdx >= 0 && targetColIdx < dataset.headers.length) {
        visualSteps.push({
          title: "Step 3: Extract Value",
          description: `Moving to column index ${colIndex} (${dataset.headers[targetColIdx]}) to extract the final value.`,
          table: { ...dataset, highlightRow: foundRowIdx, highlightCol: targetColIdx }
        });
        flowDiagram.push(`Go to Col ${colIndex}`, "Return Value");
        
        return {
          formulaUsed,
          visualSteps,
          finalOutput: { headers: ["Result"], rows: [[dataset.rows[foundRowIdx][targetColIdx]]] },
          flowDiagram
        };
      } else {
        visualSteps.push({
          title: "Step 3: Invalid Column",
          description: `Column index ${colIndex} is outside the range of the table array.`,
          table: { ...dataset, highlightRow: foundRowIdx }
        });
        flowDiagram.push(`Invalid Col Index`, "Error");
        
        return {
          formulaUsed,
          visualSteps,
          finalOutput: { headers: ["Result"], rows: [["#REF!"]] },
          flowDiagram
        };
      }
    } else {
      visualSteps.push({
        title: "Step 2: No Match Found",
        description: `Could not find an exact match for "${lookupVal}" in the first column.`,
        table: { ...dataset, highlightCol: 0 }
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
    { title: "Employee Database Search", description: "Finding an employee's salary based on their ID number." },
    { title: "Product Pricing", description: "Looking up the current price of an item using its SKU or Barcode." }
  ],
  commonMistakes: [
    "Forgetting to lock the table_array with absolute references (e.g. $A$1:$D$10) before dragging the formula.",
    "Using VLOOKUP to search right-to-left. VLOOKUP can ONLY search in the first column and return values to the right.",
    "Omitting the 4th argument (range_lookup) and getting approximate, incorrect matches. Always use FALSE for exact matches."
  ],
  practiceExercise: {
    question: "Write a VLOOKUP formula to find Bob's Salary (Col 4) using his Emp ID 'E102'.",
    table: { headers: ["Emp ID", "Name", "Salary"], rows: [["E101", "Alice", "60000"], ["E102", "Bob", "85000"]] },
    expectedFormula: "=VLOOKUP(\"E102\", A1:C2, 3, FALSE)",
    expectedResult: "85000"
  },
  interviewQuestions: [
    { question: "What is the difference between VLOOKUP with TRUE vs FALSE for the last argument?", answer: "FALSE forces an exact match, returning #N/A if not found. TRUE (or omitted) allows an approximate match, which requires the first column to be sorted ascending." },
    { question: "Can VLOOKUP look to the left?", answer: "No, VLOOKUP can only search the first (left-most) column of the table_array and return a value from a column to the right. Use INDEX/MATCH or XLOOKUP for leftward lookups." }
  ],
  challengeQuestion: "How would you handle a situation where the lookup value might not exist, and you want to display 'Not Found' instead of #N/A?"
};

export const VlookupLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
