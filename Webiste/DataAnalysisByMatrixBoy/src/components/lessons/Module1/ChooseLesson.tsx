import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "CHOOSE & TRANSPOSE",
  purpose: "CHOOSE selects a value from a list based on an index number. TRANSPOSE flips rows and columns of an array.",
  syntax: "=CHOOSE(index_num, value1, [value2], ...) | =TRANSPOSE(array)",
  parameters: [
    { name: "index_num", meaning: "A number between 1 and 254 indicating which value to pick.", example: "2" },
    { name: "value1, value2...", meaning: "The list of items to choose from.", example: "\"Red\", \"Blue\", \"Green\"" },
    { name: "array", meaning: "For TRANSPOSE: The range of cells to flip.", example: "A1:B3" }
  ],
  initialDataset: {
    headers: ["Col 1", "Col 2"],
    rows: [
      ["Apple", "Red"],
      ["Banana", "Yellow"],
      ["Cherry", "Red"]
    ]
  },
  initialUserInput: {
    headers: ["Function", "CHOOSE Index"],
    rows: [["CHOOSE", "2"]] 
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const funcType = userInput.rows[0][0].toUpperCase();
    const indexNum = parseInt(userInput.rows[0][1]) || 1;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = [`Start ${funcType}`];
    
    if (funcType === "TRANSPOSE") {
      const formulaUsed = `=TRANSPOSE(A2:B4)`;
      
      visualSteps.push({
        title: "Step 1: Read Array",
        description: `Reading the 3x2 matrix.`,
        table: { ...dataset }
      });
      flowDiagram.push(`Read 3x2 Matrix`, `Flip Dimensions`);
      
      // Perform transpose
      const transposedRows: string[][] = [];
      const numRows = dataset.rows.length;
      const numCols = dataset.headers.length;
      
      for (let c = 0; c < numCols; c++) {
        const newRow: string[] = [];
        for (let r = 0; r < numRows; r++) {
          newRow.push(dataset.rows[r][c]);
        }
        transposedRows.push(newRow);
      }
      
      visualSteps.push({
        title: "Step 2: Spill Results",
        description: `The array is flipped to a 2x3 matrix and spilled into the cells.`,
        table: { headers: ["Item 1", "Item 2", "Item 3"], rows: transposedRows }
      });
      flowDiagram.push(`Spill 2x3 Matrix`);
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Output 1", "Output 2", "Output 3"], rows: transposedRows },
        flowDiagram
      };
      
    } else {
      // CHOOSE
      // We will choose from the "Product" column
      const formulaUsed = `=CHOOSE(${indexNum}, "Apple", "Banana", "Cherry")`;
      
      visualSteps.push({
        title: "Step 1: Evaluate Index",
        description: `The index number provided is ${indexNum}.`,
        table: { ...userInput, highlightRow: 0, highlightCol: 1 }
      });
      flowDiagram.push(`Index: ${indexNum}`, `Scan List`);
      
      if (indexNum < 1 || indexNum > dataset.rows.length) {
        visualSteps.push({
          title: "Step 2: Out of Bounds",
          description: `Index ${indexNum} is not valid. The list only has ${dataset.rows.length} items.`,
          table: { ...dataset }
        });
        flowDiagram.push(`Invalid Index`, `Return #VALUE!`);
        
        return {
          formulaUsed,
          visualSteps,
          finalOutput: { headers: ["Result"], rows: [["#VALUE!"]] },
          flowDiagram
        };
      }
      
      const targetValue = dataset.rows[indexNum - 1][0]; // CHOOSE is 1-indexed
      
      visualSteps.push({
        title: "Step 2: Return Item",
        description: `Excel picks the ${indexNum}th item in the list: "${targetValue}".`,
        table: { ...dataset, highlightRow: indexNum - 1, highlightCol: 0 }
      });
      flowDiagram.push(`Pick Item #${indexNum}`, `Extract "${targetValue}"`);
      
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [[targetValue]] },
        flowDiagram
      };
    }
  },
  realWorldExamples: [
    { title: "Financial Modeling", description: "Using CHOOSE to toggle a model between 3 scenarios (1=Base Case, 2=Upside, 3=Downside)." },
    { title: "Data Formatting", description: "Using TRANSPOSE to flip horizontal survey results into vertical columns for easier analysis." }
  ],
  commonMistakes: [
    "CHOOSE doesn't take a range (e.g. CHOOSE(1, A1:A3) is wrong). You have to explicitly list cells: CHOOSE(1, A1, A2, A3)."
  ],
  practiceExercise: {
    question: "Write a CHOOSE formula to return 'Gold' if index=1, 'Silver' if index=2, 'Bronze' if index=3.",
    table: { headers: ["Index"], rows: [["2"]] },
    expectedFormula: "=CHOOSE(A2, \"Gold\", \"Silver\", \"Bronze\")",
    expectedResult: "Silver"
  },
  interviewQuestions: [
    { question: "How can CHOOSE be used to force VLOOKUP to search right-to-left?", answer: "You can create an inline array inside VLOOKUP using CHOOSE. E.g., VLOOKUP(val, CHOOSE({1,2}, Col2, Col1), 2, 0)." }
  ],
  challengeQuestion: "How would you combine TRANSPOSE and UNIQUE to get a distinct list laid out horizontally?"
};

export const ChooseLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
