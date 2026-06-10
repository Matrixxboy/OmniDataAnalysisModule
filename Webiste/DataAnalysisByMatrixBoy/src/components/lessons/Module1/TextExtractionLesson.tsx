import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "LEFT, RIGHT & MID",
  purpose: "Extracts a specific number of characters from a text string based on starting position.",
  syntax: "=LEFT(text, [num_chars]) | =RIGHT(...) | =MID(text, start_num, num_chars)",
  parameters: [
    { name: "text", meaning: "The string containing the characters you want to extract.", example: "A2" },
    { name: "num_chars", meaning: "Number of characters to extract.", example: "3" },
    { name: "start_num", meaning: "For MID only: The position of the first character you want to extract.", example: "5" }
  ],
  initialDataset: {
    headers: ["ID Code"],
    rows: [
      ["US-987-TX"],
      ["UK-456-LD"],
      ["CA-123-ON"]
    ]
  },
  initialUserInput: {
    headers: ["Target Code"],
    rows: [["US-987-TX"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    const targetCode = userInput.rows[0][0];
    
    let rowIdx = dataset.rows.findIndex(r => r[0] === targetCode);
    if (rowIdx === -1) rowIdx = 0;
    
    const text = dataset.rows[rowIdx][0];
    
    const formulaUsed = `LEFT, MID, and RIGHT extractions`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start Extraction"];
    
    visualSteps.push({
      title: "Step 1: Select Text String",
      description: `Targeting the string: "${text}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`Text: "${text}"`, "Apply LEFT");
    
    // LEFT
    const leftRes = text.substring(0, 2);
    visualSteps.push({
      title: "Step 2: LEFT(text, 2)",
      description: `Extracting 2 characters from the left (start). Result: "${leftRes}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`LEFT(2) -> "${leftRes}"`, "Apply MID");
    
    // MID
    const midRes = text.substring(3, 6);
    visualSteps.push({
      title: "Step 3: MID(text, 4, 3)",
      description: `Starting at character 4, extracting 3 characters. Result: "${midRes}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`MID(4,3) -> "${midRes}"`, "Apply RIGHT");
    
    // RIGHT
    const rightRes = text.substring(text.length - 2);
    visualSteps.push({
      title: "Step 4: RIGHT(text, 2)",
      description: `Extracting 2 characters from the right (end). Result: "${rightRes}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`RIGHT(2) -> "${rightRes}"`, "Return Results");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["LEFT (Country)", "MID (Number)", "RIGHT (State)"], rows: [[leftRes, midRes, rightRes]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Standardized IDs", description: "Extracting the department code from the middle of a complex Employee ID string." }
  ],
  commonMistakes: [
    "Forgetting that spaces count as characters.",
    "Using these on numbers (like dates). Text functions convert numbers to text, which might break future calculations."
  ],
  practiceExercise: {
    question: "Extract the middle 3 digits from 'AB-555-CD' (starting at position 4).",
    table: { headers: ["Code"], rows: [["AB-555-CD"]] },
    expectedFormula: "=MID(A1, 4, 3)",
    expectedResult: "555"
  },
  interviewQuestions: [
    { question: "How do you extract a variable length string, like everything before a hyphen?", answer: "Combine LEFT with the FIND or SEARCH function to dynamically determine the num_chars." }
  ],
  challengeQuestion: "How would you extract the last word from a sentence of unknown length?"
};

export const TextExtractionLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
