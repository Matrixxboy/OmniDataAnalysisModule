import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "SEQUENCE",
  purpose: "Generates an array of sequential numbers, such as 1, 2, 3, 4. This is a dynamic array function that spills into adjacent cells.",
  syntax: "=SEQUENCE(rows, [columns], [start], [step])",
  parameters: [
    { name: "rows", meaning: "The number of rows to return.", example: "5" },
    { name: "[columns]", meaning: "The number of columns to return.", example: "1 (default)" },
    { name: "[start]", meaning: "The first number in the sequence.", example: "10" },
    { name: "[step]", meaning: "The amount to increment each successive value.", example: "2" }
  ],
  initialDataset: {
    headers: ["Info"],
    rows: [
      ["Sequence is a dynamic array function."],
      ["It generates numbers without dragging."],
      ["You just define the shape of the array."]
    ]
  },
  initialUserInput: {
    headers: ["Rows", "Columns", "Start", "Step"],
    rows: [["4", "2", "10", "5"]] 
  },
  evaluate: (_dataset: TableData, userInput: TableData): EvaluationResult => {
    const rows = parseInt(userInput.rows[0][0]) || 1;
    const cols = parseInt(userInput.rows[0][1]) || 1;
    const start = parseFloat(userInput.rows[0][2]) || 1;
    const step = parseFloat(userInput.rows[0][3]) || 1;
    
    const formulaUsed = `=SEQUENCE(${rows}, ${cols}, ${start}, ${step})`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start SEQUENCE"];
    
    visualSteps.push({
      title: "Step 1: Read Parameters",
      description: `Excel plans to generate a ${rows}x${cols} grid, starting at ${start}, incrementing by ${step}.`,
      table: { ...userInput }
    });
    flowDiagram.push(`Grid: ${rows}x${cols}`, `Start: ${start}, Step: ${step}`);
    
    const generatedGrid: string[][] = [];
    let currentNum = start;
    
    for (let r = 0; r < rows; r++) {
      const rowData: string[] = [];
      for (let c = 0; c < cols; c++) {
        rowData.push(currentNum.toString());
        currentNum += step;
      }
      generatedGrid.push(rowData);
    }
    
    visualSteps.push({
      title: "Step 2: Generate Grid",
      description: `Excel calculates the matrix of values internally before spilling them.`,
      table: { headers: Array.from({length: cols}, (_, i) => `Col ${i+1}`), rows: generatedGrid }
    });
    flowDiagram.push(`Calculate Matrix`, "Check Spill Area");
    
    visualSteps.push({
      title: "Step 3: Spill Results",
      description: `The sequence spills out from the top-left cell into the empty cells below and to the right.`,
      table: { headers: Array.from({length: cols}, (_, i) => `Col ${i+1}`), rows: generatedGrid }
    });
    flowDiagram.push(`Spill Results`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: Array.from({length: cols}, (_, i) => `Result Col ${i+1}`), rows: generatedGrid },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Dynamic ID Generation", description: "Creating a list of 100 sequential ID numbers (e.g. 1 to 100) instantly without dragging the fill handle." },
    { title: "Calendar Grids", description: "Creating a 7-column by 5-row grid to map out a calendar month." }
  ],
  commonMistakes: [
    "Getting a #SPILL! error because there is existing data blocking the range where SEQUENCE wants to output."
  ],
  practiceExercise: {
    question: "Write a SEQUENCE formula to generate the numbers 1, 2, 3 in a single column.",
    table: { headers: ["A"], rows: [[""]] },
    expectedFormula: "=SEQUENCE(3)",
    expectedResult: "1\n2\n3"
  },
  interviewQuestions: [
    { question: "How can SEQUENCE be used with other functions?", answer: "It is incredibly powerful when used inside functions like INDEX or VLOOKUP to extract multiple specific rows at once (e.g., extracting every 5th row)." }
  ],
  challengeQuestion: "How would you generate a sequence of dates representing every Monday for the next 10 weeks?"
};

export const SequenceLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
