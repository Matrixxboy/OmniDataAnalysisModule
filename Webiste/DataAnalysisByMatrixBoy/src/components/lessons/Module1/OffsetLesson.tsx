import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "OFFSET",
  purpose: "Returns a reference to a range that is a specified number of rows and columns from a starting cell or range of cells.",
  syntax: "=OFFSET(reference, rows, cols, [height], [width])",
  parameters: [
    { name: "reference", meaning: "The starting cell.", example: "A1" },
    { name: "rows", meaning: "Number of rows to move down (positive) or up (negative).", example: "2" },
    { name: "cols", meaning: "Number of columns to move right (positive) or left (negative).", example: "1" },
    { name: "[height]/[width]", meaning: "Optional dimensions of the returned range.", example: "1, 1" }
  ],
  initialDataset: {
    headers: ["A", "B", "C"],
    rows: [
      ["Start Here", "Skip", "Skip"],
      ["Skip", "Skip", "Skip"],
      ["Skip", "Target", "Skip"]
    ]
  },
  initialUserInput: {
    headers: ["Rows to Move Down", "Cols to Move Right"],
    rows: [["2", "1"]] // Moves from A2 (index 0,0) down 2, right 1 -> B4 (index 2,1)
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const moveRows = parseInt(userInput.rows[0][0]) || 0;
    const moveCols = parseInt(userInput.rows[0][1]) || 0;
    
    const formulaUsed = `=OFFSET(A2, ${moveRows}, ${moveCols})`; // A2 is the first row of data
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start OFFSET"];
    
    // Step 1: Start
    visualSteps.push({
      title: "Step 1: Anchor Reference",
      description: `Starting at the anchor cell A2 ("Start Here").`,
      table: { ...dataset, highlightRow: 0, highlightCol: 0 }
    });
    flowDiagram.push(`Anchor: A2`);
    
    // Calculate new position
    const newRow = 0 + moveRows;
    const newCol = 0 + moveCols;
    
    // Bounds check for demo
    if (newRow < 0 || newRow >= dataset.rows.length || newCol < 0 || newCol >= dataset.headers.length) {
      visualSteps.push({
        title: "Step 2: Move out of bounds",
        description: `Moving ${moveRows} rows and ${moveCols} columns puts the reference outside the sheet boundaries! (#REF!)`,
        table: { ...dataset, highlightRow: 0, highlightCol: 0 }
      });
      flowDiagram.push(`Move Out of Bounds`, `Return #REF!`);
      return {
        formulaUsed,
        visualSteps,
        finalOutput: { headers: ["Result"], rows: [["#REF!"]] },
        flowDiagram
      };
    }
    
    visualSteps.push({
      title: "Step 2: Move Rows",
      description: `Moving ${moveRows} rows down.`,
      table: { ...dataset, highlightRow: newRow, highlightCol: 0 }
    });
    flowDiagram.push(`Move ${moveRows} Rows Down`);
    
    visualSteps.push({
      title: "Step 3: Move Columns",
      description: `Moving ${moveCols} columns right.`,
      table: { ...dataset, highlightRow: newRow, highlightCol: newCol }
    });
    flowDiagram.push(`Move ${moveCols} Cols Right`);
    
    const targetValue = dataset.rows[newRow][newCol];
    
    visualSteps.push({
      title: "Step 4: Return Reference",
      description: `OFFSET returns the value at the new location: "${targetValue}".`,
      table: { ...dataset, highlightRow: newRow, highlightCol: newCol }
    });
    flowDiagram.push(`Extract "${targetValue}"`);
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["OFFSET Result"], rows: [[targetValue]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Dynamic Ranges", description: "Creating a rolling 12-month chart that automatically updates when a new month is added." }
  ],
  commonMistakes: [
    "OFFSET is a 'volatile' function, meaning it recalculates every time ANY change is made in the workbook. Using too many OFFSETs will slow down a large spreadsheet significantly."
  ],
  practiceExercise: {
    question: "Write an OFFSET to start at A1, go down 1 row, and right 1 column.",
    table: { headers: ["A", "B"], rows: [["A1", "B1"], ["A2", "B2"]] },
    expectedFormula: "=OFFSET(A1, 1, 1)",
    expectedResult: "B2"
  },
  interviewQuestions: [
    { question: "What is a non-volatile alternative to OFFSET?", answer: "INDEX can often be used to create dynamic ranges without the performance hit of a volatile function." }
  ],
  challengeQuestion: "How do you use OFFSET to return a range 5 rows tall instead of a single cell?"
};

export const OffsetLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
