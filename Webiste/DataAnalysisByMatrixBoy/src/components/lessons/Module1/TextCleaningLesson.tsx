import React from 'react';
import { FormulaLessonTemplate } from '../../ui/FormulaLessonTemplate';
import type { FormulaLessonData, TableData, EvaluationResult, VisualStep } from '../../../types/formula';

const lessonData: FormulaLessonData = {
  formulaName: "TRIM & PROPER",
  purpose: "Cleans up messy text data by removing extra spaces and standardizing capitalization.",
  syntax: "=TRIM(text) | =PROPER(text)",
  parameters: [
    { name: "text", meaning: "The messy string you want to clean.", example: "\"   john DOE  \"" }
  ],
  initialDataset: {
    headers: ["Messy Input"],
    rows: [
      ["  alice  SMITH "],
      ["BOB   jones"],
      ["   charlie  BROWN  "]
    ]
  },
  initialUserInput: {
    headers: ["Row to Clean (1-3)"],
    rows: [["1"]]
  },
  evaluate: (dataset: TableData, userInput: TableData): EvaluationResult => {
    let rowIdx = parseInt(userInput.rows[0][0]) - 1;
    if (isNaN(rowIdx) || rowIdx < 0 || rowIdx >= dataset.rows.length) rowIdx = 0;
    
    const messyText = dataset.rows[rowIdx][0];
    const formulaUsed = `=PROPER(TRIM(A${rowIdx+2}))`;
    
    const visualSteps: VisualStep[] = [];
    const flowDiagram: string[] = ["Start Clean"];
    
    visualSteps.push({
      title: "Step 1: Raw Data",
      description: `Original string: "${messyText}" (Notice the extra leading/trailing and double spaces).`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`Raw: "${messyText}"`, "Apply TRIM");
    
    // TRIM
    // Trim removes leading/trailing, and reduces multiple spaces to single
    const trimmedText = messyText.replace(/\s+/g, ' ').trim();
    visualSteps.push({
      title: "Step 2: TRIM()",
      description: `TRIM removes extra spaces. Result: "${trimmedText}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`Trimmed: "${trimmedText}"`, "Apply PROPER");
    
    // PROPER
    const properText = trimmedText.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    
    visualSteps.push({
      title: "Step 3: PROPER()",
      description: `PROPER capitalizes the first letter of each word. Result: "${properText}"`,
      table: { ...dataset, highlightRow: rowIdx, highlightCol: 0 }
    });
    flowDiagram.push(`Proper: "${properText}"`, "Return Result");
    
    return {
      formulaUsed,
      visualSteps,
      finalOutput: { headers: ["Cleaned Output"], rows: [[properText]] },
      flowDiagram
    };
  },
  realWorldExamples: [
    { title: "Data Migration", description: "Cleaning up user-entered names before importing them into a CRM database." }
  ],
  commonMistakes: [
    "Thinking TRIM removes non-breaking spaces (HTML &nbsp;). It doesn't! You often need CLEAN or SUBSTITUTE for those."
  ],
  practiceExercise: {
    question: "Clean this string: '  jane  DOE '.",
    table: { headers: ["A"], rows: [["  jane  DOE "]] },
    expectedFormula: "=PROPER(TRIM(A1))",
    expectedResult: "Jane Doe"
  },
  interviewQuestions: [
    { question: "What does the CLEAN function do?", answer: "CLEAN removes non-printable characters (like line breaks) from text." }
  ],
  challengeQuestion: "How would you remove ONLY leading spaces without affecting multiple spaces between words?"
};

export const TextCleaningLesson: React.FC = () => {
  return <FormulaLessonTemplate data={lessonData} />;
};
